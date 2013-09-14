window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var PAN = IMPREGG.PAN = { //this is your js object
        init: function() {
            this.setVars();
            this.bindEvents();
        },

        setVars: function() {
			// The pan is a circle
			var path = new Path.Circle({
				center: view.center,
				radius: (view.size.height /2)-10,
				strokeColor: '#62A089',
				strokeWidth: 10
			});

			path.fillColor = '#333';

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



