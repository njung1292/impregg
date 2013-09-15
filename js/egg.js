window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {
  
    var EGG = IMPREGG.EGG = { //this is your js object
        init: function() {
            this.createEgg();
            this.createMasses();
            this.bindEvents();
            this.yolk.position = view.center - new Point(100, 100);
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
            var delta = new Point(this.WHITES_RADIUS, 0);
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
            return springs;
        },

        createSpring: function(a, b) {
            return new IMPREGG.Spring(a, b, (a - b).length, this.STIFFNESS);
        },

        createMasses: function() {
            this.masses = [];
            var segments = this.path.segments;
            for (var i = 0; i < segments.length; i++) {
                var segment = segments[i];
                var p = segment.point;
                var newMass = new IMPREGG.Mass(p, this.FRICTION);
                this.masses.push(newMass);
            }
            this.masses.push(new IMPREGG.Mass(this.yolk.position, this.FRICTION));
        },

        update: function() {

            //this.masses[0].pos.x += 1;
            for (var i = 0; i < this.masses.length; i++) {
                var mass = this.masses[i];
                mass.update();
            }

            for (var i = 0; i < this.springs.length; i++) {
                var spring = this.springs[i];
                spring.update();
            }

            this.path.smooth();
        }
    };

    //uncomment this to test;
    EGG.init();


    function onFrame(event) {
        EGG.update();
        console.log("8D");
    }

// })(jQuery, window, document);