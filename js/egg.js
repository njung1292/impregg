window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {
  
    var EGG = IMPREGG.EGG = { //this is your js object
        init: function() {
            this.createEgg();
            this.createMasses();
            this.createSprings();
            this.bindEvents();
        },

        NUM_POINTS: 10,
        MAX_ITERS: 3,
        STIFFNESS: 0.5,
        FRICTION: 0.15,
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
        },

        createWhites: function() {
            var path = new Path( {
                fillColor: 'white',
                closed: true
            });
            var center = view.center;
            var delta = new Point(this.WHITES_RADIUS, 0);
            for (var i = 0; i < this.NUM_POINTS; i++) {
                var segment = path.add(center + delta);
                var point = segment.point;
                delta.angle += 360 / this.NUM_POINTS;
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
            springs = [];
            var segments = this.path.segments;
            for (var i = 0; i < segments.length; i++) {
                var segment = segments[i];
                var a = segment.point;
                var b = segment.next.point;
                springs.push(this.createSpring(a,b));
                var b = segment.next.next.point;
                springs.push(this.createSpring(a,b));
                var b = this.yolk.position;
                springs.push(this.createSpring(a,b));
            }
            this.springs = springs;
        },

        createSpring: function(a, b) {
            return new IMPREGG.Spring(a, b, (a - b).length, this.STIFFNESS);
        },

        createMasses: function() {
            this.masses = [];
            var segments = this.path.segments;
            for (var i = 0; i < segments.length; i++) {
                var p = new Point(segments[i].point);
                p.oldPos = new Point(p) + new Point(Math.random(),Math.random())*3;
                this.masses.push(p);
            }
            p = this.yolk.position;
            p.oldPos = new Point(p) + new Point(Math.random(),Math.random())*3;
            this.masses.push(p);
        },

        update: function() {
            this.masses[this.NUM_POINTS] = this.updatePoint(this.masses[this.NUM_POINTS]);
            this.yolk.position = this.masses[this.NUM_POINTS];
            for (var i = 1; i < this.NUM_POINTS; i++) {
                this.masses[i] = this.updatePoint(this.masses[i]);
                this.path.segments[i-1].point = this.masses[i];
            }

            for (var i = 0; i < this.springs.length; i++) {
                this.springs[i] = this.springs[i].update();
                // this.spring[i].update;

            }

            this.path.smooth();
        },

        updatePoint: function(point){
            var tempPos = point;
            var velocity = point - point.oldPos;
            if (velocity.length > this.FRICTION) {
                var frictionForce = new Point(1, 0);
                frictionForce.angle = velocity.angle;
                frictionForce *= this.FRICTION;
                velocity -= frictionForce;
                point += velocity;
            }
            point.oldPos = tempPos;
            return point;
        }
    };

    //uncomment this to test;
    EGG.init();

    function onFrame(event) {
        EGG.update();
    }

// })(jQuery, window, document);