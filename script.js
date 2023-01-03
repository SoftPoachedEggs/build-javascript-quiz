
/*

-Begin Prompt
    -Start Button
    -when start button clicked hide start section and display question section
-Question display
    -display qustion 
    -Multiple Choice Buttons
    -Answer status display
    -once timer runs out or question list completed hide question section and display final score section
-final score display
    -text box for initials
    -submit score button
    -once button to submit score is clicked hide 
-high score display
    -Clear score button
    -Start Over button


*/

let timer;
let timerInterval;
let activeQuestion;

const clearHighScore = document.querySelector("#clearHighScore");
const timeDisplay = document.querySelector('#timer');
const question = document.querySelector('#questionDisplayText');
const startButton = document.querySelector('#startButton');
const backButton = document.querySelector("#backButton");
const submitButton = document.querySelector("#submitButton");

const beginSection = document.querySelector("#beginSection");
const questionDisplay = document.querySelector("#questionDisplay");
const questionResult = document.querySelector("#answerResults-text")
const finalScoreSection = document.querySelector("#finalScoreSection");
const highScoreDisplaySection = document.querySelector("#highScoreDisplaySection");
const highScoreList = document.querySelector("#highscoreList");


//Hide inactive sections
const hideSections = () => {
    beginSection.setAttribute('hidden', true);
    questionDisplay.setAttribute('hidden', true);
    finalScoreSection.setAttribute('hidden', true);
    highScoreDisplaySection.setAttribute('hidden', true);
    // change to correct item. display when first question is answered resultDiv.style.display = "none"
}




//timer countdown
function countdown() {
    timer--;
    displayTimer();
   if (timer <= 0) {
    endQuiz();
    }}


//display timer
function displayTimer() {
    timeDisplay.textContent = timer;
  }

//quiz question objects

const quizQuestionBank = [
    { 
        question: "Commonly used data types DO NOT include:",
        choices: [
                "strings",
                "booleans", 
                "alerts",
                "numbers",
                ],
        answer: "alerts",
    },
    { 
        question: "blah, blah, black, another quesiton:",
        choices:[ 
                "numbers and strings",
                "other arrays",
                "booleans",
                "all of the above",
                ],
        answer:  "all of the above",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices:[ 
                "commas", 
                "curly brackets",
                "quotes",
                "parentheses"
                ],
        answer: "quotes", 
    },
     {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:[ "JavaScript", 
                "terminal/bash",
                "for loops",
                "console.log"
                ],
        answer: "console.log", 
    },
    {
        question: "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        choices:[
                "break", 
                "stop",
                "halt",
                "exit",
                ],
        answer: "break", 
    },
]


let startQuiz = () => {
    hideSections();
    activeQuestion = 0
    timer = 50;

    //initialize timer and start countdown
   
    timerInterval = setInterval(countdown, 1000);
    questionDisplay.removeAttribute('hidden');

    quizDisplay();
    displayTimer();

}


//on click clear display, populate first question and initialize timer.
startButton.addEventListener("click", startQuiz);

let quizDisplay = () => {
    const questionPrompt = quizQuestionBank[activeQuestion];
    const answerOptions = questionPrompt.choices;
    

    questionDisplayText.textContent = questionPrompt.question;


    for (i = 0; i < quizQuestionBank.length; i++){
        let answerOptionDisplay = answerOptions[i]
        let answerOptionButton = document.querySelector("#optionButton" + i);
        answerOptionButton.textContent = answerOptionDisplay;
    }
}
// set click listener to answer buttons and activate checkanswer function
document.querySelector("#answerButtons").addEventListener("click", checkAnswer);

//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(answerOptionButton) {
  return answerOptionButton.textContent === quizQuestionBank[activeQuestion].answer;
}

//if answer is incorrect, penalise time
function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  if (optionIsCorrect(optionButton)) {
    questionResult.textContent = "Correct!";
    console.log("correct");
  } else {
    questionResult.textContent = "Incorrect!";
    console.log("incorrect");
    decrementTimer();
    }

  activeQuestion++;
  
  if (activeQuestion < quizQuestionBank.length) {
    quizDisplay();
  } else {
    endQuiz();
  }
}

//timer penalty for incorrect answer
  const decrementTimer = () => {
    let timePenalty = 5
    timer = timer - timePenalty;
    displayTimer();
}



//timer stop function
const stopTimer = () => {
    clearInterval(timerInterval);
}

const endQuiz = () => {
    stopTimer();
    hideSections();
    highScoreDisplaySection.removeAttribute('hidden');

}

//high score page buttons

//backButton.addEventListener("click", returnToMain);
//clearHighScore.addEventListener("click", clearScore);
//submitButton.addEventListener("click", submitScore);


//const updateStoredLeaderboard = (leaderboardItem) => 
//{
//    let leaderboardArray = getLeaderboard();
 //   //append new leaderboard item to leaderboard array
 //   leaderboardArray.push(leaderboardItem);
//    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
//}


/*
//return to main page function
const returnToMain = () => {

}

//Clear score function
const clearScore = () => {

}

//submit score function
const submitScore = () => {

}

//high score display function

const */