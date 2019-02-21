
//Loading data into file

  // d3.csv("Utah_Places_of_Worship.csv", function(sites){
  //   console.log("csv:", sites);
  // });

  var circleRadii = [40, 20, 10];

 var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 200)
                                     .attr("height", 200);
 
 7var circles = svgContainer.selectAll("circle")
                           .data(circleRadii)
                           .enter()
                           .append("circle");