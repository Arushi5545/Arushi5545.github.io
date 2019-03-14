var width = window.innerWidth;
var height = 700;

d3.csv("All_Places_of_Worship_final.csv", function(data){
 
//use map projection to map X, Y points
  var projection = d3.geoMercator()
    .scale(300)
    .translate([width / 2, height / 2])
    .center([-40,40]);

  //console.log("csv:", data);
  console.log("read csv");

  var groupedCITIES = d3.nest()
                    .key(function(row) {
                        return row.CITY;
                    })
                    .map(data);
                    //console.log("grouped cities", groupedCITIES);
                    //console.log("All cities NYC", groupedCITIES["NEW YORK"]);
  
                   

   //to create an svg component 
   var svg = d3.select("#my-map")
   .attr("width", width + "px")
   .attr("height", height + "px");

//to make X, Y to numeric 



  // //to make X, Y in a class
  // var points={
  //   X: data.X,
  //   Y: data.Y
  // }

   //to make X, Y in an array

 
  //console.log("points", points);




  //to make circles for each X,Y
  var pins = svg.selectAll("circle")
          .data(data);


//
  pins.enter().append("circle")
          .attr("cx", function(d) { return projection([d.X,d.Y])[0]; })
          .attr("cy", function(d) { return projection([d.X,d.Y])[1]; })
        // .attr("transform", function(d) {
          //     return "translate(" + projection(points) + ")";
          // })
          .attr("r", 1)
          .attr("fill", "cornflowerblue");

  // PlacesOfWorship.enter().append("circle")
  //   .attr("cx", function(d) { return projection(d[points.X], d[points.Y])[0]; })
  //   .attr("cy", function(d) { return projection(d[points.X], d[points.Y])[1]; })
  //   .attr("r", 5)
  //   .attr("fill", "cornflowerblue");

  //console.log("Inside pin enter");




}); 








