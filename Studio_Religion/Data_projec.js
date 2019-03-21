var width = window.innerWidth;
var height = 5000;

//d3.csv("All_Places_of_Worship_final.csv", function(data){

d3.csv("New_York_data.csv", function(data){

//use map projection to map X, Y points
  var projection = d3.geoMercator()
    .scale(500000)
    //.precision(0)
    .translate([width / 2, height / 2])
    .center([-74.0060,40.7128]);

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
          //.style("opacity", 0.5)
          .style("fill", function(d) {
            if (d.SUBTYPE == "CHRISTIAN" ) {
              //console.log("I am CHRISTIAN");
              return "red"}
              else if (d.SUBTYPE == "HINDU" )	{ return "blue" }
              else if (d.SUBTYPE == "BUDDHIST" )	{ return "green" }
              else if (d.SUBTYPE == "MUSLIM" )	{ return "aqua" }
              else if (d.SUBTYPE == "JUDAIC" )	{ return "orange" }
              else if (d.SUBTYPE == "OTHER" )	{ return "yellow" }
              else 	{ return "black" }
        ;})
          .attr("r", 4);
          //.attr("fill", "cornflowerblue")
         
  // PlacesOfWorship.enter().append("circle")
  //   .attr("cx", function(d) { return projection(d[points.X], d[points.Y])[0]; })
  //   .attr("cy", function(d) { return projection(d[points.X], d[points.Y])[1]; })
  //   .attr("r", 5)
  //   .attr("fill", "cornflowerblue");

  //console.log("Inside pin enter");




}); 








