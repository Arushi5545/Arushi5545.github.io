var colors = {
    'environment':         '#edbd00',
    'social':              '#367d85',
    'animals':             '#97ba4c',
    'health':              '#f5662b',
    'research_ingredient': '#3f3e47',
    'fallback':            '#9f9fa3'
  };

//load data into sanky  
//d3.csv("sankey.csv", function(error, data){  
d3.json("data.json", function(error, json) {
//d3.json("//cdn.rawgit.com/q-m/d3.chart.sankey/master/example/data/product.json", function(error, json) {
    console.log("json", json);
var chart = d3.select("#chart").append("svg").chart("Sankey.Path");

chart
    .name(label)
    .colorNodes(function(name, node) {
        return color(node, 1) || colors.fallback;
    })
    .colorLinks(function(link) {
        return color(link.source, 4) || color(link.target, 1) || colors.fallback;
    })
    .nodeWidth(15)
    .nodePadding(10)
    .spread(true)
    .iterations(0)
    .draw(json);
    //adds the tooltip
    //   .on("mousemove", function(d) {
    //     var mouse = d3.mouse(this);
    //     d3.select("#tooltip")
    //         .style("display", "block")
    //         .html("<h1>" + d + "</h1>")
    //         .style("left", mouse[0] + "px")
    //         .style("top", mouse[1] - 50 + "px");
    // })
    // .on("mouseout", function(d) {
    //     d3.select("#tooltip")
    //         .style("display", "none")
    // });


  //testing the values for each nodes
  console.log("nodes", json.nodes);
  //console.log("value", json.nodes.links.value);


function label(node) {
    //what is happening here?
  return node.name.replace(/\s*\(.*?\)$/, '');
}

function color(node, depth) {
//how does this work?
  var id = node.id.replace(/(_score)?(_\d+)?$/, '');
  if (colors[id]) {
    return colors[id];
  } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
    return color(node.targetLinks[0].source, depth-1);
  } else {
    return null;
  }
}
});