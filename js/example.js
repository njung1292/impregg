window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var EXAMPLE = IMPREGG.EXAMPLE = { //this is your js object
        init: function() {
            this.setVars();
            this.bindEvents();
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
    //EXAMPLE.init();

})(jQuery, window, document);