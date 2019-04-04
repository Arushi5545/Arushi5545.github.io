var width = window.innerWidth;
var height = 700;

// d3.csv("All_Places_of_Worship_test.csv", function(data){
d3.csv("New_York_data.csv", function(data){
//console.log("csv:", data);
//console.log("read csv", data);

//use map projection to map X, Y points
  var projection = d3.geoMercator()
    .scale(80)
    .translate([width / 2, height / 2])
    .center([-60,40]);

  

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

  

 
  //console.log("points", points);




  //to make circles for each X,Y
  var pins = svg.selectAll("circle")
          .data(data);
 
  var pointsArray_X=[];
  var pointsArray_Y=[];
  var x=0;
  var y=0;

//
  pins.enter().append("circle")
          .attr("cx", function(d) { 
            //console.log("X", projection([d.X,d.Y])[0]);
            pointsArray_X[x]=projection([d.X,d.Y])[0];
            x++;
            return projection([d.X,d.Y])[0]; 
          })
          .attr("cy", function(d) {
            //console.log("Y", projection([d.X,d.Y])[1]);
              pointsArray_Y[y]=projection([d.X,d.Y])[1];
              y++;
             return projection([d.X,d.Y])[1]; 
            })
          // var pointsArray=[projection([d.X,d.Y])[0],projection([d.X,d.Y])[1]]
          // console.log(pointsArray)
          
          // .attr("transform", function(d) {
          //     return "translate(" + projection(points) + ")";
          // })
          .attr("r", 1);
          // .style("fill", function(d) {
          //   //console.log(d.SUBTYPE)
          //   if (d.SUBTYPE == CHRISTIAN) {return "red"}
          //   else 	if (d.SUBTYPE == HINDU) {return "blue"}
          //   else 	if (d.SUBTYPE == BUDDHIST) {return "green"}
          //   else 	if (d.SUBTYPE == MUSLIM) {return "orange"}
          //   else 	if (d.SUBTYPE == OTHER) {return "yellow"}
          //   else 	{ return "red" }
        
          
        console.log("X", pointsArray_X);
        console.log("Y", pointsArray_Y);
          
  // PlacesOfWorship.enter().append("circle")
  //   .attr("cx", function(d) { return projection(d[points.X], d[points.Y])[0]; })
  //   .attr("cy", function(d) { return projection(d[points.X], d[points.Y])[1]; })
  //   .attr("r", 5)
  //   .attr("fill", "cornflowerblue");

  //console.log("Inside pin enter");




}); 








