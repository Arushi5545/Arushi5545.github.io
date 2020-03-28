var data_file;
var POINT_SCALE = 30;


function setup() {
  console.log("Setting up the canvas");
  var canvas = createCanvas(window.innerWidth/2.5, window.innerHeight/2.5, P2D); //WHEN YOU NEED TO USE P3D, CHECK IN THE DOCUMENTATION FOR DEPTH SORT, DEPTH TESTING
  canvas.parent('sketch-holder-1');
  pixelDensity(displayDensity());
  //int speed = 10;
  //preload();
  //test_print();
  //frameRate(10);
}

function draw() {
  background(255);
  push();
  translate(width/2, height/2);
  //scale(50);
  drawConsecLines();
  pop();
  fill(255, 0, 0);
  // text(frameCount, 30, 30);
}

function mouseClicked(){
  noLoop();
}

// function mouseReleased(){
//   loop();
// }

function test_print(){
  console.log("Printing for test");
}

// Get data from a file
function preload() {
  console.log("Reading the file");
  //data_file = loadTable("leftAnkle_whole.csv", "header");
  data_file = loadTable('leftAnkle_whole.csv','csv', 'header');
  // print(data_file);
}


function drawConsecLines() {
  //console.log("Numbers of rows: " + data_file.getRowCount() + " columns: " + data_file.getColumnCount());

  // iterate row by row
  let prevX = data_file.getNum(0, 1)*POINT_SCALE;
  let prevY = data_file.getNum(0, 2)*POINT_SCALE;
  let prevZ = data_file.getNum(0, 3)*POINT_SCALE;

  
  for (var i=0; i<data_file.getRowCount()-2 && i<frameCount; i+=2) {
    //print("i is " + i+"\n");
    // data_file.getRowCount()-2
    let currX = data_file.getNum(i+1, 1)*POINT_SCALE;
    let currY = data_file.getNum(i+1, 2)*POINT_SCALE;
    let currZ = data_file.getNum(i+1, 3)*POINT_SCALE;

    print("current points: ")
    print(currX, currY, currZ);

    //Slow down the drawing of this line with animation
    var alpha = map(constrain(frameCount-i, 0, 100), 0, 100, 70, 0);  
    stroke(0, alpha);
    //line(currX, currY, currZ, prevX, prevY, prevZ);
    line(prevX, prevY, prevZ, currX, currY, currZ);
    //Don't go to next iteration unless this line is drawn

    prevX = currX;
    prevY = currY;
    prevZ = currZ;
    // currX = prevX;
    // currY = prevY;
    // currZ = prevZ;

    print("prev points: ")
    print(prevX, prevY, prevZ);
  }

}


