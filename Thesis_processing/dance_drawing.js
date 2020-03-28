var data_file_la, data_file_ra, data_file_lw, data_file_rw;
var POINT_SCALE = 50;

var widthGrid = 500;
var heightGrid = 300;


function setup() {
    console.log("Setting up the canvas");
    createCanvas(windowWidth, windowHeight, P2D); //WHEN YOU NEED TO USE P3D, CHECK IN THE DOCUMENTATION FOR DEPTH SORT, DEPTH TESTING
    //canvas.parent('sketch-holder-1');
    pixelDensity(displayDensity());
  
    //int speed = 10;
    //preload();
    //test_print();
    //frameRate(10);
}

function draw() {
    background(255);
    translate(width/4,0)
    push();
    //translate(width1/4, height1/4);
    translate(widthGrid/4, height/4);
    //rect(width/4, height/4, 100, 100);
    drawConsecLines(data_file_la, 154,205,50);
   
  
    // translate(3*width1/4, height1/4);
    translate(widthGrid, 0);
    //rect(3*width/4, height/4, 100, 100);
    drawConsecLines(data_file_ra, 210,105,30);
  
    
    // translate(3 * width1 / 4, -height1 / 4);
    translate(0, heightGrid);
    //rect(3*width/4, -height/4, 100, 100);
    drawConsecLines(data_file_lw, 32,178,170);
    
    // translate(-3 * width1 / 4, -height1 / 4);
    translate(-widthGrid, 0);
    //rect(-3*width/4, -height/4, 100, 100);
    drawConsecLines(data_file_rw, 218,112,214);
    pop();
    fill(255, 0, 0);
    // text(frameCount, 30, 30);
}

function mouseClicked() {
    noLoop();
}


// Get data from a file
function preload() {
    console.log("Reading the files");
    //data_file = loadTable("leftAnkle_whole.csv", "header");
    data_file_la = loadTable('leftAnkle_whole.csv', 'csv', 'header');
    data_file_ra = loadTable('rightAnkle_whole.csv', 'csv', 'header');
    data_file_lw = loadTable('leftWrist_whole.csv', 'csv', 'header');
    data_file_rw = loadTable('rightWrist_whole.csv', 'csv', 'header');
    // print(data_file);
}


function drawConsecLines(data_file, col_R, col_G, col_B) {
    //console.log("Numbers of rows: " + data_file.getRowCount() + " columns: " + data_file.getColumnCount());
    // print("Plotting data: ");
    // print(data_file);
    // iterate row by row
    let prevX = data_file.getNum(0, 1) * POINT_SCALE;
    let prevY = data_file.getNum(0, 2) * POINT_SCALE;
    let prevZ = data_file.getNum(0, 3) * POINT_SCALE;


    for (var i = 0; i < data_file.getRowCount() - 2 && i < frameCount; i += 2) {
        //print("i is " + i+"\n");
        // data_file.getRowCount()-2
        let currX = data_file.getNum(i + 1, 1) * POINT_SCALE;
        let currY = data_file.getNum(i + 1, 2) * POINT_SCALE;
        let currZ = data_file.getNum(i + 1, 3) * POINT_SCALE;

        // print("current points: ")
        // print(currX, currY, currZ);

        //Slow down the drawing of this line with animation
        strokeWeight(10);
        var alpha = map(constrain(frameCount - i, 0, 100), 0, 100, 70, 0);
        stroke(col_R,col_G,col_B, alpha);
        //line(currX, currY, currZ, prevX, prevY, prevZ);
        line(prevX, prevY, prevZ, currX, currY, currZ);
        //Don't go to next iteration unless this line is drawn

        prevX = currX;
        prevY = currY;
        prevZ = currZ;
        // currX = prevX;
        // currY = prevY;
        // currZ = prevZ;

        // print("prev points: ")
        // print(prevX, prevY, prevZ);
    }

}


