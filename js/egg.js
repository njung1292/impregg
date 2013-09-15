window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {

    // var Mass = function(p, pID) {

    //     console.log("p: ", p);
    //     this.init(p, pID);
    // };

    // Mass.prototype = {
    //     init: function(p, pID){
    //         this.pID = pID;
    //         this.oldPos = new Point(p);
    //     },

    //     setVelocity: function(velocity) {
    //         this.oldPos -= velocity;
    //     },

    //     update: function(egg){
    //         var curPos = egg.getPoint(this.pID);
    //         var velocity = curPos - this.oldPos;
    //         if (velocity.length > egg.FRICTION) {
    //             var frictionForce = velocity.normalize(egg.FRICTION);
    //             velocity -= frictionForce;
    //             egg.setPoint(this.pID, curPos + velocity);
    //         }
    //         this.oldPos = curPos;
    //         return this;
    //         //return point;
    //     }
    // }
  
    var EGG = IMPREGG.EGG = { //this is your js object
        init: function() {
            this.createEgg();
            this.createMasses();
            this.createSprings();
            this.bindEvents();
        },

        NUM_POINTS: 10,
        MAX_ITERS: 2,
        STIFFNESS: 0.05,
        FRICTION: 0.05,
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
                var mass = new IMPREGG.Mass(segments[i].point, i);
                mass.setVelocity(new Point(Math.random(),Math.random())*3);
                this.masses.push(mass);
            }
            mass = new IMPREGG.Mass(this.yolk.position, this.NUM_POINTS);
            mass.setVelocity(new Point(Math.random(),Math.random())*3);
            this.masses.push(mass);
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
            if (ID < this.NUM_POINTS) {
                point = this.path.segments[ID].point;
            }
            else {
                point = this.yolk.position;
            }
            return new Point(point);
        },

        setPoint: function(ID, point) {
            if (ID < this.NUM_POINTS) {
                this.path.segments[ID].point = new Point(point);
            }
            else {
                this.yolk.position = new Point(point);
            }
        },

        update: function() {
            var nPnts = this.NUM_POINTS
            for (var i = 0; i <= nPnts; i++) {
                this.masses[i].update(this);
            }
            for (var iter = 0; iter < this.MAX_ITERS; iter++) {
                for (var i = 0; i < this.springs.length; i++) {

            // console.log("spring " + i +" "+ this.springs[i]);
                    this.springs[i].update(this);
                }
            }
            this.path.smooth();
        },
    };

    //uncomment this to test;
    EGG.init();
    // offFrame();
    // console.log(EGG.springs);

    function onFrame(event) {
        EGG.update();
    }

// })(jQuery, window, document);