/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 6;

// other variables can be in here too
// here's some examples for colors used

// Positional Variables
this.XPos = 0;
this.YPos = -0.5;

// FaceDraw Variables
this.sideTilt = 0; // -10, 10
this.jawDrop = 0; // 1, 3
this.eyeTilt = 0; // -0.5, 0.5
this.smoke = 0; // true/false
this.baseColour = 124; // 0, 360
this.baseHue = 100;
this.eyeHue = 46;
this.eyeColour = 46; // 0, 360

// this.tilt = this.sideTilt;

//Tilt Offset Variables Setup
this.lOffset = 0; // Left Offset
this.cOffset = this.sideTilt; // Central Offset
this.rOffset = 0; //Right Offset

this.clOffset = 0; // Left Central
this.crOffset = 0; // Right Central

//Perspective Dip: Y Axis
this.yDip = 0;

//List Var

// this.band1aX = [];
// this.band1aY = [];
// this.band1bX = [];
// this.band1bY = [];
// this.band1cX = [];
// this.band1cX = [];
// this.band1cY = [];

// this.band2aX = [];
// this.band2aY = [];
// this.band2bX = [];
// this.band2bY = [];
// this.band2cX = [];
// this.band2cX = [];
// this.band2cY = [];

// this.noseBridgeX = [];
// this.noseBridgeY = [];
// this.noseX = [];
// this.noseY = [];
// this.forredX = [];
// this.forredY = [];
// this.faceX = [];
// this.faceY = [];
// this.mouthX = [];
// this.mouthY = [];
// this.jawX = [];
// this.jawY = [];
// this.teethNo;
// this.teethRowPtX = [];
// this.teethRowPtY = [];



const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face

  this.horns = 1;
  this.eyeHue = 46;
  this.baseHue = 100;

  // Positional Variables
  let XPos = 0;
  let YPos = -0.5;

  // FaceDraw Variables
  let sideTilt = 0; // -10, 10
  let jawDrop = 0; // 1, 3
  let eyeTilt = 0; // -0.5, 0.5
  let smoke = 0; // true/false
  let baseColour = 124; // 0, 360
  let eyeColour = 46; // 0, 360

  // this.tilt = this.sideTilt;

  //Tilt Offset Variables Setup
  let lOffset = 0; // Left Offset
  let cOffset = this.sideTilt; // Central Offset
  let rOffset = 0; //Right Offset

  let clOffset = 0; // Left Central
  let crOffset = 0; // Right Central

  //Perspective Dip: Y Axis
  let yDip = 0;

  angleMode(DEGREES);
  colorMode(HSB);

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

    push();
    scale(0.3, 0.3);
    // // Positional Variables
    let XPos = 0;
    let YPos = segment_average(positions.chin)[1] - 3;

    let jawDrop = (segment_average(positions.bottom_lip)[1] - segment_average(positions.top_lip)[1]) * 10;
    let eyeTilt = (segment_average(positions.left_eye)[1] - segment_average(positions.left_eyebrow)[1]) / 2;

    let sideTilt = (segment_average(positions.nose_bridge)[0]) * 20;
    let cOffset = sideTilt;

    let leftEyePos = segment_average(positions.left_eye)[0];
    let rightEyePos = segment_average(positions.right_eye)[0];

    let noseFlare = (segment_average(positions.top_lip)[1] - segment_average(positions.nose_tip)[1]);
    
    let horns = this.horns;
    let eyeColour = this.eyeHue;
    let baseColour = this.baseHue;

    //HYDRA NECK
    push();
    scale(0.1);

    noFill();
    noStroke();
    //Neck Bezier Points
    let bX1 = XPos - sideTilt,
    bX2 = XPos - sideTilt * 60,
    bX3 = width / 2 + random(-100, 100),
    bX4 = width / 2;

    let bY1 = YPos - 50,
    bY2 = YPos - 5,
    bY3 = height + random(-30, 30),
    bY4 = height;

    // //Beheaded Neck Ending Angle
    // let tilt;
    // if(bX2 > (bX1 + 50)) {
    //   tilt = -90;
    // } else if (bX2 > (bX1 + 10)) {
    //   tilt = -40;
    // } else if (bX2 < (bX1 - 50)){
    //   tilt = 90;
    // } else if (bX2 < (bX1 - 10)) {
    //   tilt = 40;
    // } else {
    //   tilt =  0;
    // }

    //Draw Neck
    colorMode(HSB);
    strokeCap(SQUARE);
    let steps = 200;

    //Base Line
    stroke(baseColour, 100, 20);
    strokeWeight(100);
    bezier(bX1, bY1 + 40, bX2, bY2 + 40, bX3, bY3 + 40, bX4, bY4 + 40);

    //NeckLine 1
    stroke(baseColour, 100, 60);
    strokeWeight(5);
    bezier(bX1, bY1 - 5, bX2, bY2 - 5, bX3, bY3 - 5, bX4, bY4 - 5);
    strokeWeight(1);
    for(i = steps; i >= 0; i --) { // Scales
      let t = i / steps;
      let neckX = bezierPoint(bX1, bX2, bX3, bX4, t);
      let neckY = bezierPoint(bY1, bY2, bY3, bY4, t);
      stroke(baseColour + (i / 5), 100, 80 - (i / 4));
      fill(baseColour + (i / 3), 100, 60 - (i / 15));
      if(i %2 == 1) {
        circle(neckX, neckY, 15);
      } else {
        circle(neckX, neckY + 10, 15);
      }
    }
    //Neck Line 2
    noFill();
    stroke(baseColour, 100, 40);
    strokeWeight(30);
    bezier(bX1, bY1, bX2, bY2, bX3, bY3, bX4, bY4);
    strokeWeight(1);
    for(i = steps; i >= 0; i --) { // Scales
      let t = i / steps;
      let neckX = bezierPoint(bX1, bX2, bX3, bX4, t);
      let neckY = bezierPoint(bY1, bY2, bY3, bY4, t);
      fill(baseColour + (i / 3), 100, 40 - (i / 15));
      stroke(baseColour + (i / 5), 100, 60 - (i / 4));
      if(i %2 == 1) {
        circle(neckX, neckY, 15);
        circle(neckX, neckY + 10, 15);
      } else {
        circle(neckX, neckY + 20, 15);
        circle(neckX, neckY + 30, 15);
      }
    }
    //Neck Line 3
    noFill();
    stroke(baseColour, 100, 30);
    strokeWeight(50);
    bezier(bX1, bY1 + 40, bX2, bY2 + 40, bX3, bY3 + 40, bX4, bY4 + 40);
    strokeWeight(1);
    for(i = steps; i >= 0; i --) { // Scales
      let t = i / steps;
      let neckX = bezierPoint(bX1, bX2, bX3, bX4, t);
      let neckY = bezierPoint(bY1, bY2, bY3, bY4, t);
      fill(baseColour + (i / 3), 100, 30 - (i / 15));
      stroke(baseColour + (i / 5), 100, 50 - (i / 4));
      if(i %2 == 1) {
        circle(neckX, neckY + 20, 15);
        circle(neckX, neckY + 30, 15);
        circle(neckX, neckY + 40, 15);
      } else {
        circle(neckX, neckY + 50, 15);
        circle(neckX, neckY + 60, 15);
      }
    }
    //Neck Line 4
    noFill();
    stroke(baseColour, 100, 20);
    strokeWeight(40);
    bezier(bX1, bY1 + 70, bX2, bY2 + 70, bX3, bY3 + 70, bX4, bY4 + 70);
    strokeWeight(1);
    for(i = steps; i >= 0; i --) { // Scales
      let t = i / steps;
      let neckX = bezierPoint(bX1, bX2, bX3, bX4, t);
      let neckY = bezierPoint(bY1, bY2, bY3, bY4, t);
      fill(baseColour + (i / 3), 100, 20 - (i / 15));
      stroke(baseColour + (i / 5), 100, 40 - (i / 4));
      if(i %2 == 1) {
        circle(neckX, neckY + 50, 15);
        circle(neckX, neckY + 60, 15);
      } else {
        circle(neckX, neckY + 70, 15);
        circle(neckX, neckY + 80, 15);
      }
    }
    pop();

    //Draw Hydra Face
    if (sideTilt >= 0) { //LeftSide on Top
      // lOffset = sideTilt * 0.1;
      // rOffset = sideTilt * -0.75;
      let rOffset = (positions.chin[16])[0] * -0.75;
      let lOffset = (positions.chin[0])[0] * 0.1;
      clOffset = sideTilt * 0.75;
      crOffset = sideTilt * 0.5;
      yDip = sideTilt * 0.1;

      rightFace(XPos, YPos, rOffset, cOffset, crOffset, yDip, jawDrop, eyeColour, baseColour, eyeTilt, rightEyePos, noseFlare, smoke, horns);
      leftFace(XPos, YPos, lOffset, rOffset, cOffset, clOffset, yDip, jawDrop, eyeColour, baseColour, eyeTilt, leftEyePos, noseFlare, smoke, horns);

      noStroke();
      fill(300, 100, 100);
      circle(cOffset, 0, 2);
      circle(clOffset, 1, 2);
      circle(crOffset, 2, 2);
      textSize(1);
      text('Facing Left', 0, -12);

    } else { // Right Side on Top
      // lOffset = sideTilt * -0.7
      // rOffset = sideTilt * 0.1;
      let rOffset = (positions.chin[16])[0] * 0.1;
      let lOffset = (positions.chin[0])[0] * -0.7;
      clOffset = sideTilt * 0.5;
      crOffset = sideTilt * 0.75;
      yDip = (sideTilt * -1) * 0.1;

      leftFace(XPos, YPos, lOffset, rOffset, cOffset, clOffset, yDip, jawDrop, eyeColour, baseColour, eyeTilt, leftEyePos, noseFlare, smoke, horns);
      rightFace(XPos, YPos, rOffset, cOffset, crOffset, yDip, jawDrop, eyeColour, baseColour, eyeTilt, rightEyePos, noseFlare, smoke, horns);
    
      noStroke();
      fill(200, 100, 100);
      circle(cOffset, 0, 2);
      circle(clOffset, 1, 2);
      circle(crOffset, 2, 2);
      textSize(1);
      text('Facing Right', 0, -12);

      //Draw Conditional Smoke
      colorMode(RGB);
      fill(255, 50);
      noStroke();
      blendMode(SOFT_LIGHT);
      if(jawDrop > 2) { // Jaw Open?
        for(i = 0; i < 50; i ++) {
          if(cOffset >= 0) {
            circle(XPos + random(-2, 2) + (i/4) + cOffset, YPos + 6 + random(-3, 5) + (i / 10), random(0.5, 4));
          } else {
            circle(XPos - random(-2, 2) - (i/4) + cOffset, YPos + 6 + random(-3, 5) + (i / 10), random(0.5, 4));
          }
        }
      }
      blendMode(BLEND);
    

    }
    pop();
    // head

    fill(255, 100, 100);
    // ellipse(chinPt, positions.chin[0][0], 0.5);
    // ellipse(segment_average(positions.chin)[0], 0, 3, 4);

    this.draw_segment(positions.chin);


  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.horns = map(settings[0], 0, 100, 0, 1);
    this.eyeHue = map(settings[1], 0, 100, 15, 80);
    this.baseHue = map(settings[2], 0, 100, 20, 300);

    // this.sideTilt = map(settings[0], 0, 100, -10, 10);
    // this.jawDrop = map(settings[1], 0, 100, 1, 3);
    // this.eyeTilt = map(settings[2], 0, 100, -0.5, 0.5);
    // this.smoke = int(map(settings[3], 0, 100, 0, 1));
    // this.baseColour = map(settings[4], 0, 100, 0, 360);
    // this.eyeColour = map(settings[5], 0, 100, 0, 360);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.horns, 0, 1, 0, 100);
    settings[1] = map(this.eyeHue, 15, 80, 0, 100);
    settings[2] = map(this.baseHue, 20, 300, 0, 100);

    // settings[0] = map(this.sideTilt, -10, 10, 0, 100);
    // settings[1] = map(this.jawDrop, 1, 3, 0, 100);
    // settings[2] = map(this.eyeTilt, -0.5, 0.5, 0, 100);
    // settings[3] = map(this.smoke, 0, 1, 0, 100);
    // settings[4] = map(this.baseColour, 0, 360, 0, 100);
    // settings[5] = map(this.eyeColourColour, 0, 360, 0, 100);
    return settings;
  }

  function leftFace(XPos, YPos, lOffset, rOffset, cOffset, clOffset, yDip, jawDrop, eyeColour, baseColour, eyeTilt, leftEyePos, noseFlare, smoke, horns) {
    let scaleBrightness;
    let scaleStrokeBrightness;

    //Throat
    fill(10, 100, 20);
    noStroke();
    if(cOffset >= 0) { // To avoid jaw overlap
      beginShape();
        vertex(XPos, YPos);
        vertex(XPos - 4 + lOffset, YPos + 5);
        vertex(XPos - 3 + clOffset, YPos + 6 + jawDrop - clOffset * 0.1);
        vertex(XPos, YPos + 6 + jawDrop - clOffset * 0.1);
        vertex(XPos, YPos);
      endShape(CLOSE);
    } else {
      beginShape();
        vertex(XPos, YPos);
        vertex(XPos - 4 + lOffset, YPos + 5);
        vertex(XPos - 3 + clOffset, YPos + 6 + jawDrop + clOffset * 0.09);
        vertex(XPos, YPos + 6 + jawDrop + clOffset * 0.09);
        vertex(XPos, YPos);
      endShape(CLOSE);
    }

    //Neck
    if(cOffset >= 0) {
      //Second Band
        //Bottom Quad
        scaleBrightness = 25;
        scaleStrokeBrightness = 10;
        let band2cX = [XPos - 4 - lOffset * 2, XPos - 3 - lOffset * 7.5, XPos - 3 - lOffset * 6, XPos - 3 - lOffset * 1.5];
        let band2cY = [YPos + 5, YPos + 3, YPos + 7, YPos + 8];
        quad(band2cX[0], band2cY[0], band2cX[1], band2cY[1], band2cX[2], band2cY[2], band2cX[3], band2cY[3]);
        // DrawScales(true, 7 + (cOffset / 2), 5, band2cX, band2cY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Middle Quad
        scaleBrightness = 35;
        scaleStrokeBrightness = 20;
        let band2bX = [XPos - 6 - lOffset * 0.4, XPos - 4 - lOffset * 5.5, XPos - 3 - lOffset * 7.5, XPos - 4 - lOffset * 2];
        let band2bY = [YPos - 3, YPos - 2, YPos + 3, YPos + 5];
        quad(band2bX[0], band2bY[0], band2bX[1], band2bY[1], band2bX[2], band2bY[2], band2bX[3], band2bY[3]);
        // DrawScales(true, 5 + (cOffset / 2), 12, band2bX, band2bY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Top Quad
        fill(baseColour, 100, 40);
        scaleBrightness = 45;
        scaleStrokeBrightness = 30;
        let band2aX = [XPos - 4 - lOffset * 3.5, XPos - 4 - lOffset * 5, XPos - 4 - lOffset * 5.5, XPos - 6 - lOffset * 0.4];
        let band2aY = [YPos - 5, YPos - 3, YPos - 2, YPos - 3];
        quad(band2aX[0], band2aY[0], band2aX[1], band2aY[1], band2aX[2], band2aY[2], band2aX[3], band2aY[3]);
        // DrawScales(true, 4 + (cOffset / 2), 3, band2aX, band2aY, baseColour, scaleBrightness, scaleStrokeBrightness);

      //First Band
        //Bottom Quad
        scaleBrightness = 35;
        scaleStrokeBrightness = 20;
        let band1cX = [XPos - 4 + lOffset, XPos - 4 - lOffset * 2, XPos - 3 - lOffset * 1.5, XPos - 3 + lOffset];
        let band1cY = [YPos + 5, YPos + 5, YPos + 8, YPos + 7];
        quad(band1cX[0], band1cY[0], band1cX[1], band1cY[1], band1cX[2], band1cY[2], band1cX[3], band1cY[3]);
        // DrawScales(true, 4 + (cOffset / 4), 5, band1cX, band1cY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Middle Quad
        scaleBrightness = 45;
        scaleStrokeBrightness = 30;
        let band1bX = [XPos - 6 + lOffset, XPos - 6 - lOffset * 0.4, XPos - 4 - lOffset * 2, XPos - 4 + lOffset];
        let band1bY = [YPos - 3, YPos - 3, YPos + 5, YPos + 5];
        quad(band1bX[0], band1bY[0], band1bX[1], band1bY[1], band1bX[2], band1bY[2], band1bX[3], band1bY[3]);
        // DrawScales(true, 4 + (cOffset / 6), 14, band1bX, band1bY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Top Quad
        scaleBrightness = 55;
        scaleStrokeBrightness = 40;
        let band1aX = [XPos - 4 + lOffset, XPos - 4 - lOffset * 3.5, XPos - 6 - lOffset * 0.4, XPos - 6 + lOffset];
        let band1aY = [YPos - 5.5, YPos - 5, YPos - 3, YPos - 3];
        quad(band1aX[0], band1aY[0], band1aX[1], band1aY[1], band1aX[2], band1aY[2], band1aX[3], band1aY[3]);
        // DrawScales(true, 5 + (cOffset / 4), 4, band1aX, band1aY, baseColour, scaleBrightness, scaleStrokeBrightness);
    }
    
    //Face Points
    let faceX = [XPos + (clOffset * 1.05), XPos - 6 + lOffset, XPos - 4 + lOffset, XPos - 3 + clOffset];
    let faceY = [YPos - (yDip * 0.4), YPos - 3, YPos + 5, YPos + 6];

    //Upper Lip
    strokeWeight(1);
    stroke(baseColour, 100, 10);
    line(faceX[3], faceY[3], faceX[2], faceY[2]);
    noStroke();

    //Draw Face
    fill(baseColour, 100, 70);
    quad(faceX[0], faceY[0], faceX[1], faceY[1], faceX[2], faceY[2], faceX[3], faceY[3]);

    //Face Scales
    scaleBrightness = 65;
    scaleStrokeBrightness = 30;
    DrawScales(true, 15 + cOffset, 15, faceX, faceY, baseColour, scaleBrightness, scaleStrokeBrightness);

    //Jaw Points
    let jawX = [XPos - 3 + clOffset, XPos - 4 + lOffset, XPos - 3 + lOffset, XPos - 1.5 + clOffset];
    let jawY = [YPos + 6 + jawDrop, YPos + 5, YPos + 7.5, YPos + 8 + jawDrop];

    //Draw Jaw & Scales
    let teethNo; // Set up Teeth Amount
    noStroke();
    if(cOffset >= 0) { // Jaw Outside Mouth
      teethNo = 2 + cOffset;
      fill(baseColour, 100, 40);
      scaleBrightness = 40;
      scaleStrokeBrightness = 20;
      quad(jawX[0], jawY[0], jawX[1], jawY[1], jawX[2], jawY[2], jawX[3], jawY[3]);
      DrawScales(true, 10 + cOffset, 5, jawX, jawY, baseColour, scaleBrightness, scaleStrokeBrightness);
    } else { // Jaw Inside Mouth
      teethNo = 4 - cOffset;
      fill(10, 100, 20);
      quad(jawX[0], jawY[0], jawX[1], jawY[1], jawX[2], jawY[2] - 0.5, jawX[3], jawY[3]);
    }

    //Lower Lip
    strokeWeight(0.8);
    stroke(baseColour, 100, 5);
    line(jawX[0] + 0.5, jawY[0], jawX[1] + 0.2, jawY[1]);

    //Teeth
    for(row = teethNo; row > 0; row --) { // Place Teeth along Jaw Gap
      fill(0, 0, 100 - row * 5);
      noStroke();
      let teethRowPtX = map(row, 0, teethNo, jawX[0], jawX[1]);
      let teethRowPtY = map(row, 0, teethNo, jawY[0], jawY[1]);
      push();
        translate(teethRowPtX + 0.3, teethRowPtY);
        triangle(-0.3, 0, 0.3, 0, 0, -2.3 + (row/5));
      pop();
    }

    //Left Eye
    stroke(baseColour, 40, 60);
    strokeWeight(0.1);
    if(clOffset >= 0) { //Side Facing Eye
      //UpperEyelid
      fill(eyeColour, 100, 90);
      curve(leftEyePos - 5 + clOffset / 2 + eyeTilt * 2, YPos - 4 + eyeTilt * 2, leftEyePos - 2 + clOffset / 2, YPos + 0.5 + eyeTilt, leftEyePos - 4 + clOffset * 0.1, YPos -0.5 - eyeTilt, leftEyePos + 2 - clOffset / 4 + eyeTilt * 4, YPos - 10);
      // Iris
      fill(eyeColour + 10, 100, 100);
      noStroke(); 
      ellipse(leftEyePos - 3 + clOffset * 0.3 + cOffset / 12, YPos + 0.4 + eyeTilt / 4, 1 - eyeTilt / 3);
      // Pupil
      fill(baseColour, 100, 0);
      ellipse(leftEyePos - 3 + clOffset * 0.3 + cOffset / 10, YPos + 0.4 + eyeTilt / 4, 0.4 - eyeTilt / 5, 1);
      //LowerEyelid
      stroke(baseColour, 100, 20);
      fill(baseColour, 100, 20);
      curve(leftEyePos - 1 + clOffset / 2, YPos + 2 + yDip * 6 + eyeTilt, leftEyePos - 2 + clOffset / 2, YPos + 0.5 + eyeTilt, leftEyePos - 4 + clOffset * 0.1, YPos - 0.5 - eyeTilt, leftEyePos + 2 * clOffset / 2, YPos + 2 - eyeTilt);
    } else {
      //UpperEyelid
      fill(eyeColour, 100, 90);
      curve(leftEyePos - 5 + clOffset * 0.1 + eyeTilt * 2, YPos - 4 + eyeTilt * 2, leftEyePos - 2 + clOffset * 0.1, YPos + 0.5 + eyeTilt, leftEyePos - 4 - clOffset, YPos -0.5 - eyeTilt, leftEyePos + 2 - clOffset + eyeTilt * 4, YPos - 10);
      //Iris
      fill(eyeColour + 10, 100, 100);
      noStroke();
      ellipse(leftEyePos - 3 - clOffset * 0.3, YPos + 0.4 + eyeTilt / 4, 1 - eyeTilt / 3 + cOffset / 10, 1 - eyeTilt / 3);
      //Pupil
      fill(baseColour, 100, 5);
      ellipse(leftEyePos - 3 - clOffset * 0.3 + cOffset * 0.05, YPos + 0.4 + eyeTilt / 4, 0.4 - eyeTilt / 5, 1);
      //LowerEyelid
      stroke(baseColour, 100, 20);
      fill(baseColour, 100, 20);
      curve(leftEyePos - 1 + clOffset * 0.1, YPos + 2 + yDip * 6 + eyeTilt, leftEyePos - 2 + clOffset * 0.1, YPos + 0.5 + eyeTilt, leftEyePos - 4 - clOffset, YPos - 0.5 - eyeTilt, leftEyePos - 2 * clOffset, YPos + 2 - eyeTilt);
    }
    
    //NoseBridge
    noStroke();
    fill(baseColour, 100, 90);
    scaleBrightness = 95;
    scaleStrokeBrightness = 60;
    let noseBridgeX = [XPos + (clOffset * 0.7), XPos - 1 + (clOffset * 0.7), XPos - 2 + clOffset, XPos + cOffset];
    let noseBridgeY = [YPos - 2, YPos - 2, YPos + 4, YPos + 5 - yDip];
    quad(noseBridgeX[0], noseBridgeY[0], noseBridgeX[1], noseBridgeY[1], noseBridgeX[2], noseBridgeY[2], noseBridgeX[3], noseBridgeY[3]);
    DrawScales(true, 3 + (cOffset / 3), 10, noseBridgeX, noseBridgeY, baseColour, scaleBrightness, scaleStrokeBrightness);

    //Nose Points
    let noseX = [XPos + cOffset, XPos - 2.5 + clOffset, XPos - 3 + clOffset, XPos + cOffset];
    let noseY = [YPos + 4, YPos + 4, YPos + 6, YPos + 6];

    //FrontTeeth
    teethNo = 3;
    for(row = teethNo; row > 0; row --) {
      fill(0, 0, 100);
      noStroke();
      let teethRowPtX = map(row, 0, teethNo, noseX[3], noseX[2]);
      let teethRowPtY = map(row, 0, teethNo, noseY[3], noseY[2]);
      push();
        translate(teethRowPtX + 0.3, teethRowPtY);
        if(row == teethNo) {
          triangle(-0.3, 0, 0.3, 0, 0, 2 + (row / 5));
        } else {
          triangle(-0.3, 0, 0.3, 0, 0, 1.5);
        }
      pop();
    }

    //Front Upper Lip
    strokeWeight(0.4);
    stroke(baseColour, 100, 40);
    line(noseX[3], noseY[3] + 0.1, noseX[2] + 0.15, noseY[2] + 0.1);
    noStroke();

    //Draw Nose
    scaleBrightness = 100;
    scaleStrokeBrightness = 80;
    fill(baseColour, 100, 95);
    quad(noseX[0], noseY[0], noseX[1], noseY[1], noseX[2], noseY[2], noseX[3], noseY[3]);
    DrawScales(true, 4 + (cOffset / 2), 5, noseX, noseY, baseColour, scaleBrightness, scaleStrokeBrightness);

    //Nostrils
    fill(baseColour, 100, 30);
    quad(XPos - 0.5 + (cOffset * 0.8), YPos + 5.25, XPos - 2 + clOffset, noseFlare + 2, XPos - 2 + clOffset, noseFlare + 2.5, XPos - 0.5 + (cOffset * 0.8), YPos + 6);

    //Mouth
    fill(baseColour, 100, 85);
    scaleBrightness = 90;
    scaleStrokeBrightness = 70;
    let mouthX = [XPos + cOffset, XPos - 3 + clOffset, XPos - 1.5 + clOffset, XPos + clOffset, YPos + 8 + jawDrop];
    let mouthY = [YPos + 6 + jawDrop, YPos + 6 + jawDrop, YPos + 8 + jawDrop, YPos + 8 + jawDrop];
    quad(mouthX[0], mouthY[0], mouthX[1], mouthY[1], mouthX[2], mouthY[2], mouthX[3], mouthY[3]);
    DrawScales(true, 4 + (cOffset / 2), 4, mouthX, mouthY, baseColour, scaleBrightness, scaleStrokeBrightness);

    //Bottom Front Teeth
    teethNo = 4;
    for(row = teethNo; row > 0; row --) {
      fill(0, 0, 100);
      noStroke();
      let teethRowPtX = map(row, 0, teethNo, mouthX[0], mouthX[1]);
      let teethRowPtY = map(row, 0, teethNo, mouthY[0], mouthY[1]);
      push();
        translate(teethRowPtX + 0.3, teethRowPtY);
        triangle(-0.3, 0, 0.3, 0, 0, -1);
      pop();
    }
    
    //Front Lower Lip
    strokeWeight(0.3);
    stroke(baseColour, 100, 20);
    line(mouthX[0], mouthY[0], mouthX[1] + 0.15, mouthY[1]);
    noStroke();
    
    //Forehead
    fill(baseColour, 100, 100);
    scaleBrightness = 75;
    scaleStrokeBrightness = 65;
    let forredX = [XPos + (clOffset * 0.4), XPos - 4 + lOffset, XPos - 6 + lOffset, XPos + (cOffset * 0.8)];
    let forredY = [YPos -  5 + (yDip * 1.5), YPos - 5.5, YPos - 3, YPos - (yDip * 0.2)];
    quad(forredX[0], forredY[0], forredX[1], forredY[1], forredX[2], forredY[2], forredX[3], forredY[3]);
    DrawScales(true, 10 + cOffset, 7, forredX, forredY, baseColour, scaleBrightness, scaleStrokeBrightness);

    //Crown of Head
    noStroke();
    fill(baseColour, 100, 65);
    triangle(XPos + (clOffset * 0.4), YPos - 5 + (yDip * 1.5), XPos + lOffset - 4, YPos - 5.5, XPos + rOffset + 4, YPos - 5.5);
    
    //Horns
    if(horns >= 0.5) {
      fill(baseColour + 20, 100, 90);
      triangle(XPos - 2 - (clOffset * 0.01), YPos - 2 + (yDip * -1), XPos - 4 - (clOffset * 0.05), YPos -  3 + (yDip * -0.5), XPos - 3.5 - (clOffset * 0.4), YPos -  10 + (yDip * -1));
      fill(baseColour + 6, 100, 50);
      triangle(XPos - 2 - (clOffset * 0.01), YPos - 2 + (yDip * -1), XPos - 1.5 + (clOffset * 0.05), YPos -  2.8 + (yDip * -0.9), XPos - 3.5 - (clOffset * 0.4), YPos -  10 + (yDip * -1));
      stroke(baseColour, 100, 100);
      line(XPos - 2 - (clOffset * 0.01), YPos - 2 + (yDip * -1), XPos - 3.5 - (clOffset * 0.4), YPos -  10 + (yDip * -1));  
    }
  }

  function rightFace(XPos, YPos, rOffset, cOffset, crOffset, yDip, jawDrop, eyeColour, baseColour, eyeTilt, rightEyePos, noseFlare, smoke, horns) {
    let scaleBrightness;
    let scaleStrokeBrightness;
  
    //Throat
    fill(10, 100, 20);
    noStroke();
    if(cOffset >=0) { // To avoid jaw overlap
      beginShape();
        vertex(XPos, YPos);
        vertex(XPos + 4 + rOffset, YPos + 5);
        vertex(XPos + 3 + crOffset, YPos + 6 + jawDrop - crOffset * 0.1);
        vertex(XPos, YPos + 6 + jawDrop - crOffset * 0.1);
        vertex(XPos, YPos);
      endShape(CLOSE);
    } else {
      beginShape();
        vertex(XPos, YPos);
        vertex(XPos + 4 + rOffset, YPos + 5);
        vertex(XPos + 3 + crOffset, YPos + 6 + jawDrop + crOffset * 0.09);
        vertex(XPos, YPos + 6 + jawDrop + crOffset * 0.09);
        vertex(XPos, YPos);
      endShape(CLOSE);
    }

    //Neck
    if(cOffset <=0) {
      //Second Band
        //Bottom Quad
        fill(baseColour, 100, 10);
        scaleBrightness = 20;
        scaleStrokeBrightness = 10;
        let band2cX = [XPos + 4 - rOffset * 2, XPos + 3 - rOffset * 7.5, XPos + 3 - rOffset * 6, XPos + 3 - rOffset * 1.5];
        let band2cY = [YPos + 5, YPos + 3, YPos + 7, YPos + 8];
        quad(band2cX[0], band2cY[0], band2cX[1], band2cY[1], band2cX[2], band2cY[2], band2cX[3], band2cY[3]);
        DrawScales(false, 7 + (cOffset / -2), 5, band2cX, band2cY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Middle Quad
        scaleBrightness = 30;
        scaleStrokeBrightness = 20;
        let band2bX = [XPos + 6 - rOffset * 0.4, XPos + 4 - rOffset * 5.5, XPos + 3 - rOffset * 7.5, XPos + 4 - rOffset * 2];
        let band2bY = [YPos - 3, YPos - 2, YPos + 3, YPos + 5];
        quad(band2bX[0], band2bY[0], band2bX[1], band2bY[1], band2bX[2], band2bY[2], band2bX[3], band2bY[3]);
        DrawScales(false, 5 + (cOffset / -2), 12, band2bX, band2bY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Top Quad
        fill(baseColour, 100, 40);
        scaleBrightness = 40;
        scaleStrokeBrightness = 30;
        let band2aX = [XPos + 4 - rOffset * 3.5, XPos + 4 - rOffset * 5, XPos + 4 - rOffset * 5.5, XPos + 6 - rOffset * 0.4];
        let band2aY = [YPos - 5, YPos - 3, YPos - 2, YPos - 3];
        quad(band2aX[0], band2aY[0], band2aX[1], band2aY[1], band2aX[2], band2aY[2], band2aX[3], band2aY[3]);
        DrawScales(false, 4 + (cOffset / -2), 3, band2aX, band2aY, baseColour, scaleBrightness, scaleStrokeBrightness);
  
      //First Band
        //Bottom Quad
        scaleBrightness = 30;
        scaleStrokeBrightness = 20;
        let band1cX = [XPos + 4 + rOffset, XPos + 4 - rOffset * 2, XPos + 3 - rOffset * 1.5, XPos + 3 + rOffset];
        let band1cY = [YPos + 5, YPos + 5, YPos + 8, YPos + 7];
        quad(band1cX[0], band1cY[0], band1cX[1], band1cY[1], band1cX[2], band1cY[2], band1cX[3], band1cY[3]);
        DrawScales(false, 4 + (cOffset / -4), 5, band1cX, band1cY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Middle Quad
        scaleBrightness = 40;
        scaleStrokeBrightness = 30;
        let band1bX = [XPos + 6 + rOffset, XPos + 6 - rOffset * 0.4, XPos + 4 - rOffset * 2, XPos + 4 + rOffset];
        let band1bY = [YPos - 3, YPos - 3, YPos + 5, YPos + 5];
        quad(band1bX[0], band1bY[0], band1bX[1], band1bY[1], band1bX[2], band1bY[2], band1bX[3], band1bY[3]);
        DrawScales(false, 4 + (cOffset / -6), 14, band1bX, band1bY, baseColour, scaleBrightness, scaleStrokeBrightness);
        //Top Quad
        scaleBrightness = 50;
        scaleStrokeBrightness = 40;
        let band1aX = [XPos + 4 + rOffset, XPos + 4 - rOffset * 3.5, XPos + 6 - rOffset * 0.4, XPos + 6 + rOffset];
        let band1aY = [YPos - 5.5, YPos - 5, YPos - 3, YPos - 3];
        quad(band1aX[0], band1aY[0], band1aX[1], band1aY[1], band1aX[2], band1aY[2], band1aX[3], band1aY[3]);
        DrawScales(false, 5 + (cOffset / -4), 4, band1aX, band1aY, baseColour, scaleBrightness, scaleStrokeBrightness);
    }
  
    //Face Points
    let faceX = [XPos + (crOffset * 1.05), XPos + 6 + rOffset, XPos + 4 + rOffset, XPos + 3 + crOffset];
    let faceY = [YPos - (yDip * 0.4), YPos - 3, YPos + 5, YPos + 6];
  
    //Upper Lip
    strokeWeight(1);
    stroke(baseColour, 100, 10);
    line(faceX[3], faceY[3], faceX[2], faceY[2]);
    noStroke();
  
    //Draw Face
    fill(baseColour, 100, 70);
    quad(faceX[0], faceY[0], faceX[1], faceY[1], faceX[2], faceY[2], faceX[3], faceY[3]);
  
    //Face Scales
    scaleBrightness = 60;
    scaleStrokeBrightness = 30;
    DrawScales(false, 15 - cOffset, 15, faceX, faceY, baseColour, scaleBrightness, scaleStrokeBrightness);
  
    //Jaw Points
    let jawX = [XPos + 3 + crOffset, XPos + 4 + rOffset, XPos + 3 + rOffset, XPos + 1.5 + crOffset];
    let jawY = [YPos + 6 + jawDrop, YPos + 5, YPos + 7.5, YPos + 8 + jawDrop];
    
    //Draw Jaw & Scales
    let teethNo; // Set Up Teeth Variables
    noStroke();
    if(cOffset <= 0) { //Outer Jaw
      teethNo = 2 - cOffset;
      fill(baseColour, 100, 40);
      scaleBrightness = 35;
      scaleStrokeBrightness = 20;
      quad(jawX[0], jawY[0], jawX[1], jawY[1], jawX[2], jawY[2], jawX[3], jawY[3]);
      DrawScales(false, 10 - cOffset, 5, jawX, jawY, baseColour, scaleBrightness, scaleStrokeBrightness);
    } else { // Inner Jaw
      teethNo = 4 + cOffset;
      fill(10, 100, 20);
      quad(jawX[0], jawY[0], jawX[1], jawY[1], jawX[2], jawY[2] - 0.6, jawX[3], jawY[3]);
    }
  
    //Lower Lip
    strokeWeight(0.8);
    stroke(baseColour, 100, 5);
    line(jawX[0] - 0.5, jawY[0], jawX[1] - 0.2, jawY[1]);
  
    //Teeth
    for(row = teethNo; row > 0; row --) { // Space teeth along jaw
      fill(0, 0, 100 - row * 5);
      noStroke();
      let teethRowPtX = map(row, 0, teethNo, jawX[0], jawX[1]);
      let teethRowPtY = map(row, 0, teethNo, jawY[0], jawY[1]);
      push();
        translate(teethRowPtX - 0.3, teethRowPtY);
        triangle(-0.3, 0, 0.3, 0, 0, -2.3 + (row/5));
      pop();
    }
  
    //Right Eye
    stroke(baseColour, 60, 40);
    strokeWeight(0.1);
    if(crOffset <= 0) { // SideFace (Long Eye)
      //Upper Eyelid
      fill(eyeColour, 100, 90);
      curve(rightEyePos + 5 + crOffset / 2 + eyeTilt * 2, YPos - 4 + eyeTilt * 2, rightEyePos + 2 + crOffset / 2, YPos + 0.5 + eyeTilt, rightEyePos + 4 + crOffset * 0.1, YPos -0.5 - eyeTilt, rightEyePos - 2 - crOffset / 4 + eyeTilt * 4, YPos - 10);
      //Iris
      fill(eyeColour + 10, 100, 100);
      noStroke();
      ellipse(rightEyePos + 3 + crOffset * 0.3 + cOffset / 12, YPos + 0.4 + eyeTilt / 4, 1 - eyeTilt / 3);
      //Pupil
      fill(baseColour, 100, 0);
      ellipse(rightEyePos + 3 + crOffset * 0.3 + cOffset / 10, YPos + 0.4 + eyeTilt / 4, 0.4 - eyeTilt / 5, 1);
      //Lower Eyelid
      stroke(baseColour, 100, 20);
      fill(baseColour, 100, 20);
      curve(rightEyePos + 1 + crOffset / 2, YPos + 2 + yDip * 6 + eyeTilt, rightEyePos + 2 + crOffset / 2, YPos + 0.5 + eyeTilt, rightEyePos + 4 + crOffset * 0.1, YPos - 0.5 - eyeTilt, rightEyePos - 2 * crOffset / 2, YPos + 2 - eyeTilt);
    } else { // Hidden Eye (Short Side)
      //Upper Eyelid
      fill(eyeColour, 100, 90);
      curve(rightEyePos + 5 + crOffset * 0.1 + eyeTilt * 2, YPos - 4 + eyeTilt * 2, rightEyePos + 2 + crOffset * 0.1, YPos + 0.5 + eyeTilt, rightEyePos + 4 - crOffset, YPos -0.5 - eyeTilt, rightEyePos - 2 - crOffset + eyeTilt * 4, YPos - 10);
      //Iris
      fill(eyeColour + 10, 100, 100);
      noStroke();
      ellipse(rightEyePos + 3 - crOffset * 0.3, YPos + 0.4 + eyeTilt / 4, 1 - eyeTilt / 3 - cOffset / 10, 1 - eyeTilt / 3);
      //Pupil
      fill(baseColour, 100, 5);
      ellipse(rightEyePos + 3 - crOffset * 0.3 + cOffset * 0.05, YPos + 0.4 + eyeTilt / 4, 0.4 - eyeTilt / 5, 1);
      //Lower Eyelid
      stroke(baseColour, 100, 20);
      fill(baseColour, 100, 20);
      curve(rightEyePos + 1 + crOffset * 0.1, YPos + 2 + yDip * 6 + eyeTilt, rightEyePos + 2 + crOffset * 0.1, YPos + 0.5 + eyeTilt, rightEyePos + 4 - crOffset, YPos - 0.5 - eyeTilt, rightEyePos - 2 * crOffset, YPos + 2 - eyeTilt);
    }
  
    //NoseBridge
    noStroke();
    fill(baseColour, 100, 90);
    scaleBrightness = 90;
    scaleStrokeBrightness = 60;
    let noseBridgeX = [XPos + (crOffset * 0.7), XPos + 1 + (crOffset * 0.7), XPos + 2 + crOffset, XPos + cOffset];
    let noseBridgeY = [YPos - 2, YPos - 2, YPos + 4, YPos + 5 - yDip];
    quad(noseBridgeX[0], noseBridgeY[0], noseBridgeX[1], noseBridgeY[1], noseBridgeX[2], noseBridgeY[2], noseBridgeX[3], noseBridgeY[3]);
    DrawScales(false, 3 + (cOffset / -3), 10, noseBridgeX, noseBridgeY, baseColour, scaleBrightness, scaleStrokeBrightness);
  
    //Nose Points
    let noseX = [XPos + cOffset, XPos + 2.5 + crOffset, XPos + 3 + crOffset, XPos + cOffset];
    let noseY = [YPos + 4, YPos + 4, YPos + 6, YPos + 6];
    
    //FrontTeeth
    teethNo = 3;
    for(row = teethNo; row > 0; row --) { 
      fill(0, 0, 100);
      noStroke();
      let teethRowPtX = map(row, 0, teethNo, noseX[3], noseX[2]);
      let teethRowPtY = map(row, 0, teethNo, noseY[3], noseY[2]);
      push();
        translate(teethRowPtX - 0.3, teethRowPtY);
        if(row == teethNo) {
          triangle(-0.3, 0, 0.3, 0, 0, 2 + (row/5));
        } else {
          triangle(-0.3, 0, 0.3, 0, 0, 1.5);
        }
      pop();
    }
      
    //Front Upper Lip
    strokeWeight(0.4);
    stroke(baseColour, 100, 40);
    line(noseX[3], noseY[3] + 0.1, noseX[2] + 0.15, noseY[2] + 0.1);
    noStroke();
  
    //Nose
    scaleBrightness = 95;
    scaleStrokeBrightness = 80;
    fill(baseColour, 100, 95);
    quad(noseX[0], noseY[0], noseX[1], noseY[1], noseX[2], noseY[2], noseX[3], noseY[3]);
    DrawScales(false, 4 + (cOffset / -2), 5, noseX, noseY, baseColour, scaleBrightness, scaleStrokeBrightness);
    
    //Nostrils
    fill(baseColour, 100, 30);
    quad(XPos + 0.5 + (cOffset * 0.8), YPos + 5.25, XPos + 2 + crOffset, noseFlare + 2, XPos + 2 + crOffset, noseFlare + 2.5, XPos + 0.5 + (cOffset * 0.8), YPos + 6);
  
    //Mouth
    fill(baseColour, 100, 85);
    scaleBrightness = 85;
    scaleStrokeBrightness = 70;
    let mouthX = [XPos + cOffset, XPos + 3 + crOffset, XPos + 1.5 + crOffset, XPos + crOffset];
    let mouthY = [YPos + 6 + jawDrop, YPos + 6 + jawDrop, YPos + 8 + jawDrop, YPos + 8 + jawDrop];
    quad(mouthX[0], mouthY[0], mouthX[1], mouthY[1], mouthX[2], mouthY[2], mouthX[3], mouthY[3]);
    DrawScales(false, 4 + (cOffset / -2), 4, mouthX, mouthY, baseColour, scaleBrightness, scaleStrokeBrightness);
  
    //Bottom Front Teeth
    teethNo = 4;
    for(row = teethNo; row > 0; row --) {
      fill(0, 0, 100);
      noStroke();
      let teethRowPtX = map(row, 0, teethNo, mouthX[0], mouthX[1]);
      let teethRowPtY = map(row, 0, teethNo, mouthY[0], mouthY[1]);
      push();
        translate(teethRowPtX - 0.3, teethRowPtY);
        triangle(-0.3, 0, 0.3, 0, 0, -1);
      pop();
    }
  
    //Front Lower Lip
    strokeWeight(0.3);
    stroke(baseColour, 100, 20);
    line(mouthX[0], mouthY[0], mouthX[1] - 0.15, mouthY[1]);
    noStroke();
  
    //Forehead
    fill(baseColour, 100, 100);
    scaleBrightness = 70;
    scaleStrokeBrightness = 65;
    let forredX = [XPos + (crOffset * 0.4), XPos + 4 + rOffset, XPos + 6 + rOffset, XPos + (cOffset * 0.8)];
    let forredY = [YPos -  5 + (yDip * 1.5), YPos - 5.5, YPos - 3, YPos - (yDip * 0.2)];
    quad(forredX[0], forredY[0], forredX[1], forredY[1], forredX[2], forredY[2], forredX[3], forredY[3]);
    DrawScales(false, 10 - cOffset, 7, forredX, forredY, baseColour, scaleBrightness, scaleStrokeBrightness);
  
    //Crown
    // fill(baseColour, 100, 90);
    // triangle(XPos + (crOffset * 0.4), YPos - 5 + (yDip * 1.5), lOffset - 4, YPos - 5.5, rOffset + 4, YPos - 5.5);
    
    //Horns
    if(horns >= 0.5) {
      fill(baseColour + 20, 100, 90);
      triangle(XPos + 2 - (crOffset * 0.01), YPos - 2 + (yDip * -1), XPos + 4 - (crOffset * 0.05), YPos - 3 + (yDip * -0.5), XPos + 3.5 - (crOffset * 0.4), YPos - 10 + (yDip * -1));
      fill(baseColour + 6, 100, 50);
      triangle(XPos + 2 - (crOffset * 0.01), YPos - 2 + (yDip * -1), XPos + 1.5 + (crOffset * 0.05), YPos - 2.8 + (yDip * -0.9), XPos + 3.5 - (crOffset * 0.4), YPos - 10 + (yDip * -1));
      stroke(baseColour, 100, 100);
      line(XPos + 2 - (crOffset * 0.01), YPos - 2 + (yDip * -1), XPos + 3.5 - (crOffset * 0.4), YPos - 10 + (yDip * -1));
    }
  }
}

function DrawScales(orientation, xScalesNo, yScalesNo, xPoints, yPoints, baseColour, fillBright, strokeBright) {
  // strokeWeight(0.1);
  // for(col = yScalesNo; col > 0; col --) { // Column
  //   for(row = xScalesNo; row > 0; row --) { // Row
  //     fill(baseColour + col, 100, fillBright - col * 4);
  //     stroke(baseColour + row * 1.2, 100, strokeBright);
  //     //Calculate scale positions within given quad space
  //     let scaleRowPtX = map(row, 0, xScalesNo, map(col, 0, yScalesNo, xPoints[0], xPoints[3]), map(col, 0, yScalesNo, xPoints[1], xPoints[2]));
  //     let scaleRowPtY = map(row, 0, xScalesNo, map(col, 0, yScalesNo, yPoints[0], yPoints[3]), map(col, 0, yScalesNo, yPoints[1], yPoints[2]));
  //     push();
  //       if(orientation) { // Face Direction
  //         translate(scaleRowPtX + 0.3, scaleRowPtY - 0.5);
  //         rotate(xScalesNo * 2);
  //       } else {
  //         translate(scaleRowPtX - 0.3, scaleRowPtY - 0.5);
  //         rotate(-xScalesNo * 2);
  //       }
  //       //Draw Scale
  //       arc(0, 0, 0.7, 1.5, 0, 180, CHORD);
  //     pop();
  //   }
  // }
}