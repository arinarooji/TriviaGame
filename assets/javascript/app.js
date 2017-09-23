//QUESTION OBJECTS: There must be a more efficient way...
var questionOne = {
	question: "has the largest volcanic mountain? (Olympus Mons)",
	choices: ["Mercury", "Mars", "Earth", "Venus"],
	answer: "Mars"
}
var questionTwo = {
	question: "has the longest day? (243 Earth days)",
	choices: ["Mercury", "Pluto", "Venus", "Jupiter"],
	answer: "Venus"
}
var questionThree = {
	question: "has five known moons?",
	choices: ["Pluto", "Mars", "Neptune", "Saturn"],
	answer: "Pluto"
}
var questionFour = {
	question: "reaches the coldest temperatures? (-224°C)",
	choices: ["Pluto", "Mercury", "Neptune", "Uranus"],
	answer: "Uranus"
}
var questionFive = {
	question: "has the shortest day? (9 hours 55 minutes)",
	choices: ["Venus", "Saturn", "Jupiter", "Mercury"],
	answer: "Jupiter"
}
var questionSix = {
	question: "is the only planet not named after a god?",
	choices: ["Saturn", "Earth", "Mars", "Pluto"],
	answer: "Earth"
}
var questionSeven = {
	question: "has no moons or rings?",
	choices: ["Neptune", "Mercury", "Jupiter", "Venus"],
	answer: "Mercury"
}
var questionEight = {
	question: "has the most extensive rings?",
	choices: ["Uranus", "Pluto", "Mars", "Saturn"],
	answer: "Saturn"
}

//VARIABLES: Array for objects, score counters, iterator, time variables
var collection = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight];
var correct = 0;
var incorrect = 0;
var i = 0;
var time = 31;
var questionTimeout;


//FIRE UP THIS CODE WHEN THE DOCUMENT IS READY
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

	//MAIN CLICK EVENT: check the user's answer
	$(".btns").on("click", function(){
		//IF correct answer...
		if(this.innerHTML === collection[i].answer){
			i++;
			correct++;
			right.play();
		}
		else{
			i++;
			incorrect++;
			wrong.play();
		}
		//Update the html for new Q&A, reset the time
		updater();
		time = 31;
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
	//IF iterator is beyond the array, ready up for replay. Hide choice buttons (no more increments for i)
	if(i >= collection.length){
		$(".btns").hide();
		$("#replay").show();
	}
	//IF still iterating, update Q&A
	if(i < collection.length){
	$("#question").html("Which planet in our solar system " + collection[i].question);
	$("#choice1").html(collection[i].choices[0]);
	$("#choice2").html(collection[i].choices[1]);
	$("#choice3").html(collection[i].choices[2]);
	$("#choice4").html(collection[i].choices[3]);
	}
	else{
		$("#time").hide();
		$("#question").html("YOUR RESULTS");
		$("#correct").html("Correct: " + correct);
		$("#incorrect").html("Incorrect: " + incorrect);
		$("#grade").html("Grade: " + (correct/collection.length) * 100 + "%");
		$(".score").show();
	}
}

//TIMER FUNCTIONS
function run(){
	questionTimeout = setInterval(decrement, 1000);
}
function decrement(){
	if(i >= collection.length){
		clearInterval(questionTimeout);
	}
	if(time <= 0){
		time = 31;
		incorrect++;
		i++;
		updater();
	}
	time--;
	$("#time").html(time);
}