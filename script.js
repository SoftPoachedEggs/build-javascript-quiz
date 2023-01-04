
/*

-Begin Prompt
    -Start Button
    -Instructions display
    -when start button clicked hide start section and display question section
    -needs highscore nav link to visit previous scores
-Question display
    -display qustion
        -questions are stored in array with key values pairs. 
        -use nested array to store choices.
        -one question at a time.
        -use loop to iterate through questions
        -Multiple Choice Buttons
        -previous answer results displayed after choice is clicked. 
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

const timeDisplay = document.querySelector('#timer');
const question = document.querySelector('#questionDisplayText');
const startButton = document.querySelector('#startButton');
const submitButton = document.querySelector("#submitButton");
const backToStart = document.querySelector("#backButton")
const clearButton = document.querySelector("#clearScores");
const answerButtons = document.querySelector("#answerButtons")

const scoreDisplay = document.querySelector("#score");
const textInput = document.querySelector("#initialBox")


const beginSection = document.querySelector("#beginSection");
const questionDisplay = document.querySelector("#questionDisplay");
const questionResult = document.querySelector("#answerResults-text")
const finalScoreDisplay = document.querySelector("#submitHighScoreSection");
const highScoreDisplaySection = document.querySelector("#highScoreDisplaySection");
const highScoreLink = document.querySelector("#highScoreLink");
const leaderboardLink = document.querySelector("#highScoreLink");

let hsList = document.querySelector("#highScoreList");

//Hide inactive sections
const hideSections = () => {
    beginSection.setAttribute('hidden', true);
    questionDisplay.setAttribute('hidden', true);
    finalScoreDisplay.setAttribute('hidden', true);
    highScoreDisplaySection.setAttribute('hidden', true);
    // change to correct item. display when first question is answered resultDiv.style.display = "none"
}

//timer countdown
const countdown = () => {
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
        question: "What is the correct way to write a JavaScript for loop?",
        choices: [
                "for (i = 0; i < 5; i++)",
                "for i = 1 to 5", 
                "for (i <= 5; i++)",
                "for (i = 0; i <= 5; i++)",
                ],
        answer: "for (i = 0; i < 5; i++)",
    },
    { 
        question: "What is the correct way to write a JavaScript function?",
        choices:[ 
                `function myFunction()`,
                `function = myFunction()`,
                `function: myFunction()`,
                "all of the above",
                ],
        answer:  `function myFunction()`,
    },
    {
        question: "How do you add a single line comment in JavaScript?",
        choices:[ 
                "// This is a comment", 
                "# This is a comment",
                "/* This is a comment */",
                "-- This is a comment"
                ],
        answer: "// This is a comment", 
    },
     {
        question: "What is the correct way to declare a variable in JavaScript?",
        choices:[ 
                `variable x;`, 
                `var x;`,
                `x = 5;`,
                `const x;`
                ],
        answer: "console.log", 
    },
    {
        question: "How do you create an array in JavaScript?",
        choices:[
                `array(1, 2, 3)`, 
                `[1, 2, 3]`,
                `{1, 2, 3}`,
                `array: [1, 2, 3]`,
                ],
        answer: "break", 
    },
]

//on click clear display, populate first question and initialize timer.

let startQuiz = () => {
    hideSections();
    activeQuestion = 0
    timer = 50;

    //initialize timer and start countdown
    timerInterval = setInterval(countdown, 1000);
    questionDisplay.removeAttribute('hidden');
    questionResult.textContent = "";

    quizDisplay();
    displayTimer();
}
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

//Compare the text content of the option button with the answer to the current question
const optionIsCorrect = (answerOptionButton) => {
  return answerOptionButton.textContent === quizQuestionBank[activeQuestion].answer;
}

//check if choice is truthy. If so, display correct. If not, decrement timer and display next question.
answerButtons.addEventListener("click", checkAnswer);function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  if (optionIsCorrect(optionButton)) {
    questionResult.textContent = "Correct!";
    console.log("correct");
  } else {
    questionResult.textContent = "Incorrect!";
    console.log("incorrect");
    decrementTimer();
    }

//increment active question if questions remain. Otherwise, call endquiz function to end quiz.
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

//end quiz function
const endQuiz = () => {
    hideSections();
    stopTimer();

    scoreDisplay.textContent = timer;
    finalScoreDisplay.removeAttribute('hidden');
}




//-------------highscore section-----------------
//function to save score as array key pair. 
const storeScore = (event) => {
  if (!textInput.value) {
    alert("Please enter your initials!");
    return;
  }
  event.preventDefault();

  let savedHighScore = {
    initials: textInput.value,
    score: timer,
  };
  saveToHighScoreList(savedHighScore);

  buildHighScoreList();
  hideSections();

  highScoreDisplaySection.removeAttribute("hidden");
}
submitButton.addEventListener("click", storeScore);

//updates the leaderboard stored in local storage
function saveToHighScoreList(savedHighScore) {
  let highScoreList = getHighScores();
  //append new leaderboard item to leaderboard array
  highScoreList.push(savedHighScore);
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}

//parse fron json and ret
const getHighScores = () => {
  let savedHighScores = localStorage.getItem("highScoreList");
  if (savedHighScores !== null) {
    let highScoreList = JSON.parse(savedHighScores);
    return highScoreList;
  } else {
    highScoreList = [];
  }
  return highScoreList;
}

//display highscore list 
const buildHighScoreList = () => {
  let sortedHighScores = sortHighScores();
  hsList.innerHTML = "";
  for (let i = 0; i < sortedHighScores.length; i++) {
    let highScoreEntry = sortedHighScores[i];
    let newListItem = document.createElement("li");
    newListItem.textContent = highScoreEntry.initials + "  " + highScoreEntry.score;
    hsList.append(newListItem);
  }
}
const sortHighScores = () => {
  let highScoreArray = getHighScores();
  if (!highScoreArray) {
    return;
  }
  highScoreArray.sort(function (a, b) {
    return b.score - a.score;
  });
  return highScoreArray;
}

//clear score function
const clearHighScores = () => {
  localStorage.clear();
  buildHighScoreList();
  console.log('clicked')
}
clearHighScore.addEventListener("click", clearHighScores);

//button function to bring back to start. 
const backToBeginning = () => {
    hideSections();
    beginSection.removeAttribute('hidden');
    timer = undefined;
    displayTimer();
    console.log("back2beginning clicked");
}
backToStart.addEventListener("click", backToBeginning);

//nav link to highscores
const navtoHighScores = () => {
    hideSections();
    highScoreDisplaySection.removeAttribute("hidden");
    timer = undefined;
    
    displayTimer();
    buildHighScoreList();
  }
  leaderboardLink.addEventListener("click", navtoHighScores)
  