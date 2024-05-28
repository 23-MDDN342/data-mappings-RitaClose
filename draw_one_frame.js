const ease = new p5.Ease();
//Bee Variables
let bees = true;
let beeSineWidth = 50;

//Toggle Pots
let pots = false;

//Flower Types
let flowerType = 'Lotus'; // MorningGlory, Lotus, Pinwheel, None
let flowerX = -5; //Offset X and Y from Vines
let flowerY = 5;
let baseFlowerColour = 300; // Pink

//Spinning Flower Options
let flowerSplay = 'Random'; // 'Random', 'All', 'Alternate' 'None'
let ranC = 1; // Random Column Picker

let canvasMultiplier; // To scale sine waves to Canvas size

function draw_one_frame(cur_frac) {

	// note: you can draw optional things depending on "debugView"
	if (debugView) {
	// we'll draw our "keyframes"
	noFill();
	stroke(255, 0, 0);
	strokeWeight(height/100);
	// here we "plug in" the values when cur_frac is 0
	rect(-half_width, 0, rect_width, height);
	rect( width - half_width, 0, rect_width, height);
	rect(-width - half_width, 0, rect_width, height);
	}

	//Canvas Scale Setup
	let vineCount = 5; // Number of vines
	if (width < 1000) {
		canvasMultiplier = 1;
	} else if (width < 2000) {
		canvasMultiplier = 2;
	} else {
		canvasMultiplier = 2.34;
	}
	noStroke();
	fill(0);
	rect(0, 0, width, height);

	//Canvas Width Variables
	let widthSpac = (width / vineCount);
	let widthSpacCenter = widthSpac / 4; // Edge Spacing not yet fixed.
	let spacing;
	
	//Spinning Flower Setup
	let clockWise = true;
	let curFracAmount = 0;
	if (cur_frac < 0.5) { // First half of cur_frac
		clockWise = true;
		curFracAmount = cur_frac * 2;
	} else { // Second half of cur_frac
		clockWise = false;
		curFracAmount = (cur_frac - 0.5) * 2;
	}
	
	if(cur_frac == 0) { // Random Vine Picker
		ranC = floor(random(1, vineCount));
	}
	
	//Flower Blooming Ease
	const ease_amount_across = ease.circularInOut(curFracAmount); // bounceOut(curFracAmount, 2) // doubleCircularOgee(curFracAmount, 1)
	
	//TRELLIS BACKGROUND
	angleMode(DEGREES);
	push();
		scale(canvasMultiplier);
		fill(20);
		translate(500, height * (2 / canvasMultiplier));
		rotate(45);
		for(i = 0; i < 23; i ++) { // Lattice Background
			rotate(-90);
			fill(20);
			rect(0, i * -50, width * 2, 15);
			fill(10);
			rect(0, i * -50 - 5, width * 2, 15);
			rotate(90)
			push();
				translate(-1500, 0);
				fill(25);
				rect(0, i * -50, width * 2, 15);
				fill(15);
				rect(0, i * -50 - 5, width * 2, 15);
			pop();
		}
	pop();

	// Colour Setup
	colorMode(HSB);
	let darkGreen = color(140, 100, 30); // Leaf Colours
	let lightGreen = color(120, 100, 85);
	let vineYellow = color(40, 100, 100);

	//VINES

	// Vine Variables
	let vineSeparation = 124; // Vertical Arc Gap
	let vineWidth = map(cur_frac, 0, 1, 0, 95);

	//Main Vine Arcs (Green)
	push();
		if(canvasMultiplier != 2) {
			translate(0, -10); // Realignment
		} else {
			translate(0, -50);
		}
		scale(canvasMultiplier);
		noFill();
		stroke(darkGreen);
		strokeWeight((random(0.25, 3)) / canvasMultiplier);
		for (vc = 0; vc < vineCount; vc ++) { // Vine Columns
			spacing = widthSpacing(widthSpac, widthSpacCenter, vc, canvasMultiplier); // Calculates Space between vines
			for (vr = 0; vr < 6; vr ++) { // Vine Rows
				arc(spacing, (height / canvasMultiplier) - (vr * vineSeparation), 80, 100, 310, 45, OPEN);
				arc(spacing + 63, (height / canvasMultiplier) + 63 - (vr * vineSeparation), 80, 100, 130, 225, OPEN);
			}
		}
		// Vine Tracking Marks (Yellow)
		stroke(vineYellow);
		for (tc = 0; tc < vineCount; tc ++) {//Tracker Columns
			spacing = widthSpacing(widthSpac, widthSpacCenter, tc, canvasMultiplier);
			for (tr = 0; tr < 6; tr ++) { // Tracker Rows
				arc(spacing, (height / canvasMultiplier) - (tr * vineSeparation), 80, 100, 45 - vineWidth, 45 - vineWidth + 1 + (vineWidth / 7), OPEN); //310
				arc(spacing + 63, (height / canvasMultiplier) + 63 - (tr * vineSeparation), 80, 100, 130 + vineWidth, 145 + vineWidth - (vineWidth / 7), OPEN); //225
			}
		}
	pop();

	// BEES, LEAVES, & FLOWERS
	
	// let noiseNumber;
	let pointTrack = map(cur_frac, 0, 1, 0, height / (16 * canvasMultiplier)); // 33.75
  	for (c = 0; c < vineCount; c ++) { // Columns
		push();
			scale(canvasMultiplier);
			spacing = widthSpacing(widthSpac, widthSpacCenter, c, canvasMultiplier);

			for (pr = 0; pr < 18; pr ++) { // Particle Rows
				let pointY = 0;
				let pointX = 0;

				//BEE Sine Waves
				for (pt = 0; pt < 6; pt ++) {
					pointY = (height / (16 * canvasMultiplier) * pr) - pointTrack - 20; // 16
					pointX = beeSineWidth * sin(pointY * 5 + pt) + 30 + spacing;
					noStroke();
					if(pt %2 == 1 && bees) {
						fill(60, 100, 100);
						circle(pointX, pointY + cos(pointY * 5 + (pt * 10)), (pr / 4) - pt / 10);
					} else if (bees) {
						fill(10);
						circle(pointX, pointY + cos(pointY * 5 + (pt * 10)), (pr / 4) - pt / 10);
					}
				}
				//Bee Wings
				if (bees) {
					noFill();
					stroke(255);
					strokeWeight(0.25);
					ellipse(beeSineWidth * sin(pointY * 5) + 30 + spacing, pointY -1, 3, random(0, 5));
					ellipse(beeSineWidth * sin(pointY * 5) + 31 + spacing, pointY - 2, 3, random(-1, 4));
				}

				//LEAVES
				let leafRot = 270 + 50 * sin(pointY * 3); // Sine Wave Leaf Rotation
				push();
					translate(0, -5 * canvasMultiplier); // Realignment
					leafPointX = 10 * sin(pointY * 3) + 30 + spacing;
					// noiseNumber = getNoiseValue(leafPointX + 2, pointY + (26 * canvasMultiplier), cur_frac, "LeafNoise", -0.2, 0.8, 100);
					translate(leafPointX + 2, pointY + (canvasMultiplier));
					rotate(leafRot);
					noStroke();

					let leafLerp = map(leafRot, 220, 320, 0, 1); // Colour Lerp for 2 sides of Leaf
					let leafLerp1 = map(leafRot, 220, 320, 1, 0);

					let scaleMap = map(pr, 5, 18, 1.1, 0.45); // Leaves & Flowers get larger as they ascend
					
					// Leaf Shape
					scale(scaleMap);
					fill(lerpColor(darkGreen, lightGreen, leafLerp)); // Dark Leaf
					arc(18, 7, 40, 30, 200, 340, CHORD);
					fill(lerpColor(darkGreen, lightGreen, leafLerp1)); // Light Leaf
					arc(18, -7, 40, 30, 20, 160, CHORD);
					// Leaf Detailing
					push();
						rotate(180);
						translate(-35, 0);
						for (i = 0; i < 5; i ++) {
							noFill();
							strokeWeight(0.5);
							scale(1 - (i / 5));
							stroke(darkGreen);
							arc(18, 7, 40, 30, 200, 340, CHORD);
							arc(18, -7, 40, 30, 20, 160, CHORD);
						}
					pop();

					//FLOWERS
					let splayAmount;
					let runFullFlower = false;

					// Run Flower Spin Column
					if ((flowerSplay == 'Random' && c == ranC) || (flowerSplay == 'Alternate' && c % 2 != 1) || flowerSplay == 'All') {
						runFullFlower = true;
					}

					// Calculate Flower Spin & Splay
					if(runFullFlower && flowerType == 'Lotus') {
						if (clockWise) {
							circleRotation = map(ease_amount_across, 0, 1, 0, 180);
							splayAmount = map(ease_amount_across, 0, 1, 0, 55);
						} else {
							circleRotation = map(ease_amount_across, 0, 1, 180, 360);
							splayAmount = map(ease_amount_across, 0, 1, 55, 0);
						}
					} else {
						if (clockWise) {
							circleRotation = map(ease_amount_across, 0, 1, 0, 20);
							splayAmount = map(ease_amount_across, 0, 1, 0, 15);
						} else {
							circleRotation = map(ease_amount_across, 0, 1, 20, 0);
							splayAmount = map(ease_amount_across, 0, 1, 15, 0);
						}
					}
					rotate(circleRotation);
					
					// Alternate Spin Directions per Column
					if (c %2 == 1) {
						circleRotation = circleRotation * -1;
					}

					// Draw Flowers
					draw_Flowers(flowerType, flowerX, flowerY, baseFlowerColour, cur_frac, 0, splayAmount);
					if (flowerType == 'MorningGlory') { // Duel Row
						draw_Flowers("MorningGlory", 0, -5, baseFlowerColour, cur_frac, 230);
					}

				pop();
			}
		pop();
		// Terracota Pots
		push();
		scale(canvasMultiplier);
		translate(spacing - 2, height / canvasMultiplier);
		if (pots) {
			fill(20, 80, 40);
			noStroke();
			quad(11, 0, 59, 0, 69, - 50, 1, - 50);
			fill(360, 50, 20);
			rect(1, - 35, 68, 2, 2);
			fill(360, 40, 60);
			rect(1, - 50, 68, 15, 1);
			fill(360, 40, 80);
			rect(1, - 50, 68, 2, 2);
			fill(255);
		}
		pop();
	}
}

// Calculate Spacing between Vines and from Edge
function widthSpacing(widthSpac, widthSpacCenter, loopVar, canvasSize) {
	return widthSpac * (loopVar / canvasSize) + widthSpacCenter / canvasSize;
}

// Draw Flowers Function
function draw_Flowers(flowerType, X, Y, flowerColour, cur_frac, extraRotation, splay) {	
	let stemColour = color(100, 100, 60);

	if (flowerType == 'MorningGlory') { // Default Parameters: "MorningGlory", 340, -5, 5, 1
		push();
			translate(X, Y);
			rotate(340 + extraRotation);
			push(); // Stigma
				translate(0, 5);
				fill(240);
				noStroke();
				ellipse(0, 0, 2, 20 - pr);
			pop();
			strokeWeight(2);
			stroke(stemColour);
			line(0, 0, X, Y); // Stem
			for(ii = 18; ii > pr; ii --) { // Petals
				if (ii < 6) {
					translate(0, -1);
				} else {
					translate(0, 1);
				}
				noFill();
				stroke(flowerColour + 50 - ii * 5, 100, 80 - ii * 4);
				strokeWeight(1);
				ellipse(0, 0, 20 - ii, 5);
			}
			fill(255);
			noStroke();
			circle(0, 4, 2); // Pollen
			circle(4, 2, 1);
			circle(2, 6, 1.5);
		pop();
	}	else if (flowerType == 'Lotus') {// Default Parameters: Lotus, 180, 0, -5, 0.4, lightPink, darkPink
		push();
			translate(0, -3); // Alternate Direction: 0, 5
			rotate(180); // 40
			scale(0.4);
			strokeWeight(2);
			stroke(stemColour); // Green Stalk
			line(0, 0, 0, -5);
			for(i = 0; i < 6; i ++) { // Back Petals
				if (flowerColour - pr * 2 + (splay * 5) > 360) { // Carry over from hue 360 back to 0
					fill(0 - pr * 2 + (splay * 5 - 360), 100, 60 - pr * 6 + (splay / 5));
				} else {
					fill(flowerColour - pr * 2 + splay, 100, 60 - pr * 6 + (splay / 5));
				}
				stroke(flowerColour - pr * 2  + splay, 100, 70 - pr);
				strokeWeight(1);
				rotate(5 + splay);

				arc(18, 7, 40, 30, 200, 340, CHORD); // Back Petal Shape
				arc(18, -7, 40, 30, 20, 160, CHORD);
				
				fill(255); // Petal Details
				noStroke();
				circle(30, 0, 3);
				fill(flowerColour - splay, 100, 30 + splay);
				circle(40 + splay / 10, 0, 2);
			}
			rotate(20);
			scale(0.8);
			for(i = 0; i < 6; i ++) { // Front Petals
				if (10 + flowerColour - pr * 2 + (splay) > 360) {
					fill(splay - 360, 100, 100 - pr)
					stroke(10 + flowerColour - pr * 2 + splay, 100, 60 - pr * 6);
				} else {
					fill(10 + flowerColour - pr * 2 + splay, 100, 100 - pr);
					stroke(10 + flowerColour - pr * 2 + splay, 100, 60 - pr * 6);
				}
				rotate(-5 - splay);
				arc(18, 7, 40, 30, 200, 340, CHORD); // Front Petal Shape
				arc(18, -7, 40, 30, 20, 160, CHORD);
			}
			rotate(-20);
			for(i = 0; i < 6; i ++) { // Stigma in Center
				rotate(splay + 5);
				stroke(255);
				fill(255);
				line(0, 0, splay * 0.4, 0);
				circle(splay * 0.7, 0, 2);
			}
			fill(255);
		pop();
	} else if (flowerType == 'Pinwheel') { // Default Parameters: 'Pinwheel', 120, 0, -15, 0.3, lightPink, darkPink, cur_frac
		translate(0, -15);
		rotate(cur_frac * 120);
		push();
		scale(0.3);
		strokeWeight(2);
		for(i = 0; i < 6; i ++) { // Petals
			stroke(340, 100, 30);
			rotate(60);
			fill(flowerColour, 100, 100);
			arc(18, 7, 40, 30, 200, 340, CHORD);
			fill(flowerColour, 100, 70);
			arc(18, -7, 40, 30, 20, 160, CHORD);
			circle(10, 0, 10);
		}
		fill(255);
		circle(0, 0, 8); // Center
		pop();
	} else {
		fill(255, 0, 100);
		circle(2, 5, 3);
		circle(5, 5, 2);
		circle(5, 8, 2);
	}
	
}