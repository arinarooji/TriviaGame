//TRIVIA OBJECT: Contains questions, choices, and answers in correct order
var trivia = {
	//Questions 1-10
	question: [
		"has the largest volcanic mountain? (Olympus Mons)",
		"has the longest day? (243 Earth days)",
		"has five known moons? (planet/dwarf planet)",
		"reaches the coldest temperatures? (-224°C)",
		"has the shortest day? (9 hours 56 minutes)",
		"is the only planet not named after a god?",
		"has no moons or rings?",
		"has the most extensive rings?",
		"has the strongest winds ever recorded? (2,000 km/h)",
		"is the oldest?"],
	//Choice sets for questions 1-10
	choice: [ 
		["Mercury", "Mars", "Earth", "Venus"],
		["Mercury", "Pluto", "Venus", "Jupiter"],
		["Pluto", "Mars", "Neptune", "Saturn"],
		["Pluto", "Mercury", "Neptune", "Uranus"],
		["Venus", "Saturn", "Jupiter", "Mercury"],
		["Saturn", "Earth", "Mars", "Pluto"],
		["Neptune", "Mercury", "Jupiter", "Venus"],
		["Uranus", "Pluto", "Mars", "Saturn"],
		["Earth", "Jupiter", "Neptune", "Saturn"],
		["Mercury", "Mars", "Jupiter", "Venus"]
	],
	//Answers for questions 1-10
	answer: ["Mars","Venus","Pluto","Uranus","Jupiter","Earth","Mercury","Saturn","Neptune","Jupiter"]
}

//VARIABLES: Array for objects, score counters, iterator, time variables
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
		if(this.innerHTML === trivia.answer[i]){ //collection[i].answer){
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
	if(i >= trivia.question.length){
		$(".btns").hide();
		$("#replay").show();
	}
	//IF still iterating, update Q&A
	if(i < trivia.question.length){
	$("#question").html("Which planet in our solar system " + trivia.question[i]);
	$("#choice0").html(trivia.choice[i][0]);
	$("#choice1").html(trivia.choice[i][1]);
	$("#choice2").html(trivia.choice[i][2]);
	$("#choice3").html(trivia.choice[i][3]);
	}
	else{
		$("#time").hide();
		$("#question").html("YOUR RESULTS");
		$("#correct").html("Correct: " + correct);
		$("#incorrect").html("Incorrect: " + incorrect);
		$("#grade").html("Grade: " + (correct/trivia.question.length) * 100 + "%");
		$(".score").show();
	}
}

//TIMER FUNCTIONS
function run(){
	questionTimeout = setInterval(decrement, 1000);
}
function decrement(){
	if(i >= trivia.question.length){
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