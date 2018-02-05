//Question instances (question, answer, choices[])
var q1 = new Question("has the largest volcanic mountain? (Olympus Mons)", "Mars", ["Mercury", "Mars", "Earth", "Venus"]);
var q2 = new Question("has the longest day? (243 Earth days)", "Venus", ["Mercury", "Pluto", "Venus", "Jupiter"]);
var q3 = new Question("has five known moons? (planet/dwarf planet)", "Pluto", ["Pluto", "Mars", "Neptune", "Saturn"]);
var q4 = new Question("reaches the coldest temperatures? (-224°C)", "Uranus", ["Pluto", "Mercury", "Neptune", "Uranus"]);
var q5 = new Question("has the shortest day? (9 hours 56 minutes)", "Jupiter", ["Venus", "Saturn", "Jupiter", "Mercury"]);
var q6 = new Question("is the only planet not named after a god?", "Earth", ["Saturn", "Earth", "Mars", "Pluto"]);
var q7 = new Question("has no moons or rings?", "Mercury", ["Neptune", "Mercury", "Jupiter", "Venus"]);
var q8 = new Question("has the most extensive rings?", "Saturn", ["Uranus", "Pluto", "Mars", "Saturn"]);
var q9 = new Question("has the strongest winds ever recorded? (2,000 km/h)", "Neptune", ["Earth", "Jupiter", "Neptune", "Saturn"]);
var q10 = new Question("is the oldest?", "Jupiter", ["Mercury", "Mars", "Jupiter", "Venus"]);

//Reference all questions
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

//Score tracker
var correct = 0, incorrect = 0;

var i = 0; //Incrementer
var time = 31; //Timer

//Booleans
var questionTimeout;
var pauseTime = false;

//Document must first load
$(document).ready(function(){
	//AUDIO FILES
	var music = document.createElement("audio");
	var right = document.createElement("audio");
	var wrong = document.createElement("audio");
	music.setAttribute("src", "assets/audio/space-music.mp3");
	right.setAttribute("src", "assets/audio/scifiselect.mp3");
	wrong.setAttribute("src", "assets/audio/scifierror.mp3");
	
	//LOOP MUSIC
	music.loop = true;
	music.play();

	//STARTUP: hide replay button, update html elements, run the timer
	$("#replay").hide();
	updater();
	run();

	//Planet button click event listener
	$(".btns").on("click", function(){
		//IF correct answer...
		if(this.innerHTML === questions[i].answer){ //collection[i].answer){
			i++;
			correct++;
			right.play();
		}
		else{
			i++;
			incorrect++;
			wrong.play();
		}
		//Display answer, pause the time, hide the buttons
		$("#question").html("The correct answer is " + questions[i-1].answer);
		pauseTime = true;
		$(".btns").hide();
		//Update the html for new Q&A after 3 seconds, reset the time
		setTimeout(updater, 3000);
		time = 30;
	});

	//REPLAY (WHEN AVAILABLE)
	$("#replay").on("click", function(){
			right.play();
			i = 0;
			correct = 0;
			incorrect = 0;
			$("#replay").hide();
			$(".score").hide();
			$("#time").show();
			$(".btns").show();
			updater();
			run();
	});
});

//UPDATER FUNCTION
function updater(){
	//The countdown proceeds
	pauseTime = false;
	//IF iterator is beyond the array, ready up for replay. Hide choice buttons (no more increments for i)
	$(".btns").show();
	if(i >= questions.length){
		$(".btns").hide();
		$("#replay").show();
	}
	//IF still iterating, update Q&A
	if(i < questions.length){
	$("#question").html("Which planet in our solar system " + questions[i].question);
	$("#choice0").html(questions[i].choices[0]);
	$("#choice1").html(questions[i].choices[1]);
	$("#choice2").html(questions[i].choices[2]);
	$("#choice3").html(questions[i].choices[3]);
	}
	else{
		$("#time").hide();
		$("#question").html("YOUR RESULTS");
		$("#correct").html("Correct: " + correct);
		$("#incorrect").html("Incorrect: " + incorrect);
		$("#grade").html("Grade: " + (correct/questions.length) * 100 + "%");
		$(".score").show();
	}
}

//TIMER FUNCTIONS
function run(){
	questionTimeout = setInterval(decrement, 1000);
}
function decrement(){
	if(i >= questions.length){
		clearInterval(questionTimeout);
	}
	if(time <= 0){
		time = 31;
		incorrect++;
		i++;
		updater();
	}
	if(!pauseTime){time--;}
	$("#time").html(time);
}

//Question constructor
function Question(question, answer, choices) {
	this.question 	= question;
	this.answer 	= answer;
	this.choices 	= choices;
}