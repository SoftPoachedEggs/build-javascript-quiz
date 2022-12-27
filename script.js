
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


const startButton = document.querySelector('#startButton');
const timeDisplay = document.querySelector('#timer');
const question = document.querySelector('#questionDisplayText');
const choices = Array.from(document.querySelectorAll('#optionButton'));

const beginSection = document.querySelector("#beginSection");
const questionDisplay = document.querySelector("#questionDisplay");
const finalScoreSection = document.querySelector("#finalScoreSection");
const highScoreDisplaySection = document.querySelector("#highScoreDisplaySection");




//Hide inactive sections
const hideSections = () => {
    beginSection.setAttribute('hidden', true);
    questionDisplay.setAttribute('hidden', true);
    finalScoreSection.setAttribute('hidden', true);
    highScoreDisplaySection.setAttribute('hidden', true);
    // change to correct item. display when first question is answered resultDiv.style.display = "none"
}


//on click clear display, populate first question and initialize timer.
startButton.addEventListener("click", startQuiz);


//timer countdown
function countdown() {
    timer--;
    displayTimer();
    if (timer < 1) {
      endQuiz();
    }
  }

//display timer
function displayTimer() {
    timeDisplay.textContent = timer;
  }

//quiz question objects

const quizQuestionBank = [
    { 
        question: "Commonly used data types DO NOT include:",
        choice1: "strings", 
        choice2: "booleans", 
        choice3: "alerts",
        choice4: "numbers",
        answer:  "alerts",
    },
    { 
        question: "Commonly used data types DO NOT include:",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer:  "all of the above",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choice1: "commas", 
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parentheses",
        answer: "quotes", 
    },
     {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript", 
        choice2: "terminal/bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: "console.log", 
    },
    {
        question: "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        choice1: "break", 
        choice2: "stop",
        choice3: "halt",
        choice4: "exit",
        answer: "break", 
    },
]




const maxQuestions = 4

function startQuiz(){
    hideSections();
    activeQuestion = 0

    //initialize timer and start countdown
   
    timer = quizQuestionBank.length * 10;
    timerInterval = setInterval(countdown, 1000);
    questionDisplay.removeAttribute('hidden');

    questionAppear();
    displayTimer();
}




const questionAppear = () => {
    let question = quizQuestionBank[activeQuestion];
    let answerResults = document.querySelector('answerResultsText')

    let questionDisplayText  = document.querySelector('#questionDisplayText');
    questionDisplayText.textContent = question.question;

    optionButton0.innerHTML = question.choice1
    optionButton1.innerHTML = question.choice2
    optionButton2.innerHTML = question.choice3
    optionButton3.innerHTML = question.choice4
}
optionButton0.addEventListener('click', evaluateGuess());
optionButton1.addEventListener('click', evaluateGuess());
optionButton2.addEventListener('click', evaluateGuess());
optionButton3.addEventListener('click', evaluateGuess());

const evaluateGuess = () => {

    if (optionButton0.innerHTML === quizQuestionBank[activeQuestion].answer){
        return answerResults.textContent = "Correct!"
        activeQuestion++;
        console.log("correct");
    } else {
        return answerResults.textContent = "Incorrect.";
        activeQuestion++;
    }

}

  /*
    //increment current question by 1
    currentQuestion++;
    //if we have not run out of questions then display next question, else end quiz
    if (currentQuestion < quizQuestionBank.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
*/