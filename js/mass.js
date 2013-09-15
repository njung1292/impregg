window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var Mass = IMPREGG.Mass = function(p, friction) {
        Mass.init(p, friction);
    }

    Mass.prototype = {
        init: function(p, friction){
            this.pos = p;
            this.oldPos = p;
            this.friction = friction;
        },

        update: function(){
            var tempPos = this.pos;
            var velocity = this.pos - this.oldPos;
            var frictionForce = this.friction * velocity/velocity.length;
            velocity = max(velocity - frictionForce, 0);
            this.pos += velocity;
            this.oldPos = tempPos;
        }
    }
})(jQuery, window, document);

