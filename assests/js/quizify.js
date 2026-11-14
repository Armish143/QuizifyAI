



//api fetching
// quizify.js

// quizify.js

let questions = [];
let currentIndex = 0;
let score = 0;

const quizForm = document.getElementById("quiz-config-form");
const quizContainer = document.getElementById("quiz-container");

// Category map for Open Trivia DB
const categoryMap = {
  "general knowledge": 9,
  "books": 10,
  "film": 11,
  "music": 12,
  "science": 17,
  "computers": 18,
  "mathematics": 19,
  "sports": 21,
  "geography": 22,
  "history": 23,
  "politics": 24,
};

// Fetch quiz questions
async function fetchQuestions(topic, count) {
  try {
    const key = topic.toLowerCase().trim();
    const categoryId = categoryMap[key] || 9; // default = General Knowledge

    const url = `https://opentdb.com/api.php?amount=${count}&category=${categoryId}&type=multiple`;

    const res = await fetch(url);
    const data = await res.json();

    questions = data.results;
    currentIndex = 0;
    score = 0;

    if (questions.length > 0) {
      showQuestion();
    } else {
      quizContainer.innerHTML = `<p class="text-danger">No questions found for this topic.</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
    quizContainer.innerHTML = `<p class="text-danger">Something went wrong. Try again later.</p>`;
  }
}

// Show current question
function showQuestion() {
  const q = questions[currentIndex];
  if (!q) return;

  // Shuffle answers
  let answers = [...q.incorrect_answers, q.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  quizContainer.innerHTML = `
    <div class="card p-3">
      <h5>Q${currentIndex + 1}: ${q.question}</h5>
      <ul class="list-group mt-3">
        ${answers
          .map(
            (ans) => `
          <li class="list-group-item option" data-answer="${ans}">
            ${ans}
          </li>`
          )
          .join("")}
      </ul>
    </div>
  `;

  document.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => checkAnswer(btn.dataset.answer));
  });
}

// Check selected answer
function checkAnswer(selected) {
  const correct = questions[currentIndex].correct_answer;
  if (selected === correct) {
    score++;
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  quizContainer.innerHTML = `
    <div class="card p-4 text-center">
      <h3>Quiz Completed 🎉</h3>
      <p>Your Score: ${score} / ${questions.length}</p>
      <button class="btn btn-primary" onclick="restartQuiz()">Try Again</button>
    </div>
  `;
}

// Restart quiz
function restartQuiz() {
  quizContainer.innerHTML = "";
  quizForm.reset();
}

// Form submit
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value;
  const count = document.getElementById("count").value;

  if (topic) {
    fetchQuestions(topic, count);
  } else {
    alert("Please enter a quiz topic!");
  }
});
