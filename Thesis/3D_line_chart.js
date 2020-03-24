Plotly.d3.csv('leftAnkle_whole.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) 
          { return row[key]; }); }
          
var x = unpack(rows , 'Accelerometer.X');
var y = unpack(rows , 'Accelerometer.Y');
var z = unpack(rows , 'Accelerometer.Z'); 
// var c = unpack(rows , 'color');
Plotly.newPlot('myDiv', [{
  type: 'scatter3d',
  mode: 'lines',
  x: x,
  y: y,
  z: z,
  opacity: 1,
  
  line: {
    width: 2,
    opacity: 0.1,
    color: "red",
    reversescale: false
  }
}], {
  height: 640
});
});