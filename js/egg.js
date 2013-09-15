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

        createMasses: function() {
            this.masses = [];
            var segments = this.path.segments;
            for (var i = 0; i < segments.length; i++) {
                var mass = new Mass(segments[i].point, i);
                mass.setVelocity(new Point(Math.random(),Math.random())*3);
                this.masses.push(p);
            }
            mass = this.yolk.position;
            mass.setVelocity(new Point(Math.random(),Math.random())*3);
            this.masses.push(p);
        },

        createSprings: function() {
            var springs = [];
            var nPnts = this.NUM_POINTS;
            for (var i = 0; i < nPnts; i++) {
                springs.push(this.createSpring(i, (i+1) % nPnts));
                springs.push(this.createSpring(i, (i+2) % nPnts));
                springs.push(this.createSpring(i, nPnts));
            }
            this.springs = springs;
        },

        createSpring: function(aID, bID) {
            var length = (this.getPoint(aID) - this.getPoint(bID)).length;
            return new IMPREGG.Spring(aID, bID, length, this.STIFFNESS);
        },

        getPoint: function(ID) {
            var point;
            if (ID < NUM_POINTS) {
                point = this.path.segments[i].point;
            }
            else {
                point = this.yolk.position;
            }
            return point;
        }

        setPoint: function(ID, point) {
            if (ID < NUM_POINTS) {
                this.path.segments[i].point = point;
            }
            else {
                this.yolk.position = point;
            }
        }

        update: function() {
            var nPnts = this.NUM_POINTS
            for (var i = 1; i < nPnts; i++) {
                this.masses[i].update(this);
            }
            for (var iter = 0; iter < MAX_ITERS; iter++) {
                for (var i = 0; i < this.springs.length; i++) {
                    this.springs[i].update(this);
                }
            }
            this.path.smooth();
        },
    };

    //uncomment this to test;
    EGG.init();

    function onFrame(event) {
        EGG.update();
    }

// })(jQuery, window, document);