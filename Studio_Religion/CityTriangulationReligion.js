var pointsArray = [];
var groupedReligion;
var width = window.clientWidth;
var height = window.clientHeight;
var site;
//upload data set
//d3.csv("New_York_data.csv", function (data) {
// d3.csv("All_NewYork.csv", function (data) {
// d3.csv("dallas.csv", function (data) {
//  d3.csv("houston.csv", function (data) {
// d3.csv("Los_Angeles.csv", function (data) {
//  d3.csv("chicago.csv", function (data) {
// d3.csv("philadelphia.csv", function (data) {
//  d3.csv("phoenix.csv", function (data) {
//  d3.csv("san antonio.csv", function (data) {
// d3.csv("san diego.csv", function (data) {
// d3.csv("dallas.csv", function (data) {
// d3.csv("san jose_1.csv", function (data) {
//  d3.csv("austin.csv", function (data) {
//  d3.csv("indianapolis.csv", function (data) {
//  d3.csv("jacksonville.csv", function (data) {
//  d3.csv("san francisco.csv", function (data) {
//  d3.csv("columbus.csv", function (data) {
// d3.csv("charlotte_1.csv", function (data) {
//  d3.csv("fort worth.csv", function (data) {
// d3.csv("detroit.csv", function (data) {
  //  d3.csv("el paso.csv", function (data) {
//  d3.csv("memphis.csv", function (data) {
  // d3.csv("seattle.csv", function (data) {
//  d3.csv("denver.csv", function (data) {
//  d3.csv("washington.csv", function (data) {

//  d3.csv("boston.csv", function (data) {
// d3.csv("nashville.csv", function (data) {
//  d3.csv("baltimore.csv", function (data) {
//  d3.csv("oklahoma.csv", function (data) {
  //  d3.csv("Louisville.csv", function (data) {
    // d3.csv("oregon.csv", function (data) {
      d3.csv("las vegas.csv", function (data) {
// d3.csv("All_Places_of_Worship_final.csv", function (data) {

    //use mercator map projection to map X, Y points
    var projection = d3.geoMercator()
      // default scale  
      // .scale(50000)
      .scale(50000)
      //los Angeles
        // .translate([39000, -7000])
      // chicago
      //  .translate([12200, 1500])
      //  philadelphia
      //  .translate([1500, 2000])
      // pheonix
      //  .translate([33500, -6000])
      // san antonio
      // .translate([21700, -11000])
      // san diago
      //  .translate([37900, -8000])
      // dallas
      //  .translate([20200, -8400])
      // san jose
      //  .translate([42000, -3500])
      //houston
      // .translate([19000, -11000])
      //new york
      // .translate([100, 500])
       //austin
      // .translate([21000, -11000])
      //indianapolis
      // .translate([11000, -500])
      //jacksonville
      //  .translate([7200, -10500])
      //san francisco
      // .translate([42400, -3200])
       //columbus
      //  .translate([8400, -500])
       //charlotte
      // .translate([6200, -5800])
      //Fort Worth
      //  .translate([20600, -7000])
      //Detroit
      // .translate([9100, 2000])
      //El Paso
      // .translate([28500, -9600])
      //Memphis
      // .translate([14200, -6000])
      //Seattle
      // .translate([42500, 8700])
       //denver
      //  .translate([28000, -1000])
      //washington
      // .translate([3000, -2000])
      //boston
      //  .translate([-2000, 2000])
        //nashville
      //  .translate([11800, -5000])
        //baltimore
      // .translate([2500, -1200])
        //oklahoma
      //  .translate([20800, -5200])
       //Lousville
      // .translate([10500, -2600])
       //Oregon, Portland
      // .translate([42700, 5800])
      //Las Vegas
      .translate([36200, -5000])
      //new york centre
      .center([-73.964835, 40.783281]);


    //to add projected X Y in the dataset
    data.forEach(function (d) {
      d.XProjection = projection([d.X, d.Y])[0]
      d.YProjection = projection([d.X, d.Y])[1]
      // if(d.XProjection== 213.66519415499351){
      //   console.log("outlier", d.NAME)
      // }
    });

    //to group the data by religion
    var groupedReligion = d3.nest()
      .key(function (row) {
        return row.SUBTYPE;
      })
      .entries(data)
      .sort(function (a, b) { return d3.descending(a.values, b.values) });

    console.log(groupedReligion);
    console.log("after grouping INSIDE", groupedReligion);

    function drawThemAll(mod) {
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

        console.log(subtype, sites);
        var svg = d3.select("svg")


        width = +svg.attr("width")
        height = +svg.attr("height");


        //calling vernoi function
        var voronoi = d3.voronoi();

        if (mod === "onlyLines") {
          //draws FILLS
          var triangle = svg.append("g")
            .attr("class", "triangles")
            .attr("opacity", 0.5)
            .selectAll("path")
            .data(voronoi.triangles(sites))
            .enter().append("path")
            .attr("fill", function (d) {
              if (religion === "CHRISTIAN") {
                //console.log("I am CHRISTIAN");
                return "#EFD510"
              }
              else if (religion === "HINDU") { return "#E84822" }
              else if (religion === "BUDDHIST") { return "#FF89BF" }
              else if (religion === "MUSLIM") { return "#A1DE93" }
              else if (religion === "JUDAIC") { return "#58A1D7" }
              else if (religion === "OTHER") { return "#AC73FF" }
              else { return "#E7E6E1" }
              ;
            })
            .call(redrawTriangle, sites);

          //draws OUTLINES  
          var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(voronoi.links(sites))
            .enter().append("line")
            .call(redrawLink, religion);
          //console.log("link", link);
        }

        if (mod === "OnlyPoints") {
          var site = svg.append("g")
            .attr("class", "sites")
            .selectAll("circle")
            .data(sites)
            .enter().append("circle")
            // .on("mouseover", handleMouseOver)
            // .on("mouseout", handleMouseOut)
            .style("opacity", 1)
            .attr("fill", function (d) {
              if (religion === "CHRISTIAN") {
                //console.log("I am CHRISTIAN");
                return "#F9DC6A"
              }
              else if (religion === "HINDU") { return "#F07B3F" }
              else if (religion === "BUDDHIST") { return "#B83B5E" }
              else if (religion === "MUSLIM") { return "#26C666" }
              else if (religion === "JUDAIC") { return "#2E76FF" }
              else if (religion === "OTHER") { return "#6639A5" }
              else { return "#CECECE" }
              //   return "#EFD510"
              // }
              // else if (religion === "HINDU") { return "#E84822" }
              // else if (religion === "BUDDHIST") { return "#FF89BF" }
              // else if (religion === "MUSLIM") { return "#A1DE93" }
              // else if (religion === "JUDAIC") { return "#58A1D7" }
              // else if (religion === "OTHER") { return "#AC73FF" }
              // else { return "#E7E6E1" }
              ;
            })
            .attr("r", 2)
            .call(redrawSite);
        }

        if (mod === "PointsAndLines") {
          
          //draws FILLS
          var triangle = svg.append("g")
            .attr("class", "triangles")
            .attr("opacity", 0.3)
            .selectAll("path")
            .data(voronoi.triangles(sites))
            .enter().append("path")
            .attr("fill", function (d) {
              if (religion === "CHRISTIAN") {
                //console.log("I am CHRISTIAN");
                return "#F9DC6A"
              }
              else if (religion === "HINDU") { return "#F07B3F" }
              else if (religion === "BUDDHIST") { return "#B83B5E" }
              else if (religion === "MUSLIM") { return "#26C666" }
              else if (religion === "JUDAIC") { return "#2E76FF" }
              else if (religion === "OTHER") { return "#6639A5" }
              else { return "#CECECE" }
              //   return "#EFD510"
              // }
              // else if (religion === "HINDU") { return "#E84822" }
              // else if (religion === "BUDDHIST") { return "#FF89BF" }
              // else if (religion === "MUSLIM") { return "#A1DE93" }
              // else if (religion === "JUDAIC") { return "#58A1D7" }
              // else if (religion === "OTHER") { return "#AC73FF" }
              // else { return "#E7E6E1" }
              // ;
            })
            .call(redrawTriangle, sites);

          //draws POINTS
          var site = svg.append("g")
            .attr("class", "sites")
            .selectAll("circle")
            .data(sites)
            .enter().append("circle")
            // .on("mouseover", handleMouseOver)
            // .on("mouseout", handleMouseOut)
            // .style("opacity", 1)
            // .attr("style", "mix-blend-mode : multiply")
            .attr("fill", function (d) {
              if (religion === "CHRISTIAN") {
                //console.log("I am CHRISTIAN");
                return "#F9DC6A"
              }
              else if (religion === "HINDU") { return "#F07B3F" }
              else if (religion === "BUDDHIST") { return "#B83B5E" }
              else if (religion === "MUSLIM") { return "#26C666" }
              else if (religion === "JUDAIC") { return "#2E76FF" }
              else if (religion === "OTHER") { return "#6639A5" }
              else { return "#CECECE" }
              //   return "#EFD510"
              // }
              // else if (religion === "HINDU") { return "#E84822" }
              // else if (religion === "BUDDHIST") { return "#FF89BF" }
              // else if (religion === "MUSLIM") { return "#A1DE93" }
              // else if (religion === "JUDAIC") { return "#58A1D7" }
              // else if (religion === "OTHER") { return "#AC73FF" }
              // else { return "#E7E6E1" }
              // ;
            })
            .attr("r", 3.5)
            .call(redrawSite);

          //draws OUTLINES  
          var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(voronoi.links(sites))
            .enter().append("line")
            .call(redrawLink, religion);
          //console.log("link", link);





        }
      }

    }

    drawThemAll("PointsAndLines");
    // drawThemAll("OnlyPoints");

  });


  function redrawSite(site) {
    site
      .attr("cx", function (d) { return d[0]; })
      .attr("cy", function (d) { return d[1]; });
  }
  //console.log("new name")

  function redrawLink(link, religion) {
    link
      .attr("x1", function (d) { return d.source[0]; })
      .attr("y1", function (d) { return d.source[1]; })
      .attr("x2", function (d) { return d.target[0]; })
      .attr("y2", function (d) { return d.target[1]; })
      .attr("stroke-width", 1.5)
      //default opacity
      .attr("opacity", 1)
      // .attr("opacity", 1)
      // .attr("style", "mix-blend-mode : hue")
      .attr("stroke", function (d) {
        if (religion === "CHRISTIAN") {
        //   //console.log("I am CHRISTIAN");
        //   return "#EFD510"
        // }
        // else if (religion === "HINDU") { return "#E84822" }
        // else if (religion === "BUDDHIST") { return "#FF89BF" }
        // else if (religion === "MUSLIM") { return "#A1DE93" }
        // else if (religion === "JUDAIC") { return "#58A1D7" }
        // else if (religion === "OTHER") { return "#AC73FF" }
        // else { return "#E7E6E1" }
          return "#F9DC6A"
        }
        else if (religion === "HINDU") { return "#F07B3F" }
        else if (religion === "BUDDHIST") { return "#B83B5E" }
        else if (religion === "MUSLIM") { return "#26C666" }
        else if (religion === "JUDAIC") { return "#2E76FF" }
        else if (religion === "OTHER") { return "#6639A5" }
        else { return "#CECECE" }
        ;
      });

  }

  function redraw() {
    var diagram = voronoi(sites);
    triangle = triangle.data(diagram.triangles()), triangle.exit().remove();
    triangle = triangle.enter().append("path").merge(triangle);
    link = link.data(diagram.links()), link.exit().remove();
    link = link.enter().append("line").merge(link).call(redrawLink);
    site = site.data(sites).call(redrawSite);
  }

  function redrawTriangle(triangle, sites) {
    triangle
      .attr("d", function (d) { return "M" + d.join("L") + "Z"; });
  }