	window.IMPREGG || (IMPREGG = {}); //define a namespace

	(function($, window, document, undefined) {
	  
	    var PAN = IMPREGG.PAN = { //this is your js object
	        init: function() {
	            this.setVars();
	            this.drawSpiral();
	            this.bindEvents();
	        },

	        setVars: function() {
				// The pan is a circle
				var radius = (view.size.height /2)-10;

				var circle = new Path.Circle({
					center: view.center,
					radius: (view.size.height /2)-10,
					strokeColor: '#62A089',
					fillColor: '#5F5E5D',
					strokeWidth: 10
				});
				// handle.smooth();
	        },

	        drawSpiral: function() {
	        	var count = 0;
	        	var position = view.center;
	        	var spiral = new Path({
	        		fillColor: '#000'
	        	});
	        	console.log(position.y);
	        	console.log(view.size.height);
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
	        	spiral.smooth();
	        },

	        bindEvents: function() {
	            // set event listeners for your functions here
	            $(document).on('click', function() {
	                console.log('PAN!');
	            });
	        },

	        // the rest of your functions go here
	        example: function () {

	        }
	    }

	    //uncomment this to test;
	    //EXAMPLE.init();

	})(jQuery, window, document);



