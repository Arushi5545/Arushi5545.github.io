var GroupedCityReligion;


d3.csv("All_Places_of_Worship_final.csv", function (data) {
  
  width = window.innerWidth;
  height = window.innerHeight;
  
  //use mercator map projection to map X, Y points
  var projection = d3.geoMercator()
  .scale(100000)
  .translate([130000, 80000])
    // .center([-71, 42]);


  //to add projected X Y in the dataset
  data.forEach(function (d) {
    d.XProjection = projection([d.X, d.Y])[0]
    d.YProjection = projection([d.X, d.Y])[1]
    if (d.XProjection == 776.9019462056301) {
      console.log("outlier", d.NAME)
    }
  });

  //to create nested groups first by city then by subtype
  GroupedCityReligion = d3.nest()
    .key(function (d) { return d.CITY; })
    .key(function (d) { return d.SUBTYPE; })
    .entries(data);
  // console.log('grouped city religion', GroupedCityReligion)


  //run loop through each city, save the max min for that city, use that for displaying
  GroupedCityReligion.forEach(function (dd) {
    var xValues = [];
    var yValues = [];
    var sites = [];

    //to select the city
    // console.log("key", dd.key);

    if (dd.key === "BOSTON") {

      dd.values.forEach(function (subtype_data) {
        // var religion = subtype_data.key;
        console.log("religion", subtype_data.key)
        subtype_data.values.forEach(function (val) {
          //  console.log("val",val);
          xValues.push(val.XProjection);
          yValues.push(val.YProjection);
        });

      });


      var maxX = d3.max(xValues);
      var minX = d3.min(xValues);
      var maxY = d3.min(yValues);
      var minY = d3.max(yValues);
      // console.log("maxX", maxX);

      //to grab the center of projected values 
      // projection.center([(maxX - minX) / 2, (maxY - minY) / 2]);
      var avgX= (maxX - minX) / 2;
      var avgY= (maxY - minY) / 2;
      console.log("avgX", (maxX - minX) / 2);
      console.log("avgY", (maxY - minY) / 2);
      
      projection.center([avgY], [avgX]);

      dd.values.forEach(function (subtype_data) {
        var religion = subtype_data.key;
        subtype_data.values.forEach(function (val) {
          if (subtype_data.length == 0) {
            return false;
          }
          sites.push([val.XProjection, val.YProjection]);
        });

        var svg = d3.select("svg")
        width = +svg.attr("width")
        height = +svg.attr("height");


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
        console.log("sites", sites);
        //draws the circle points
        var site = svg.append("g")
          .attr("class", "sites")
          .selectAll("circle")
          .data(sites)
          .enter().append("circle")
          // .attr("fill", "black")
          .style("opacity", .2)
          .attr("fill", function (d) {

            // console.log("religion",ddd.SUBTYPE);
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
          .attr("r", 2)
          .call(redrawSite);

        //draws the triangulation
        function redraw() {
          var diagram = voronoi(sites);
          triangle = triangle.data(diagram.triangles()), triangle.exit().remove();
          triangle = triangle.enter().append("path").merge(triangle);
          link = link.data(diagram.links()), link.exit().remove();
          link = link.enter().append("line").merge(link).call(redrawLink);
          site = site.data(sites).call(redrawSite);
        }

        // function redrawTriangle(triangle) {
        //   triangle
        //     .classed("primary", function (d) { return d[0] === sites[0] || d[1] === sites[0] || d[2] === sites[0]; })
        //     .attr("d", function (d) { return "M" + d.join("L") + "Z"; });
        // }

        function redrawLink(link) {
          link
            .classed("primary", function (d) { return d.source === sites[0] || d.target === sites[0]; })
            .attr("x1", function (d) { return d.source[0]; })
            .attr("y1", function (d) { return d.source[1]; })
            .attr("x2", function (d) { return d.target[0]; })
            .attr("y2", function (d) { return d.target[1]; })
            .attr("stroke-width", 1)
            .attr("opacity", .2)
            // .attr("fill", "black")
            // .attr("style", "mix-blend-mode : multiply")
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



            })
        }

        function redrawSite(site) {
          site
            .attr("cx", function (d) { return d[0]; })
            .attr("cy", function (d) { return d[1]; });
        }



      });
      
      
      
    }
    });
});
