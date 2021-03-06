var projectedPoints;
var pointsArray = [];

//upload data set
d3.csv("New_York_data.csv", function(data){
  //d3.csv("All_Places_of_Worship_test.csv", function(data){
    console.log("INSIDE FILE READING ...")
  //use map projection to map X, Y points
    var projection = d3.geoMercator()
    // .scale(500000)
    // //.precision(0)
    // .translate([width / 2, height / 2])
    // .center([-74.0060,40.7128]);

      data.forEach(function(d){
        tempArray = [projection([d.X,d.Y])[0], projection([d.X,d.Y])[0]];
        pointsArray.push(tempArray);
      });
      console.log("PROMPTS_ARRAY: ", pointsArray);
    //return pointsArray;
    console.log("ACCESSING PROMPTS_ARRAY: ", pointsArray);

    //select svg component
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
    
    //assign the values to x and y
    // var sites = d3.range(100)
    //     .map(function(d) { return [Math.random() * width, Math.random() * height]; });
    
    //reassigning sites
      //var sites= pointsArray;
      var mySites = d3.range(100)
    .map(function(d) { return [Math.random() * width, Math.random() * height]; });
      console.log("SITES: " , mySites);
      
    
    
    
    //console.log("sites" ,sites);
    
    //testing sites with small values
    //var sites=([-3,-2],[-5,-6],[-3.5,-6]);
    
    //console.log(sites); //Sites in an array of X,Y values
    
    //calling vernoi function
        var voronoi = d3.voronoi();
    
    //draws the paths for triangles
    var triangle = svg.append("g")
      .attr("class", "triangles")
      .selectAll("path")
      .data(voronoi.triangles(sites))
      .enter().append("path")
      .call(redrawTriangle);
    
    //draws the links for triangles  
    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(voronoi.links(sites))
      .enter().append("line")
      .call(redrawLink);
    
    //draws the circle points
    var site = svg.append("g")
      .attr("class", "sites")
      .selectAll("circle")
      .data(sites)
      .enter().append("circle")
      .attr("r", 2.5)
      .call(redrawSite);
    
    //to redraw 
    function moved() {
      sites[0] = d3.mouse(this);
      redraw();
    }
    
    //draws the triangulation
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
  });

{
  console.log("ERROR OCCURED")
}


