window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {
  
    var Spring = IMPREGG.Spring = function(a, b, restLength, strength) {
        this.init(a, b, restLength, strength);
    }

    Spring.prototype = {
        init: function(a, b, restLength, strength){
            this.a = a;
            this.b = b;
            this.restLength = restLength;
            this.strength = strength;
        },

        update: function(){
            var delta = this.b - this.a;
            var deltaLength = delta.length;
            var difference = (deltaLength - this.restLength)/deltaLength;
            var adjustment = delta * difference * this.strength / 2;
            this.a += adjustment;
            this.b -= adjustment;
        }
    }
// })(jQuery, window, document);

