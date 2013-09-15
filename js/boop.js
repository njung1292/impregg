//’secret’ specifies the numerical keystrokes that make up the word “mario”
var secret = "66797980"; 
var input = "";
var timer;
//The following function sets a timer that checks for user input. You can change the variation in how long the user has to input by changing the number in ‘setTimeout.’ In this case, it’s set for 500 milliseconds or ½ second.
$(document).keyup(function(e) {
	console.log(e);
	input += e.which;    
	clearTimeout(timer);
	timer = setTimeout(function() { input = ""; }, 500);
	check_input();
});
//Once the time is up, this function is run to see if the user’s input is the same as the secret code
function check_input() {
	console.log(input);
	console.log(secret);
    if (input === secret) {
        //the code used to reveal mario and the world is then put here  
        console.log('got here');
        $('#myCanvas').css('background-image', 'url("images/boop.jpg")');    
    }
};