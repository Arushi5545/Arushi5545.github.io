console.log("helloD3");
//select is a function in d3
var title=d3.select("#title");

console.log(title);

title
.attr("class", "big")
.style("color", "red")
.style("font-family", "comic Sans MS");

 var circles= d3.svg.selectAll(".dot");
// .data(starterData);

var svg=d3.select("svg");

function changeColor(color){
    d3.selectAll(".dot").attr("fill", color);
}
function dance(){
circles.attr("cx", function(){
    return Math.random()*200;
});
}
function radius(){
    circles.data([12,33,17]);
    circles.attr("r",function(d){
        return d;
    });
}
// function radius(){
//     circles.data([
//             {name:"Dave", height:72},
//             {name:"Mathew", height:88},
//             {name:"Diana",height:64};
// });
//     }
var starterData=[
    {name:"Dave", height:72},
    {name:"Mathew", height:88},
    {name:"Diana",height:64},
    {name:"Thor",height:90}
];

function redrawCircles(){

var newCircles=circle.data(starterData);

newCircles.enter().append("circle")
.attr("class, dot")
.attr("cx", function(){
    return Math.random()*200;
})
.attr("cy",50)
.attr("r",20);

newCircles.attr("r",function(d){
    return d.height/2;
});
} 
