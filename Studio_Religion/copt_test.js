var pointsArray = [];

//upload data set
d3.csv("New_York_data.csv", function(data){
  
  //use mercator map projection to map X, Y points
  var projection = d3.geoMercator()
    .scale(1000000)
    //.translate([width / 2, height / 2])
    .center([-74.0060,40.7128]);

// //use geoAlbers map projection to map X, Y points
//   var projection = d3.geoAlbers()
//     .scale(10000)
//     .translate([-480, -300])


  data.forEach(function(d){
    tempArray = [projection([d.X,d.Y])[0], projection([d.X,d.Y])[0]];
    pointsArray.push(tempArray);
  });
  console.log("POINTS_ARRAY: ", pointsArray);

      //select svg component
      var svg = d3.select("svg"),

      //var svg = d3.select("svg").on("touchmove mousemove", moved),
          width = +svg.attr("width"),
          height = +svg.attr("height");

      var sites = pointsArray;

      // var sites = d3.range(100)
      //     .map(function(d) { return [Math.random() * width, Math.random() * height]; });
      //     console.log("SITES ", sites);

      //calling vernoi function
      var voronoi = d3.voronoi();

      //draws the paths for triangles
      var triangle = svg.append("g")
        .attr("class", "triangles")
        .selectAll("path")
        .data(voronoi.triangles(sites))
        .enter().append("path")
         // .call(redrawTriangle);

      //draws the links for triangles  
      var link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(voronoi.links(sites))
        .enter().append("line")
          .call(redrawLink);
          console.log("link", link);

      //draws the circle points
      var site = svg.append("g")
        .attr("class", "sites")
        .selectAll("circle")
        .data(sites)
        .enter().append("circle")
        .style("opacity", 5)
        .style("fill", "red")
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

