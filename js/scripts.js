// // Create a Paper.js Path to draw a line into it:
// var path = new Path();
// // Give the stroke a color
// path.strokeColor = 'black';
// var start = new Point(100, 100);
// // Move to start and draw a line from there
// path.moveTo(start);
// // Note the plus operator on Point objects.
// // PaperScript does that for us, and much more!
// path.lineTo(start + [ 100, -50 ]);

// var testPath = Project.importJSON(('["Path", {"pathData":"M261.093,52.608c0,0-112.494-65.997-137.993,28.499
// 	s44.998,59.997,41.998,119.994c-3,59.997,64.497,65.997,64.497,65.997s76.496,17.999,104.995-37.498s64.497-35.998,64.497-35.998
// 	s76.496,28.499,43.498-55.497s-65.997-100.495-89.995-92.995C328.589,52.608,296.87,68.132,261.093,52.608z"}'));
// testPath.strokeColor = 'black';
// var start1 = new Point(300, 400);
// testPath.moveTo(start1);

// // Create a circle shaped path with its center at the center
// // of the view and a radius of 30:
// var path = new Path.Circle({
// 	center: view.center,
// 	radius: 250,
// 	strokeColor: 'black'
// });

// Create a circle shaped path with its center at the center
// of the view and a radius of 30:
var path = new Path.Circle({
	center: view.center,
	radius: 250,
	strokeColor: 'black'
});

// //var path = new Path.Circle(view.bounds.center, 30);
// path.fillColor = 'red';

// function onResize(event) {
// 	// Whenever the window is resized, recenter the path:
// 	path.position = view.center;
// }

