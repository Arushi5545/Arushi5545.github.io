Table data_file;
int POINT_SCALE = 50;

void setup() {
  size(1000, 600, P2D); //WHEN YOU NEED TO USE P3D, CHECK IN THE DOCUMENTATION FOR DEPTH SORT, DEPTH TESTING
  pixelDensity(displayDensity());
  //int speed = 10;
  readFile();
}

void draw() {
  background(255);
  push();
  translate(width/2, height/2);
  //scale(50);
  drawConsecLines();
  //drawSmooth();
  //drawTest();
  pop();
  fill(255, 0, 0);
  text(frameCount, 30, 30);
}

// Get data from a file
void readFile() {
  //data_file = loadTable("rightAnkle_whole.csv", "header");
  data_file = loadTable("leftWrist_whole.csv", "header");
  print("Numbers of rows: " + data_file.getRowCount() + " columns: " + data_file.getColumnCount());
}

void drawConsecLines2() {
  //stroke(2);
  //strokeWeight(1);
  noFill();
  stroke (40, 50, 300, 04);
  // iterate row by row
  float prevX = data_file.getFloat(0, 1)*POINT_SCALE;
  float prevY = data_file.getFloat(0, 2)*POINT_SCALE;
  float prevZ = data_file.getFloat(0, 3)*POINT_SCALE;

  // print("First row: " + prevX + "," + prevY + "," + prevZ);

  beginShape();
  for (int i=0; i<data_file.getRowCount()-2; i+=2) {
    //print("i is " + i+"\n");
    float currX = data_file.getFloat(i+1, 1)*POINT_SCALE;
    float currY = data_file.getFloat(i+1, 2)*POINT_SCALE;
    float currZ = data_file.getFloat(i+1, 3)*POINT_SCALE;

    vertex(prevX, prevY, prevZ);
    vertex(currX, currY, currZ);
    prevX = currX;
    prevY = currY;
    prevZ = currZ;
  }

  endShape();
}

void drawConsecLines() {

  // iterate row by row
  float prevX = data_file.getFloat(0, 1)*POINT_SCALE;
  float prevY = data_file.getFloat(0, 2)*POINT_SCALE;
  float prevZ = data_file.getFloat(0, 3)*POINT_SCALE;

  
    for (int i=0; i<data_file.getRowCount()-2 && i<frameCount; i+=2) {
    //print("i is " + i+"\n");
    float currX = data_file.getFloat(i+1, 1)*POINT_SCALE;
    float currY = data_file.getFloat(i+1, 2)*POINT_SCALE;
    float currZ = data_file.getFloat(i+1, 3)*POINT_SCALE;

    //prevX = lerp(prevX,currX,  0.05);
    //prevY = lerp(prevY,currY,  0.05);
    //prevZ = lerp(prevZ, currZ, 0.05);
    float x1 = prevX;
    float x2 = prevY;
    float x3 = prevZ;

    //Slow down the drawing of this line with animation
    float alpha = map(constrain(frameCount-i-100, 0, 100), 0, 100, 70, 0);  
    stroke(0, alpha);
    line(currX, currY, currZ, prevX, prevY, prevZ);
    //Don't go to next iteration unless this line is drawn

    prevX = currX;
    prevY = currY;
    prevZ = currZ;
  }
}


void drawTest() {
  noFill();
  stroke (40, 50, 300, .2);
  beginShape();
  vertex(-100, -100, -100);
  vertex( 100, -100, -100);
  vertex(   0, 0, 100);

  //vertex( 100, -100, -100);
  //vertex( 100, 100, -100);
  //vertex(   0, 0, 100);

  vertex( 100, 100, -100);
  //vertex(-100, 100, -100);
  //vertex(   0, 0, 100);

  //vertex(-100, 100, -100);
  //vertex(-100, -100, -100);
  //vertex(   0, 0, 100);
  endShape();
}