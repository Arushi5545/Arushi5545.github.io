let data;

// preload table data
function preload() {
    data = loadTable(
      'leftAnkle_whole.csv',
			'csv',
			'header');
}

// using a p5js table object, return an object having
// the values of the given column, plus the minimum value
// and maximum value from that column
function colValsMinMax(tab, colName) {
  let vals = data.getColumn(colName);
  let obj = {
    values: vals,
    min: min(vals),
    max: max(vals),
  }
  return obj;
}

function setup() { 
  createCanvas(640, 480);
  // how many rows?
  console.log(data.getRowCount());
  // what are the columns?
  console.log(data.columns);

  background(50);
  
 
  // fetch values and min/max for X
  let Acc_X = colValsMinMax(data, "Accelerometer.X");
  console.log(Acc_X.min);
  console.log(Acc_X.max);

    // fetch values and min/max for Y
    let Acc_Y = colValsMinMax(data, "Accelerometer.Y");
    console.log(Acc_Y.min);
    console.log(Acc_Y.max);

  // fetch values and min/max for Z
  let Acc_Z = colValsMinMax(data, "Accelerometer.Z");
  console.log(Acc_Z.min);
  console.log(Acc_Z.max);

  // noprotect
  for (var i = 0; i < data.getRowCount(); i++) {
    
    // draw X
    stroke(0, 255, 0);
    let X_pos = map(i, 0, data.getRowCount(), 0, width);
    let Y_pos = map(Acc_X.values[i], Acc_X.min, Acc_X.max, height, 0);
    point(X_pos, Y_pos);   
    

    // draw Y
    stroke(0, 0, 255);
    let X_pos_1 = map(i, 0, data.getRowCount(), 0, width);
    let Y_pos_1 = map(Acc_Y.values[i], Acc_Y.min, Acc_Y.max, height, 0);
    point(X_pos_1, Y_pos_1);   
      
     
    // draw Z
    stroke(255, 0, 0);
    let X_pos_2 = map(i, 0, data.getRowCount(), 0, width);
    let Y_pos_2 = map(Acc_Z.values[i], Acc_Z.min, Acc_Z.max, height, 0);
    point(X_pos_2, Y_pos_2);   
    
   
  }
}
