var pointsArray = [];
var groupedReligion;
var width = window.clientWidth;
var height = window.clientHeight;
//upload data set
// d3.csv("New_York_data.csv", function (data) {
d3.csv("All_Places_of_Worship_final.csv", function (data) {

  //use mercator map projection to map X, Y points
  var projection = d3.geoMercator()
    .scale(600000)
    // .translate([2000, 4000])
    //new york
    // .center([-74.0060, 40.7128]);
    //salt lake city
    .center([40, 60]);

  //to add projected X Y in the dataset
  data.forEach(function (d) {
    d.XProjection = projection([d.X, d.Y])[0]
    d.YProjection = projection([d.X, d.Y])[1]
  });

  //   return d3.nest().key(function(d) {
  //     return d.CITY;
  // }).key(function(d) {
  //     return d.SUBTYPE;
  // }).entries(data);

  //console.log("before grouping", data);

  //to group the data by religion
  var groupedReligion = d3.nest()
    .key(function (row) {
      return row.SUBTYPE;
    })
    .entries(data);
  //console.log(groupedReligion);
  //console.log("after grouping INSIDE", groupedReligion);


  //To access all groups within Grouped Religion
  for (var subtype in groupedReligion) {
    var gdata = groupedReligion[subtype];
    var religion = gdata.key;
    // console.log(religion);
    // console.log(subtype, gdata);
    var sites = [];
    //loop inside each object of grouped Religion
    if (gdata.length == 0) {
      return false;
    }
    gdata.values.forEach(function (dd) {
      //console.log("length", dd);
      // console.log("gdata[i]", gdata[i]);
      //select svg component
      sites.push([dd.XProjection, dd.YProjection])
    });
    // console.log(subtype,sites);
    var svg = d3.select("svg")


    width = +svg.attr("width")
    height = +svg.attr("height");

    // var sites = ([gdata[i].XProjection, gdata[i].YProjection]);

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
    //console.log("link", link);

    //draws the circle points
    var site = svg.append("g")
      .attr("class", "sites")
      .selectAll("circle")
      .data(sites)
      .enter().append("circle")
      // .style("opacity", 5)
      .attr("fill", function (d) {
        if (religion === "CHRISTIAN") {
          //console.log("I am CHRISTIAN");
          return "#FCCA46"
        }
        else if (religion === "HINDU") { return "#FE7F2D" }
        else if (religion === "BUDDHIST") { return "#0894A1" }
        else if (religion === "MUSLIM") { return "#A1C181" }
        else if (religion === "JUDAIC") { return "#233D4D" }
        else if (religion === "OTHER") { return "#3F464C" }
        else { return "black" }
        ;
      })
      .attr("r", 7)
      .call(redrawSite);

    //to redraw 
    // function moved() {
    //   sites[0] = d3.mouse(this);
    //   redraw();
    // }

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
        .classed("primary", function (d) { return d[0] === sites[0] || d[1] === sites[0] || d[2] === sites[0]; })
        .attr("d", function (d) { return "M" + d.join("L") + "Z"; });
    }

    function redrawLink(link) {
      link
        .classed("primary", function (d) { return d.source === sites[0] || d.target === sites[0]; })
        .attr("x1", function (d) { return d.source[0]; })
        .attr("y1", function (d) { return d.source[1]; })
        .attr("x2", function (d) { return d.target[0]; })
        .attr("y2", function (d) { return d.target[1]; })
        .attr("stroke-width", 4)
        .attr("stroke", function (d) {
          if (religion === "CHRISTIAN") {
            //console.log("I am CHRISTIAN");
            return "#FCCA46"
          }
          else if (religion === "HINDU") { return "#FE7F2D" }
          else if (religion === "BUDDHIST") { return "#0894A1" }
          else if (religion === "MUSLIM") { return "#A1C181" }
          else if (religion === "JUDAIC") { return "#233D4D" }
          else if (religion === "OTHER") { return "#3F464C" }
          else { return "black" }
          ;
        });

    }

    function redrawSite(site) {
      site
        .attr("cx", function (d) { return d[0]; })
        .attr("cy", function (d) { return d[1]; });
    }





  }

});






