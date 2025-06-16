let currentQuestion = 0;
let score = 0;
let questions = [];
let subject = localStorage.getItem('selectedSubject') || 'math';

fetch('public/data/quiz_questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data[subject];
    loadQuestion();
  });

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question').textContent = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) score++;
  document.getElementById('score').textContent = `Score: ${score}`;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById('question').textContent = 'Quiz complete!';
    document.getElementById('options').innerHTML = '';
  }
}