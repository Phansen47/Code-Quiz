// Questions for game with one of four answers
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "High-level Text Management Language", "Hyper Transfer Markup Language", "Hypertext Text Markup Language"],
        correctAnswer: "Hypertext Markup Language"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "variable"],
        correctAnswer: "var"
    },
    {
        question: "What is the result of the expression '2' + 2 in JavaScript?",
        options: ["4", "22", "TypeError", "2 + 2"],
        correctAnswer: "22"
    },
    {
        question: "Which function is used to print something to the console in JavaScript?",
        options: ["print()", "console.log()", "write()", "display()"],
        correctAnswer: "console.log()"
    },
    {
        question: "What is the purpose of the 'if' statement in JavaScript?",
        options: ["To loop through an array", "To declare a function", "To make a decision based on a condition", "To define a class"],
        correctAnswer: "To make a decision based on a condition"
    },
    {
        question: "Which data type is used for a single character in JavaScript?",
        options: ["char", "string", "character", "letter"],
        correctAnswer: "string"
    },
    {
        question: "What is the result of 10 % 3 in JavaScript?",
        options: ["3", "1", "0.3", "10"],
        correctAnswer: "1"
    },
    {
        question: "Which JavaScript library is commonly used for building user interfaces?",
        options: ["React", "Angular", "Vue", "jQuery"],
        correctAnswer: "React"
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "Which HTML element is used to link an external JavaScript file?",
        options: ["<script>", "<js>", "<javascript>", "<link>"],
        correctAnswer: "<script>"
    },
];

// DOM elements
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-button");
const quizQuestions = document.getElementById("quiz-questions");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");
const timer = document.getElementById("timer");
const timeLeft = document.getElementById("time-left");
const highScoresButton = document.getElementById("high-scores-button");
const highScoresContainer = document.getElementById("high-scores-container");
const highScoresList = document.getElementById("high-scores-list");

//Intializing game
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 90;
let timerInterval;

// Function to start the quiz
function startQuiz() {
    startButton.style.display = "none";
    quizQuestions.style.display = "block";
    loadQuestion(currentQuestionIndex);
    startTimer();
}

// Function to load and display a question
function loadQuestion(index) {
    if (index >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[index];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ""; // Clear previous options

    const optionsButtonContainer = document.createElement("div"); // Create a container for options

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-button";
        button.addEventListener("click", () => {
            checkAnswer(option, currentQuestion.correctAnswer);
        });
        optionsButtonContainer.appendChild(button); // Append each option button to the container
    });

    optionsContainer.appendChild(optionsButtonContainer); // Append the options container to the options container
}

// Function to check the answer and update the score
function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        timeRemaining -= 10; // Subtract 10 seconds for incorrect answers
    }

    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        timeLeft.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

// Function to end the game
function endGame() {
    clearInterval(timerInterval);
    quizQuestions.style.display = "none";
    gameOverScreen.style.display = "block";
    finalScore.textContent = score;
}

// Event listeners
startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);

// Function to save the score to session storage
function saveScore() {
    const initials = initialsInput.value;
    
    if (initials.trim() === "") {
        alert("Please enter your initials.");
        return;
    }

    const scoreData = {
        initials: initials,
        score: score
    };

    // Check if there are existing scores in session storage
    let highScores = JSON.parse(sessionStorage.getItem("highScores")) || [];

    // Add the new score to the array
    highScores.push(scoreData);

    // Sort the scores in descending order (highest score first)
    highScores.sort((a, b) => b.score - a.score);

    // Limit the number of high scores (e.g., keep the top 10)
    const maxHighScores = 10;
    highScores = highScores.slice(0, maxHighScores);

    // Save the updated high scores back to session storage
    sessionStorage.setItem("highScores", JSON.stringify(highScores));

    // Reset the initials input field
    initialsInput.value = "";

    showHighScores()
}

// Event listener for "View High Scores" button
highScoresButton.addEventListener("click", showHighScores);

// Function to show high scores
function showHighScores() {
    // Hide other elements and show the high scores container
    quizContainer.style.display = "none";
    gameOverScreen.style.display = "none";
    highScoresContainer.style.display = "block";

    // Get high scores from session storage
    const highScores = JSON.parse(sessionStorage.getItem("highScores")) || [];

    // Clear existing high scores list
    highScoresList.innerHTML = "";

    // Display each high score as a list item
    highScores.forEach((scoreData, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${scoreData.initials}: ${scoreData.score}`;
        highScoresList.appendChild(listItem);
    });
}

const backToGameButton = document.getElementById("back-to-game");

// Event listener for "Back to Game" button
backToGameButton.addEventListener("click", backToGame);

// Function to return to the game view
function backToGame() {
    highScoresContainer.style.display = "none";
    quizContainer.style.display = "block";

    // Reset or initialize the game state
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 60; // Reset the timer to its initial value

    // Start the quiz again
    st();
}

const playAgainButton = document.getElementById("play-again");

// Event listener for "Play Again" button
playAgainButton.addEventListener("click", playAgain);

// Function to start the quiz again
function playAgain() {
    // Reset the game state (score, timer, etc.) as needed
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 60; // Reset the timer to its initial value

    // Clear the initials input field
    initialsInput.value = "";

    // Hide the game over screen and show the quiz container
    gameOverScreen.style.display = "none";
    quizContainer.style.display = "block";

    // Start the quiz
    startQuiz();
}