//QUESTION OBJECTS
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
	choices: ["Pluto", "Nibiru", "Neptune", "Uranus"],
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

var collection = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight];
var correct = 0;
var incorrect = 0;
var i = 0;
var time = 31;
var questionTimeout;

$(document).ready(function(){
	
	$("#replay").hide();
	updater();
	run();

	//CLICKER
	$(".btns").on("click", function(){
		if(this.innerHTML === collection[i].answer){
			i++;
			correct++;
			console.log(i);
			console.log(this.innerHTML);
		}
		else{
			i++;
			incorrect++;
			console.log(i);
			console.log(this.innerHTML);
		}
		updater();
		time = 31;
	});

	//REPLAY (WHEN AVAILABLE)
	$("#replay").on("click", function(){
			i = 0;
			correct = 0;
			incorrect = 0;
			$("#replay").hide();
			$(".score").hide();
			$(".btns").show();
			updater();
			run();
	});
});


//UPDATER FUNCTION
function updater(){
	if(i >= collection.length){
		$(".btns").hide();
		$("#replay").show();
	}
	if(i < collection.length){
	$("#question").html("Which planet in our solar system " + collection[i].question);
	$("#choice1").html(collection[i].choices[0]);
	$("#choice2").html(collection[i].choices[1]);
	$("#choice3").html(collection[i].choices[2]);
	$("#choice4").html(collection[i].choices[3]);
	}
	else{
		$("#question").html("Lets see how you did...");
		$("#correct").html("Correct: " + correct);
		$("#incorrect").html("incorrect: " + incorrect);
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