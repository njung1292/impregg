window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var SPLASH = IMPREGG.SPLASH = { //this is your js object
        init: function() {
            this.setVars();
            this.bindEvents();

            var circle = new Path.Circle({
             center: view.center,
             radius: 250,
             strokeColor: 'black'
            });
        },

        setVars: function() {
            this.exampleString = "example";
        },

        bindEvents: function() {
            // set event listeners for your functions here
            $(document).on('click', function() {
                console.log('example!');
            });
        },

        // the rest of your functions go here
        example: function () {

        }
    }

    //uncomment this to test;
    //SPLASH.init();

})(jQuery, window, document);