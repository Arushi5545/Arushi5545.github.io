var width =window.innerWidth;
var height=700;

d3.queue()
.defer(d3.csv, "")
.defer(d3.csv, "")
.defer()
.awaitall(function(error, dataArray){
    var data= dataArray[0];
    data.forEach(function(d){
        d.export=parseFloat(d.export);
    });
    var latestData=data.filter(function(d){
        returnd.yer =="2018";

    });
    var domain =d3.extent(latestData, function(d){
        return d.export;

    });
    var colorScale =d3.scalarLinear()
    .
    }
})