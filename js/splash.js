window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var SPLASH = IMPREGG.SPLASH = { //this is your js object
        init: function() {
            this.setVars();
            this.bindEvents();

            this.drawShellEnclosure();


            // this.drawCircle();
        },

        setVars: function() {
            this.exampleString = "example";
        },

        bindEvents: function() {
            // set event listeners for your functions here
            // $(document).on('click', function() {
            //     console.log('example!');
            // });
            $('#myCanvas').on('click', function() {
                console.log('clicking on canvas!');
            });
        },

        drawShellEnclosure: function() {
            $('#myCanvas').on('click', function() {
                console.log('clicking on canvas!');
            });
        },

        drawCircle: function() {
            var circle = new Path.Circle({
             center: view.center,
             radius: 50,
             strokeColor: 'red'
            });
            circle.fillColor = 'red';
        },

        // the rest of your functions go here
        example: function () {

        }
    }

    //uncomment this to test;
    //SPLASH.init();

})(jQuery, window, document);













