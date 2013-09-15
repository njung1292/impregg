var SPLASH = {

	var randomInt = function(min, max) {
		//inclusive, exclusive
		return Math.floor(Math.random()*(max - min)+min);
	}

	var unveiled = false;
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

}
