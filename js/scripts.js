var unveiled = false;

var panRad = (view.size.height /2) -10;
// The pan is a circle
var pan = new Path.Circle({
	center: view.center,
	radius: (view.size.height /2)-10,
	strokeColor: '#5481A0',
	fillColor: '#5F5E5D',
	strokeWidth: 20
});

var count = 0;
var position = view.center;
var spiral = new Path({
	fillColor: '#666'
});

while (position.y < (view.size.height)-25) {
	count++;
	var vector = new Point({
		angle: count * 4,
		length: count / 100
	});
	var rot = vector.rotate(90);
	// var color = raster.getAverageColor(position + vector / 2);
	// var value = color ? (1 - color.gray) * 3.7 : 0;
	// console.error(value);
	rot.length = 1
	spiral.add(position + vector - rot);
	spiral.insert(0, position + vector + rot);
	position += vector;
}

/////////////////////////////////////////////////////////////////////////////////////////////
// Adapted from Flocking Processing example by Daniel Schiffman:
// http://processing.org/learning/topics/flocking.html

var Boid = Base.extend({
	initialize: function(position, maxSpeed, maxForce) {
		var strength = Math.random() * 0.5;
		this.acceleration = new Point();
		this.vector = Point.random() * 2 - 1;
		this.position = position.clone();
		this.radius = 30;
		this.maxSpeed = maxSpeed + strength;
		this.maxForce = maxForce + strength;
		this.points = [];
		for (var i = 0, l = strength * 10 + 10; i < l; i++) {
			this.points.push(new Point());
		}
		this.count = 0;
		this.lastAngle = 0;
		this.distances = [];
		this.createItems();
	},

	run: function(boids) {
		this.lastLoc = this.position.clone();
		if (!groupTogether) {
			this.flock(boids);
		} else {
			this.align(boids);
		}
		this.borders();
		this.update();
		this.calculateTail();
		this.updateItems();
	},

	calculateTail: function() {
		var points = this.points;
		var speed = this.vector.length;
		var pieceLength = 5 + speed * 0.3;
		var point = points[0] = this.position.clone();
		var lastVector = this.vector.clone();
		for (var i = 1, l = points.length; i < l; i++) {
			this.count += speed * 15;
			var vector = point - points[i];
			var rotated = lastVector.rotate(90);
			rotated.length = Math.sin((this.count + i * 3) * 0.003);
			lastVector.length = -pieceLength;
			point += lastVector;
			points[i] = point + rotated;
			lastVector = vector;
		}
	},

	removeBoid: function() {
		console.log('here');
		this.head.remove();
		this.path.remove();
		this.shortPath.remove();
	},

	createItems: function() {
		this.head = new Path.Ellipse({
			from: [0,0],
			to: [13, 8],
			fillColor: 'white'
		});
		// this.head = (project.symbols[0]
		// 	? project.symbols[0]
		// 	: new Symbol(new Path.Ellipse({
		// 		from: [0, 0],
		// 		to: [13, 8],
		// 		fillColor: 'white'
		// 	}))).place();
		this.path = new Path({
			strokeColor: 'white',
			strokeWidth: 2,
			strokeCap: 'round'
		});
		this.shortPath = new Path({
			strokeColor: 'white',
			strokeWidth: 4,
			strokeCap: 'round'
		});
	},
    
	updateItems: function() {
		this.path.segments = this.points;
		this.shortPath.segments = this.points.slice(0, 3);

		this.head.position = this.position;
		var angle = this.vector.angle;
		this.head.rotate(angle - this.lastAngle);
		this.lastAngle = angle;
	},

	// We accumulate a new acceleration each time based on three rules
	flock: function(boids) {
		this.calculateDistances(boids);
		var separation = this.separate(boids) * 2;
		var alignment = this.align(boids);	
		var cohesion = this.cohesion(boids);
		this.acceleration += cohesion + separation + alignment; //+ alignment + separation
	},

	calculateDistances: function(boids) {
		for (var i = 0, l = boids.length; i < l; i++) {
			var other = boids[i];
			this.distances[i] = other.position.getDistance(this.position, true);
		}
	},

	update: function() {
		// Update velocity
		this.vector += this.acceleration;
		// Limit speed (vector#limit?)
		this.vector.length = Math.min(this.maxSpeed, this.vector.length);
		this.position += this.vector;
		// Reset acceleration to 0 each cycle
		this.acceleration = new Point();
		var diff = this.position.getDistance(view.center);
		// console.error(view.center.x);
		// console.error(this.position.x);

		// if (diff < 30 && diff < 30) {
		// 	boids[12].head.fillColor = 'red';
		// 	boids[12].path.strokeColor = 'red';
		// 	boids[12].shortPath.strokeColor = 'red';

			// var i = boids.indexOf(this);
			// var tmp = boids[i];
			// this.head.remove();
			// this.path.remove();
			// this.shortPath.remove();
			// boids = boids.slice(i, i+1);
			// console.log("new length: " + boids.length);
		// }
	},

	seek: function(target) {
		this.acceleration += this.steer(target, true);
	},

	arrive: function(target) {
		this.acceleration += this.steer(target, false);

	},

	borders: function() {
		var vector = new Point();
		var position = this.position;
		var radius = this.radius;
		var size = view.size;
		if (position.x < -radius) vector.x = size.width + radius;
		if (position.y < -radius) vector.y = size.height + radius;
		if (position.x > size.width + radius) vector.x = -size.width -radius;
		if (position.y > size.height + radius) vector.y = -size.height -radius;
		if (!vector.isZero()) {
			this.position += vector;
			var points = this.points;
			for (var i = 0, l = points.length; i < l; i++) {
				points[i] += vector;
			}
		}
	},

	// A method that calculates a steering vector towards a target
	// Takes a second argument, if true, it slows down as it approaches
	// the target
	steer: function(target, slowdown) {
		// slowdown = true;	
		var steer,
			desired = view.center - this.position;
		var distance = desired.length;
		// Two options for desired vector magnitude
		// (1 -- based on distance, 2 -- maxSpeed)
		if (slowdown && distance < 100) {
			// This damping is somewhat arbitrary:
			desired.length = this.maxSpeed * (distance * 0.01);
		} else {
			desired.length = this.maxSpeed;
		}
		steer = desired - this.vector;
		steer.length = Math.min(this.maxForce, steer.length);
		return steer;
	},

	separate: function(boids) {
		var desiredSeperation = 3600;
		var steer = new Point();
		var count = 0;
		// For every boid in the system, check if it's too close
		for (var i = 0, l = boids.length; i < l; i++) {
			var distance = this.distances[i];
			if (distance > 0 && distance < desiredSeperation) {
				// Calculate vector pointing away from neighbor
				var delta = this.position - boids[i].position;
				delta.length = 1 / distance;
				steer += delta;
				count++;
			}
		}
		// Average -- divide by how many
		if (count > 0)
			steer /= count;
		if (!steer.isZero()) {
			// Implement Reynolds: Steering = Desired - Velocity
			steer.length = this.maxSpeed;
			steer -= this.vector;
			steer.length = Math.min(steer.length, this.maxForce);
		}
		return steer;
	},

	// Alignment
	// For every nearby boid in the system, calculate the average velocity
	align: function(boids) {
		var neighborDist = 25;
		var steer = new Point();
		var count = 0;
		for (var i = 0, l = boids.length; i < l; i++) {
			var distance = this.distances[i];
			if (distance > 0 && distance < neighborDist) {
				steer += boids[i].vector;
				count++;
			}
		}

		if (count > 0)
			steer /= count;
		if (!steer.isZero()) {
			// Implement Reynolds: Steering = Desired - Velocity
			steer.length = this.maxSpeed;
			steer -= this.vector;
			steer.length = Math.min(steer.length, this.maxForce);
		}
		return steer;
	},

	// Cohesion
	// For the average location (i.e. center) of all nearby boids,
	// calculate steering vector towards that location
	cohesion: function(boids) {
		var neighborDist = 10000;
		var sum = new Point(0, 0);
		var count = 0;
		for (var i = 0, l = boids.length; i < l; i++) {
			var distance = this.distances[i];
			if (distance >= 0 && distance < neighborDist) {
				sum += boids[i].position; // Add location
				count++;
			}
		}
		if (count > 0) {
			sum /= count;
			// Steer towards the location
			return this.steer(sum, false);
		}
		return sum;
	}
});

var handle = Project.importJSON('["Path",{"pathData":"M154.281,557.935c-4.539,4.829-12.133,5.064-16.962,0.525l-52.501-49.348c-4.829-4.539-5.064-12.133-0.525-16.962l266.531-283.558c4.539-4.829,12.133-5.064,16.962-0.525l52.501,49.348c4.829,4.539,5.064,12.133,0.525,16.962L154.281,557.935z","fillColor":"#888"}]');

handle.position += new Point(40,160);
handle.rotate(25);
handle.scale(0.75);
var leg = Project.importJSON('["Path",{"pathData":"M154.281,557.935c-4.539,4.829-12.133,5.064-16.962,0.525l-52.501-49.348c-4.829-4.539-5.064-12.133-0.525-16.962l266.531-283.558c4.539-4.829,12.133-5.064,16.962-0.525l52.501,49.348c4.829,4.539,5.064,12.133,0.525,16.962L154.281,557.935z","fillColor":"#FECD64"}]');
leg.position += new Point(-60,200);
leg.rotate(25);

var heartPath = Project.importJSON('["Path",{"pathData":"M514.69629,624.70313c-7.10205,-27.02441 -17.2373,-52.39453 -30.40576,-76.10059c-13.17383,-23.70703 -38.65137,-60.52246 -76.44434,-110.45801c-27.71631,-36.64355 -44.78174,-59.89355 -51.19189,-69.74414c-10.5376,-16.02979 -18.15527,-30.74951 -22.84717,-44.14893c-4.69727,-13.39893 -7.04297,-26.97021 -7.04297,-40.71289c0,-25.42432 8.47119,-46.72559 25.42383,-63.90381c16.94775,-17.17871 37.90527,-25.76758 62.87354,-25.76758c25.19287,0 47.06885,8.93262 65.62158,26.79834c13.96826,13.28662 25.30615,33.10059 34.01318,59.4375c7.55859,-25.88037 18.20898,-45.57666 31.95215,-59.09424c19.00879,-18.32178 40.99707,-27.48535 65.96484,-27.48535c24.7373,0 45.69531,8.53564 62.87305,25.5957c17.17871,17.06592 25.76855,37.39551 25.76855,60.98389c0,20.61377 -5.04102,42.08691 -15.11719,64.41895c-10.08203,22.33203 -29.54687,51.59521 -58.40723,87.78271c-37.56738,47.41211 -64.93457,86.35352 -82.11328,116.8125c-13.51758,24.0498 -23.82422,49.24902 -30.9209,75.58594z","strokeWidth":2,"strokeCap":"round"}]');
var pathLength = heartPath.length;

var boids = [];
var groupTogether = false;

// Add the boids:
function addBoids (int) {
	for (var i = 0; i < int; i++) {
    var rad = panRad; //Set to radius of pan
    var angle = Math.random() * 2 * Math.PI;
    var x = Math.cos(angle) * rad;
    var y = Math.sin(angle) * rad;
    // console.log("radius: " + pan.radius);
    // console.log(x);
    // console.log(y);
    var point2 = new Point(x, y);
    var position = view.center + point2;
    // console.log("center = " + view.center.toString());
    // console.log("position = " + position.toString());
    boids.push(new Boid(position, 10, 0.05));
	}
}

addBoids(30);
var doanim = 0;
var moveback = false;
function onFrame(event) {
	// if ((Math.floor(event.count) % 300 === 100) && boids.length<20) {
	// 	addBoids(10);
	// }
	for (var i = 0, l = boids.length; i < l; i++) {
		if (groupTogether) {
			var length = ((i + event.count / 30) % l) / l * pathLength;
			var point = heartPath.getPointAt(length);
			if (point)
				boids[i].arrive(point);
		}
		boids[i].run(boids);
	}

}

// Reposition the heart path whenever the window is resized:
function onResize(event) {
	heartPath.fitBounds(view.bounds);
	heartPath.scale(0.8);
	pathLength = heartPath.length;
}

function onMouseDown(event) {
	if (unveiled) {
	    var position = event.point;
		boids.push(new Boid(position, 10, 0.05));
	} 
}


function onKeyDown(event) {
	if (event.key == 'space') {
		var layer = project.activeLayer;
		layer.selected = !layer.selected;
		return false;
	}
	if (event.key == 'a') {
		console.error(boids.length);
	}
	// if (event.key == 'b') {
	// 	console.error('whoo');
	// 	var tmp = boids.pop();
	// 	tmp.head.remove();
	// 	tmp.path.remove();
	// 	tmp.shortPath.remove();
	// 	console.error('huh');
	// 	console.error(boids.length)
	// }
	if (event.key == 'z') {
		groupTogether = true;
	}
}

/////////////// MESSY CODE I KNOW. these be the cracks ////////////





var randomInt = function(min, max) {
	//inclusive, exclusive
	return Math.floor(Math.random()*(max - min)+min);
}


var crackTaps = 0;
var crackLimit = randomInt(7,14);
var cracks = [];
var shell;

$('#myCanvas').on('click', function(e) {
    if (!unveiled) {
    	drawCracks();
    	crackTaps++;
    	if (crackTaps >= crackLimit) {
    		unveiled = true;
    		unveilPan();
    	}
    }
});

var drawShell = function() {
	var rect = new Rectangle(new Point(0,0), view.size);
	shell = new Path.Rectangle(rect);
	shell.fillColor = '#000';
}


var drawCracks = function() {
	console.log(event.pageX, event.pageY);
	var initialX = event.pageX;
	var initialY = event.pageY;

	var numPoints = randomInt(3,14);
	console.log(numPoints);

	var points = [];
	var centerX = initialX;
	var centerY = initialY;

	for (var i = 0; i < numPoints; i++) {
		var x = randomInt(-70, 70);
		var y = randomInt(-70, 70);
		centerX += x;
		centerY += y;

		points.push(new Point(centerX, centerY));
	}


	for (var i = 0; i < points.length - 1; i++) {
		var path = new Path.Line(points[i], points[i+1]);
		path.strokeColor = '#fff';
		path.strokeWidth = 2;

		cracks.push(path);
	}


	// var p1 = new Point(centerX - 30, centerY - 30);
	// var p2 = new Point(centerX + 30, centerY + 30);
	
	// var path = new Path.Line(p1, p2);
	// path.strokeColor = '#fff';
}

var unveilPan = function() {
	for (var i = 0; i < cracks.length; i++) {
		cracks[i].remove();
	}
	shell.remove();
}


drawShell();

console.log(view.size.width);




// ///////// DIS BE THE WAVES LALALAL /////

// var width, height, center;
// var points = 10;
// var smooth = true;
// var path = new Path();
// var mousePos = view.center / 2;
// var pathHeight = mousePos.y;
// path.fillColor = 'black';
// initializePath();

// function initializePath() {
// 	center = view.center;
// 	width = view.size.width;
// 	height = view.size.height / 2;
// 	path.segments = [];
// 	path.add(view.bounds.bottomLeft);
// 	for (var i = 1; i < points; i++) {
// 		var point = new Point(width / points * i, center.y);
// 		path.add(point);
// 	}
// 	path.add(view.bounds.bottomRight);
// 	path.fullySelected = false;
// 	path.strokeColor = '#fff';
// 	path.strokeWidth = 2;
// }

// function onFrame(event) {
// 	pathHeight += (center.y - mousePos.y - pathHeight) / 10;
// 	for (var i = 1; i < points; i++) {
// 		var sinSeed = event.count + (i + i % 10) * 100;
// 		var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
// 		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
// 		path.segments[i].point.y = yPos;
// 	}
// 	if (smooth)
// 		path.smooth();



// 	//sperm
// 	for (var i = 0, l = boids.length; i < l; i++) {
// 		if (groupTogether) {
// 			var length = ((i + event.count / 30) % l) / l * pathLength;
// 			var point = heartPath.getPointAt(length);
// 			if (point)
// 				boids[i].arrive(point);
// 		}
// 		boids[i].run(boids);
// 	}
// }

// function onMouseMove(event) {
// 	mousePos = event.point;
// }

// function onMouseDown(event) {
// 	smooth = !smooth;
// 	if (!smooth) {
// 		// If smooth has been turned off, we need to reset
// 		// the handles of the path:
// 		for (var i = 0, l = path.segments.length; i < l; i++) {
// 			var segment = path.segments[i];
// 			segment.handleIn = segment.handleOut = null;
// 		}
// 	}
// }

// // Reposition the path whenever the window is resized:
// function onResize(event) {
// 	initializePath();
// }

