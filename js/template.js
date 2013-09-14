window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var _common = IMPREGG.common = { //this is your js object
        
        init: function() {
            //do stuff
        }

        this.setVars();
        this.bindEvents();
    },

    setVars: function() {
        // set all variables here
        this.helloString = "hello" ; // also _common.helloString
    },

    bindEvents: function() {
        // set event listeners for your functions here
    },

    // the rest of your functions go here

    _common.init(); // don't forget to init!

})(jQuery, window, document);