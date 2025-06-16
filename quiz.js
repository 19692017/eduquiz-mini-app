let currentQuestionIndex = 0;
let questions = [];
const subject = new URLSearchParams(window.location.search).get('subject') || 'math';
document.getElementById('subject-title').textContent = subject.toUpperCase() + ' Quiz';

fetch(`public/data/quiz_questions.json`)
  .then(res => res.json())
  .then(data => {
    questions = data[subject] || [];
    showQuestion();
  });

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById('question').textContent = "Quiz completed!";
    document.getElementById('options').innerHTML = "";
    document.getElementById('next-btn').style.display = "none";
    return;
  }
  const q = questions[currentQuestionIndex];
  document.getElementById('question').textContent = q.question;
  const optionsList = document.getElementById('options');
  optionsList.innerHTML = "";
  q.options.forEach((opt, i) => {
    const li = document.createElement('li');
    li.textContent = opt;
    li.onclick = () => checkAnswer(i);
    optionsList.appendChild(li);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestionIndex].answer;
  const feedback = document.getElementById('feedback');
  feedback.textContent = selected === correct ? "✅ Correct!" : "❌ Wrong!";
}

document.getElementById('next-btn').onclick = () => {
  document.getElementById('feedback').textContent = "";
  currentQuestionIndex++;
  showQuestion();
};
