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
            this.PAN_RADIUS = (view.size.height /2) -10;
            this.createEgg();
            this.createMasses();
            this.createSprings();
            this.initEgg();
            this.time = 0;
        },

        DROP_TIME: 60,
        NUM_POINTS: 10,
        MAX_ITERS: 3,
        WHITE_STR: 0.006,
        YOLK_STR: 0.003,
        WHITE_FRICT: 0.2,
        YOLK_FRICT: 0.2,
        WHITES_RADIUS: 100,
        YOLK_RADIUS: 40,
        INIT_SPEED: 10,
        JIGGLE_AMOUNT: 2.5,
        CLICK_FORCE: 0.9,

        createEgg: function() {
            this.path = this.createWhites();
            this.yolk = this.createYolk();
        },

        createWhites: function() {
            var path = new Path( {
                fillColor: new Color(255,255,255,0.98),
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
            circle.fillColor = new Color(255,255,0,0.92);
            return circle;
        },

        createMasses: function() {
            this.masses = [];
            var segments = this.path.segments;
            for (var i = 0; i < segments.length; i++) {
                var mass = new IMPREGG.Mass(segments[i].point, i, this.WHITE_FRICT);
                mass.setVelocity(this.randomVelocity(this.INIT_SPEED));
                this.masses.push(mass);
            }
            mass = new IMPREGG.Mass(this.yolk.position, this.NUM_POINTS, this.YOLK_FRICT);
            mass.setVelocity(this.randomVelocity(this.INIT_SPEED));
            this.masses.push(mass);
        },

        randomVelocity: function(initSpeed) {
            return new Point(Math.random()-0.5,Math.random()-0.5)*initSpeed;
        },

        createSprings: function() {
            var springs = [];
            var nPnts = this.NUM_POINTS;
            for (var i = 0; i < nPnts; i++) {
                springs.push(this.createSpring(i, (i+1) % nPnts, this.WHITE_STR));
                springs.push(this.createSpring(i, (i+2) % nPnts, this.WHITE_STR));
                springs.push(this.createSpring(i, nPnts, this.YOLK_STR));
            }
            this.springs = springs;
        },

        createSpring: function(aID, bID, strength) {
            var length = (this.getPoint(aID) - this.getPoint(bID)).length;
            return new IMPREGG.Spring(aID, bID, length, strength);
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

        initEgg: function () {
            this.path.scale(10);
            this.path.smooth();
            this.yolk.scale(10);
        },

        update: function () {
            if (this.time < this.DROP_TIME) {
                console.log("dropping");
                this.updateDrop();
                this.time++;
            }
            else {
                this.updatePhysics();
            }

        },

        updateDrop: function() {
            this.path.scale(0.953);
            this.yolk.scale(0.962);
        },

        updatePhysics: function() {
            var nPnts = this.NUM_POINTS;
            for (var i = 0; i <= nPnts; i++) {
                this.masses[i].update(this);
            }
            for (var iter = 0; iter < this.MAX_ITERS; iter++) {
                for (var i = 0; i < this.springs.length; i++) {
                    this.springs[i].update(this);
                }
                for (var i = 0; i <= nPnts; i++) {
                    this.masses[i].collide(this, view.center, this.PAN_RADIUS);
                }
            }
            this.path.smooth();
        },

        jiggle: function() {
            var nPnts = this.NUM_POINTS;
            var totalVel = this.randomVelocity(this.JIGGLE_AMOUNT);
            for (var i = 0; i <= nPnts; i++) {
                this.masses[i].setVelocity(this.randomVelocity(this.JIGGLE_AMOUNT)+totalVel);
            }
        },

        pushYolk: function(point) {
            if (this.yolk.hitTest(point, {fill: true})) {
                this.jiggle();
                var yolkPos = new Point(this.yolk.position - point);
                var yolkInvPos = this.YOLK_RADIUS - yolkPos.length;
                var force = yolkPos.normalize(Math.sqrt(yolkInvPos)) * this.CLICK_FORCE;
                for (var i = 0; i < this.NUM_POINTS; i++) {
                    this.masses[i].setVelocity(force);
                }
                this.masses[this.NUM_POINTS].setVelocity(force);
                return true;
            }
            else {
                return false;
            }
        }
    };

    // EGG.init();

    // function onFrame(event) {
    //     EGG.update();
    // }

    // function onMouseDown(event) {
    //     EGG.pushYolk(event.point);
    // }

// })(jQuery, window, document);