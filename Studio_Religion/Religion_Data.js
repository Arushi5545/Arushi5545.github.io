
d3.csv("All_Places_of_Worship_final.csv", function(data){
  //console.log("csv:", data);
  console.log("read csv");

  var groupedCITIES = d3.nest()
                    .key(function(row) {
                        return row.CITY;
                    })
                    .map(data);
                    console.log("grouped cities", groupedCITIES);
                    console.log("All cities NYC", groupedCITIES["NEW YORK"]);
  
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

});

//binding data code
// d3.select("body").selectAll("p")
//     .data(dataset)
//     .enter()
//     .append("p")
//     .text("New paragraph!");

