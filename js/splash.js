window.IMPREGG || (IMPREGG = {}); //define a namespace

// (function($, window, document, undefined) {

    var SPLASH = IMPREGG.SPLASH = { //this is your js object
        init: function() {
            this.setVars();
            //this.bindEvents();
            //his.initShapes();
            this.drawShellEnclosure();
        },

        /* set up */
        setVars: function() {
            this.unveiled = false;
        },

        bindEvents: function() {
            var context = this;
            $('#myCanvas').on('click', function() {
                if (!context.unveiled) {
                    context.unveilEgg();
                    context.unveiled = true;
                }
                //context.drawCircle();
            });
        },

        onResize: function(event) {
            this.circle.position = view.center;
            this.shell.position = view.center;
        },


        /* init shapes */
         initShapes: function() {
            this.initShell();
            this.initCircle();
        },

        initShell: function() {
            var size = new Size(300, 300);
            this.shellRect = new Rectangle(new Point(200,200), new Size(300, 300));
        },

        initCircle: function() {
            this.circle = {
                center: view.center,
                radius: 100,
                strokeColor: 'red'
            };
        },



        /* draw shapes */
        drawShell: function() {
            var shell = new Path.Rectangle(this.shell);
            shell.fillColor = 'black';
        },

        drawCircle: function() {
            //var circle = new Path.Circle(this.circle);

            var circle = new Path.Circle({
                center: view.center,
                radius: 100,
                strokeColor: 'red'
            })
            circle.fillColor = 'red';
        },

        drawShapes: function() {
            this.drawShell();
            this.drawCircle();
        },

        drawShellEnclosure: function() {
            this.drawCircle();
            console.log('hi');
        },

       
        /* other */
        unveilEgg: function() {
           
        }
    };

    //uncomment this to test;
    //SPLASH.init();

    SPLASH.drawShellEnclosure();

// })(jQuery, window, document);













