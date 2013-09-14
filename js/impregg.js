window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
    
    IMPREGG.init = function() {
        //this.EXAMPLE.init();

        //uncomment when we want to initialize these forreal
        //this.PAN.init(); 

        this.SPLASH.init();
        //this.PAN.init():
    }

    IMPREGG.init(); //initialize the app
    IMPREGG.PAN.init();

})(jQuery, window, document);
