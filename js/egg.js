window.IMPREGG || (IMPREGG = {}); //define a namespace

(function($, window, document, undefined) {
  
    var EGG = IMPREGG.EGG = { //this is your js object
        init: function() {
            this.createEgg();
            this.createsMasses();
            this.bindEvents();
        },

        NUMBER_OF_POINTS: 10,
        MAX_ITERS: 3,
        STIFFNESS: 0.5,
        FRICTION: 1,
        WHITES_RADIUS: 100,
        YOLK_RADIUS: 30,

        bindEvents: function() {
            // set event listeners for your functions here
            $(document).on('click', function() {
                console.log(':|');
            });
        },

        createEgg: function() {
            this.path = this.createWhites();
            this.yolk = this.createYolk();
            this.springs = this.createSprings();
        },

        createWhites: function() {
            var path = new Path( {
                fillColor: 'white',
                closed: true
            });
            var center = view.center;
            var delta = new Point(WHITES_RADIUS, 0);
            for (var i = 0; i < this.NUMBER_OF_POINTS; i++) {
                var segment = path.add(center + delta);
                var point = segment.point;
                delta.angle += 360 / this.NUMBER_OF_POINTS;
            }
            path.smooth();
            return path;
        },

        createYolk: function() {
            var circle = new Path.Circle(view.center, this.YOLK_RADIUS);
            circle.fillColor = 'yellow';
            return circle;
        },

        createSprings: function() {
            var springs = [];
            var segments = this.path.segments;
            for (var segment in segments) {
                var a = segment.point;
                var b = segment.next.point;
                springs.push(this.createSpring(a,b));
                var b = segment.next.next.point;
                springs.push(this.createSpring(a,b));
                var b = this.yolk.position;
                springs.push(this.createSpring(a,b));
            }
            return springs;
        },

        createSpring: function(a, b) {
            return new Spring(a, b, (a - b).length, this.STIFFNESS);
        },

        createMasses: function() {
            this.masses = [];
            masses.push(new Mass(this.yolk.position), this.FRICTION);
            for (var segment in this.segments) {
                masses.push(new Mass(this.segment.point), this.FRICTION);
            }
        },

        update: function() {
            for (var mass in this.masses) {
                mass.update();
            }
            for (var spring in this.springs) {
                spring.update();
            }
        }
    }

    //uncomment this to test;
    //EXAMPLE.init();

})(jQuery, window, document);