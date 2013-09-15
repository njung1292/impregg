
// The pan is a circle
var pan = new Path.Circle({
	center: view.center,
	radius: (view.size.height /2)-10,
	strokeColor: '#62A089',
	fillColor: '#5F5E5D',
	strokeWidth: 10
});

var count = 0;
var position = view.center;
var spiral = new Path({
	fillColor: '#444'
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

function onKeyDown(event) {
	if (event.key == 'z') {
		// Scale the path by 110%:
		spiral.scale(1.1);

		// Prevent the key event from bubbling
		return false;
	}
	if (event.key == 'x') {
		spiral.scale(1.1);
		return false;
	}
}

function onFrame(event) {
	// spiral.rotate(3);
}
