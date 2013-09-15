window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {
  
    var Mass = IMPREGG.Mass = function(p, pID, friction) {

        this.init(p, pID, friction);
    }

    Mass.prototype = {
        init: function(p, pID, friction){
            this.pID = pID;
            this.oldPos = new Point(p);
            this.friction = friction;
        },

        setVelocity: function(velocity) {
            this.oldPos -= velocity;
        },

        update: function(egg){
            var curPos = egg.getPoint(this.pID);
            var velocity = curPos - this.oldPos;
            if (velocity.length > 32 * this.friction) {
                egg.setPoint(this.pID, curPos + velocity*0.8);
            }
            else if (velocity.length > this.friction) {
                var frictionForce = velocity.normalize(this.friction);
                velocity -= frictionForce;
                egg.setPoint(this.pID, curPos + velocity);
            }
            this.oldPos = curPos;
            return this;
        },

        collide: function(egg, center, radius) {
            var curPos = egg.getPoint(this.pID);
            var centerVector = curPos - center;
            if (centerVector.length > radius) {
                curPos = center + centerVector.normalize(radius);
                egg.setPoint(this.pID, curPos);
            }
        }
    }
// })(jQuery, window, document);

