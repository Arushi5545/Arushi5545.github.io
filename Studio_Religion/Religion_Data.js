
var width = window.innerWidth;
var height = 700;
var points;

d3.csv("All_Places_of_Worship_final.csv", function(data){
 

  //console.log("csv:", data);
 

  var groupedCITIES = d3.nest()
    .key(function(row) {
        return row.CITY;
    })
    .map(data);
    //console.log("grouped cities", groupedCITIES);
    //console.log("All cities NYC", groupedCITIES["NEW YORK"]);
  
                   

  /*var groupedNYC = d3.nest()
                    .key(function(row) {
                      if(row.CITY=="NEW YORK"){
                        return row.CITY;
                      } else {
                        print("Not NYC")
                      }
                    })
                    .entries(data);
                    console.log("grouped NY", groupedNYC);*/
  //console.log("grouped NYC", groupedCITIES.CITY);





//to make X, Y to numeric 
data.forEach(function(data) {
    data.X = parseFloat(data.X);
    data.Y = parseFloat(data.Y);


  //to make X, Y in an class
  var points={
    X: data.X,
    Y: data.Y
  }

  //  //to make X, Y in an array
  //  var pointsArray= [data.X, data.Y];
  
   //set projection
   var projection = d3.geoMercator()
    .scale(153)
    .translate([width / 2, height / 2])
    .center([0,40])
   
   //set svg
   var svg = d3.select("#pin")
    .attr("width", width + "px")
    .attr("height", height + "px");

 
   //create points
   svg.selectAll("circle")
    .data(points)
    .enter().append("circle", "pin")
    .attr("r", 5)
    .attr("transform", function(d) {
      return "translate(" + projection([
        d.X,
        d.Y
      ]) + ")";
    });
  
  }); 
  
}); 



//binding data code
// d3.select("body").selectAll("p")
//     .data(dataset)
//     .enter()
//     .append("p")
//     .text("New paragraph!");







