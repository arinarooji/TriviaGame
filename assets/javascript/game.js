console.log("JavaScript file linked");

//Create questions
//Create choices/answer
//Time variable
var questions = ["has the largest mountain?", "has the longest day? (243 Earth days)", "has five known moons?", "reaches the coldest temperatures? (-224 degrees celcius)", "has the shortest day? (9 hours 55 minutes)", "is the only planet not named after a god?", "has no moons or rings?", "has fourteen known moons?", "has the most extensive rings?"];
var choices = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
var answer = [3, 1, 8, 6, 4, 2, 0, 7, 5];
var time = 30;
var i = 0;

var correct = 0;
var incorrect = 0;

$(document).ready(function(){
	//Display question
	$("#question").html("Which planet in our solar system " + questions[i]);
	//Log answer, this reference works
	console.log(choices[answer[i]]);
	//Display choices, FIGURE THIS OUT

	/*Check choice
	$(".choice").on("click", function(){
		if(this === choices[answer[i]]){
			console.log("yeah");
		}

	});*/




});
 	
 
//During countdown
//Select question
//Select corresponding choices
//If user CLICKS correct question, correct++
//Else, incorrect++
//If timeout, timeout++
//New question