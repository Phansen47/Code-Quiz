const questions = [
    {
        question: "test pick 1",
        options: ["1", "2", "3", "4"],
        correctAnswer: "1"
    },
    {
        question: "test pick 2",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2"
    },
];

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

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 60;
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
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            checkAnswer(option, currentQuestion.correctAnswer);
        });
        optionsContainer.appendChild(button);
    });
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

// Function to save the score (you can implement this as needed)
function saveScore() {
    const initials = initialsInput.value;
}
