window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
    
    IMPREGG.init = function() {
        //uncomment when we want to initialize these forreal
        
        IMPREGG.PAN.init();
        IMPREGG.SPLASH.init();
    }

    IMPREGG.init(); //initialize the app

})(jQuery, window, document);
