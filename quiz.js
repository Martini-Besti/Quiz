const questions = [
  {
    question: "Does a 🍌 float in water?",
    possibleAnswers: ["yes", "no"],
    correctAnswer: "no",
  },
  {
    question: "Does a sponge 🧽 float in water?",
    possibleAnswers: ["yes", "no"],
    correctAnswer: "yes",
  },
  {
    question: "Does dry pasta 🍝 float in water?",
    possibleAnswers: ["yes", "no"],
    correctAnswer: "no",
  },
  {
    question: "Does a pipe cleaner float in water?",
    possibleAnswers: ["yes", "no"],
    correctAnswer: "no",
  },
  {
    question: "Does a ✏️ float in water?",
    possibleAnswers: ["yes", "no"],
    correctAnswer: "yes",
  },
];

const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
const feedbackContainer = document.getElementById("feedbackContainer");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");

let currentQuestionIndex = 0;
let score = 0; // Initialize score variable

function startQuiz() {
  score = 0; // Reset score when the quiz starts
  currentQuestionIndex = 0;
  document.getElementById("introduction").style.display = "none";
  quizContainer.style.display = "flex"; // Show the quiz container
  handleQuestion(currentQuestionIndex);
}

function handleQuestion(index) {
  // Update progress bar
  quizProgress.innerHTML = questions
    .map((_, i) => `<span class="${i <= index ? "seen" : ""}"></span>`)
    .join("");

  // Display current question
  questionContainer.innerHTML = `<p>${questions[index].question}</p>`;
  answerContainer.innerHTML = ""; // Clear previous buttons

  // Create and append "Yes" and "No" buttons
  questions[index].possibleAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(answer)); // Check answer on click
    answerContainer.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Provide feedback based on the answer
  feedbackContainer.innerHTML =
    selectedAnswer === correctAnswer
      ? "<p>Correct!</p>"
      : `<p>Wrong! Correct answer: ${correctAnswer}</p>`;

  // Increment score for correct answers
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  // Disable buttons after answer selection
  document.querySelectorAll(".answer-btn").forEach((button) => {
    button.disabled = true;
  });

  // Show the "Next" button
  document.getElementById("next-btn").style.display = "inline-block"; // Show Next button
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    handleQuestion(currentQuestionIndex); // Load next question
    feedbackContainer.innerHTML = ""; // Clear previous feedback
    document.getElementById("next-btn").style.display = "none"; // Hide "Next" button until next question
  } else {
    showResult(); // End quiz if it's the last question
  }
}

function showResult() {
  // Display final feedback
  feedbackContainer.innerHTML = "<p></p>";
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  // Display the score
  document.getElementById(
    "score"
  ).textContent = `You scored ${score} out of ${questions.length}!`;
}

function hideFooterButton() {
  const footerButton = document.getElementById("first-button");
  footerButton.style.display = "none"; // Hide the button
}

function restartQuiz() {
  // Ensure the results container is hidden
  resultContainer.style.display = "none";

  // Ensure the quiz container is visible
  quizContainer.style.display = "flex";

  // Reset feedback, progress, and state
  feedbackContainer.innerHTML = ""; // Clear feedback
  quizProgress.innerHTML = ""; // Clear progress bar

  // Reset question index and score
  currentQuestionIndex = 0;
  score = 0;

  // Start the quiz again
  handleQuestion(currentQuestionIndex);
}
