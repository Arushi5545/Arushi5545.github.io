
var sites;

//uploading the test dataset
d3.csv("NY_test_XY.csv", function(data){
  //console.log("csv:", data);
 //console.log(data[1].X);

 //to extract the X,Y coordinates from data set
  data.forEach(function(d, i) {
      var sites=[data[i].X,data[i].Y];
        console.log(sites);
        
        //testing the data to display all the locations on the screen
        transform = "translate(100 100)";
        data.forEach(function(d, i) {
        var svg = d3.select("svg");

        //to display each X,Y with a circle
        var circles = svg.selectAll("circle")
            .data(data);

        circles.enter().append("circle")
            .attr("r", 10)
            .attr("fill", "blue") 
            .attr("cx", function(d) {
                return data[i].X;
            })
            .attr("cy", function(d) {
              return data[i].Y;
          })
          });
      });
});

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// var sites = d3.range(10)
//     .map(function(d) { return [Math.random() * width, Math.random() * height]; });
//     console.log(sites);

//calling the vernoi function
var voronoi = d3.voronoi();

var triangle = svg.append("g")
    .attr("class", "triangles")
  .selectAll("path")
  .data(voronoi.triangles(sites))
  .enter().append("path")
    .call(redrawTriangle);

var link = svg.append("g")
    .attr("class", "links")
  .selectAll("line")
  .data(voronoi.links(sites))
  .enter().append("line")
    .call(redrawLink);

var site = svg.append("g")
    .attr("class", "sites")
  .selectAll("circle")
  .data(sites)
  .enter().append("circle")
    .attr("r", 2.5)
    .call(redrawSite);

//Removed the mouse movement
// function moved() {
//   sites[0] = d3.mouse(this);
//   redraw();
// }

function redraw() {
  var diagram = voronoi(sites);
  triangle = triangle.data(diagram.triangles()), triangle.exit().remove();
  triangle = triangle.enter().append("path").merge(triangle).call(redrawTriangle);
  link = link.data(diagram.links()), link.exit().remove();
  link = link.enter().append("line").merge(link).call(redrawLink);
  site = site.data(sites).call(redrawSite);
}

function redrawTriangle(triangle) {
  triangle
      .classed("primary", function(d) { return d[0] === sites[0] || d[1] === sites[0] || d[2] === sites[0]; })
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
}

function redrawLink(link) {
  link
      .classed("primary", function(d) { return d.source === sites[0] || d.target === sites[0]; })
      .attr("x1", function(d) { return d.source[0]; })
      .attr("y1", function(d) { return d.source[1]; })
      .attr("x2", function(d) { return d.target[0]; })
      .attr("y2", function(d) { return d.target[1]; });
}

function redrawSite(site) {
  site
      .attr("cx", function(d) { return d[0]; })
      .attr("cy", function(d) { return d[1]; });
}
