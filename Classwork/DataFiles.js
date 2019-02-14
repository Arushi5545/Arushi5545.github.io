console.log("DataFiles");

d3.text("/Data/textData.txt", function(error, data){
    console.log("error:", error);
    console.log("text;", data);
});
    
d3.csv("/Data/csvData.csv", function(error, data){
    console.log("csv:", data);
    data.forEach(function(d){
        //console.log(d);
        //allows you to parse the numbers to 
        d.export=parseFloat(d.export);
    });
});

d3.csv("/Data/jsonData.json", function(error, data){
    console.log("error:", error);
    console.log("json:", data);
});

console.log("END OF LINE");
//API -eg sensus bureau we use API using url structures
//you can copy paste the json file