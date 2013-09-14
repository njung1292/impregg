window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var Blah = IMPREGG.Blah = function(config) {
        this.bleep = config.blah;
        this.bloop = config.bloop;
        this.init();
    }

    Blah.prototype = {
        init: function(){ 
            console.log(this.bleep);
            this.logBloop();
        },

        logBloopAndBluup: function() {
            console.log(this.bloop);
            console.log(this.bluup);
        },

        bluup: "bluup"
    }

    var someConfig = {
        bleep: "bleep",
        bloop: "bloop"
    }
    var instanceOfBlah = new Blah(config);

})(jQuery, window, document);

