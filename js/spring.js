window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {
  
    var Spring = IMPREGG.Spring = function(aID, bID, restLength, strength) {
        this.init(aID, bID, restLength, strength);
    }

    Spring.prototype = {
        init: function(aID, bID, restLength, strength){
            this.aID = aID;
            this.bID = bID;
            this.restLength = restLength;
            this.strength = strength;
        },

        update: function(egg){
            var a = egg.getPoint(this.aID);
            var b = egg.getPoint(this.bID);
            // console.log("a: ", a);
            // console.log("b: ", b);
            var delta = b - a;
                // console.log("delta: ", delta);
            var deltaLength = delta.length;
            var difference = (deltaLength - this.restLength)/deltaLength;
            var adjustment = delta * difference * this.strength / 2;
            a += adjustment;
            b -= adjustment;
            egg.setPoint(this.aID, a);
            egg.setPoint(this.bID, b);
            return this;
        }
    }
// })(jQuery, window, document);

