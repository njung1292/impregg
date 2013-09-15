window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {
  
    var Mass = IMPREGG.Mass = function(p, pID) {
        this.init(p, pID);
    }

    Mass.prototype = {
        init: function(p, pID){
            this.pID = pID;
            this.oldPos = new Point(p);
        },

        setVelocity: function(velocity) {
            this.oldPos -= velocity;
        }

        update: function(egg){
            var curPos = egg.getPoint(this.pID);
            var velocity = curPos - this.oldPos;
            if (velocity.length > egg.FRICTION) {
                var frictionForce = velocity.normalize(egg.FRICTION);
                velocity -= frictionForce;
                egg.setPoint(this.pID, curPos + velocity);
            this.oldPos = curPos;
            return point;
        }
    }
// })(jQuery, window, document);

