//different data arrays
var dataArray1 = [30,35,45,55,70];
var dataArray2 = [50,55,45,35,20,25,25,40];

//globals
var dataIndex=1;
var xBuffer=50;
var yBuffer=150;
var lineLength=400;


//create main svg element
var svgDoc = d3.select("body").append("svg")

svgDoc.append("text")
    .attr("x",xBuffer+(lineLength/2))
    .attr("y",50)
    .text("dataset"+dataIndex);

//create axis line
svgDoc.append("line")
    .attr("x1",xBuffer)
    .attr("y1",yBuffer)
    .attr("x1",xBuffer+lineLength)
    .attr("y2",yBuffer)

//create basic rectangles
svgDoc.append("g").selectAll("rect")
    .data(eval("dataArray"+dataIndex))
    .enter()
    .append("rect")
    .attr("x",function(d,i){
        var spacing = lineLength/(eval("dataArray"+dataIndex).length);
        return xBuffer+(i*spacing)
    })
    .attr("y",yBuffer)
.attr("width",function(d,i){return d})
.attr("height",function(d,i){return d});


//button to swap over datasets
d3.select("body").append("button")
    .text("Dataset 1")
    .on("click",function(){
        //select new data
        dataIndex=1;
          
        //rejoin data
        var rectangle = svgDoc.select("g").selectAll("rect")
            .data(eval("dataArray"+dataIndex));
        
        rectangle.exit().remove();//remove not needed rectangle
        rectangle.enter().append("rect")
.attr("width",0);//create any new rectangle needed

rectangle.enter().append("rect")
            .attr("height",0);

        //update all rect to new positions
        rectangle.transition()
            .duration(500)
            .attr("x",function(d,i){
                var spacing = lineLength/(eval("dataArray"+dataIndex).length);
                return xBuffer+(i*spacing)
            })
            .attr("y",yBuffer)
.attr("width",function(d,i){return d})
.attr("height",function(d,i){return d});

        d3.select("text").text("dataset"+dataIndex);

});//end click function

//button for dataset 2
d3.select("body").append("button")
    .text("Dataset 2")
    .on("click",function(){
        //select new data
       
            dataIndex=2;  
        //rejoin data
        var rectangle = svgDoc.select("g").selectAll("rect")
            .data(eval("dataArray"+dataIndex));
        
        rectangle.exit().remove();//remove unneeded rectangle
        rectangle.enter().append("rect")
.attr("width",0);//create any new rectangle needed

rectangle.enter().append("rect")
            .attr("height",0);

        //update all rect to new positions
        rectangle.transition()	
.duration(500)
            .attr("x",function(d,i){
                var spacing = lineLength/(eval("dataArray"+dataIndex).length);
                return xBuffer+(i*spacing)
            })
            .attr("y",yBuffer)
.attr("width",function(d,i){return d})
.attr("height",function(d,i){return d});

        d3.select("text").text("dataset"+dataIndex);

    });//end click function

