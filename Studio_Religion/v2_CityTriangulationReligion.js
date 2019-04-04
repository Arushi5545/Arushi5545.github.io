//1) how to access nested  data in an array
//2) How to get the min-max for each city

var pointsArray = [];
var groupedReligion;
var width = window.clientWidth;
var height = window.lientHeight;
//upload data set
d3.csv("All_Places_of_Worship_final.csv", function (data) {

  //use mercator map projection to map X, Y points
  var projection = d3.geoMercator()
    .scale(600000)
    .translate([200, 400])
    //This center should be the centre of the bounding box
    .center({[xAvg, yAvg]);

  //to add projected X Y in the dataset
  data.forEach(function (d) {
    d.XProjection = projection([d.X, d.Y])[0]
    d.YProjection = projection([d.X, d.Y])[1]

  });



  //to create nested groups first by city then by subtype
  var GroupedCityReligion = d3.nest()
    .key(function (d) { return d.CITY; })
    .key(function (d) { return d.SUBTYPE; })
    .entries(data);

    //To access all cities within Grouped Religion
    for (var subCity in groupedReligion) {
      var gCityData = GroupedCityReligion[subCity];
      var religion = gCityData.key;
      var sites = [];
      //loop inside each object of grouped Religion
      if (gdata.length == 0) {
        return false;
      }
      //to get projections min-max for each city
      gCityData.values.forEach(function (dd) {
        var maxX = d3.max([dd.XProjection]);
        var minX = d3.min([dd.XProjection]);
        var maxY = d3.min([dd.YProjection]);
        var minY = d3.min([dd.YProjection]);
        console.log("maxX", maxX);
      });

      // console.log(subtype, sites);
      // var svg = d3.select("svg")


    

  };

});

    // // console.log(subtype, gdata);
    // var sites = [];
    // //loop inside each object of grouped Religion
    // if (gdata.length == 0) {
    //   return false;
    // }
    // gdata.values.forEach(function (dd) {
    //   //console.log("length", dd);
    //   // console.log("gdata[i]", gdata[i]);
    //   //select svg component
    //   sites.push([dd.XProjection, dd.YProjection])
    // });
    // // console.log(subtype,sites);
    // var svg = d3.select("svg")


    // width = +svg.attr("width")
    // height = +svg.attr("height");

    // // var sites = ([gdata[i].XProjection, gdata[i].YProjection]);

    // //calling vernoi function
    // var voronoi = d3.voronoi();

    // //draws the paths for triangles
    // var triangle = svg.append("g")
    //   .attr("class", "triangles")
    //   .selectAll("path")
    //   .data(voronoi.triangles(sites))
    //   .enter().append("path")
    // // .call(redrawTriangle);

    // //draws the links for triangles  
    // var link = svg.append("g")
    //   .attr("class", "links")
    //   .selectAll("line")
    //   .data(voronoi.links(sites))
    //   .enter().append("line")
    //   .call(redrawLink);
    // //console.log("link", link);

    // //draws the circle points
    // var site = svg.append("g")
    //   .attr("class", "sites")
    //   .selectAll("circle")
    //   .data(sites)
    //   .enter().append("circle")
    //   // .style("opacity", 5)
    //   .attr("fill", function (d) {
    //     if (religion === "CHRISTIAN") {
    //       //console.log("I am CHRISTIAN");
    //       return "#FCCA46"
    //     }
    //     else if (religion === "HINDU") { return "#FE7F2D" }
    //     else if (religion === "BUDDHIST") { return "#0894A1" }
    //     else if (religion === "MUSLIM") { return "#A1C181" }
    //     else if (religion === "JUDAIC") { return "#233D4D" }
    //     else if (religion === "OTHER") { return "#3F464C" }
    //     else { return "black" }
    //     ;
    //   })
    //   .attr("r", 7)
    //   .call(redrawSite);

    // //to redraw 
    // // function moved() {
    // //   sites[0] = d3.mouse(this);
    // //   redraw();
    // // }

    // //draws the triangulation
    // function redraw() {
    //   var diagram = voronoi(sites);
    //   triangle = triangle.data(diagram.triangles()), triangle.exit().remove();
    //   triangle = triangle.enter().append("path").merge(triangle).call(redrawTriangle);
    //   link = link.data(diagram.links()), link.exit().remove();
    //   link = link.enter().append("line").merge(link).call(redrawLink);
    //   site = site.data(sites).call(redrawSite);
    // }

    // function redrawTriangle(triangle) {
    //   triangle
    //     .classed("primary", function (d) { return d[0] === sites[0] || d[1] === sites[0] || d[2] === sites[0]; })
    //     .attr("d", function (d) { return "M" + d.join("L") + "Z"; });
    // }

    // function redrawLink(link) {
    //   link
    //     .classed("primary", function (d) { return d.source === sites[0] || d.target === sites[0]; })
    //     .attr("x1", function (d) { return d.source[0]; })
    //     .attr("y1", function (d) { return d.source[1]; })
    //     .attr("x2", function (d) { return d.target[0]; })
    //     .attr("y2", function (d) { return d.target[1]; })
    //     .attr("stroke-width", 4)
    //     .attr("stroke", function (d) {
    //       if (religion === "CHRISTIAN") {
    //         //console.log("I am CHRISTIAN");
    //         return "#FCCA46"
    //       }
    //       else if (religion === "HINDU") { return "#FE7F2D" }
    //       else if (religion === "BUDDHIST") { return "#0894A1" }
    //       else if (religion === "MUSLIM") { return "#A1C181" }
    //       else if (religion === "JUDAIC") { return "#233D4D" }
    //       else if (religion === "OTHER") { return "#3F464C" }
    //       else { return "black" }
    //       ;
    //     });

    // }

    // function redrawSite(site) {
    //   site
    //     .attr("cx", function (d) { return d[0]; })
    //     .attr("cy", function (d) { return d[1]; });
    // }







