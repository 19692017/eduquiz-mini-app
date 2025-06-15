let questions = [];
let current = 0;
let score = 0;
const subject = new URLSearchParams(window.location.search).get("subject");

document.getElementById("subject-title").innerText = subject.toUpperCase();

fetch(`public/data/quiz_questions.json`)
  .then(res => res.json())
  .then(data => {
    questions = data[subject];
    showQuestion();
  });

function showQuestion() {
  const q = questions[current];
  document.getElementById("question-container").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      if (option === q.answer) score++;
      current++;
      if (current < questions.length) showQuestion();
      else {
        document.getElementById("question-container").innerText = "Finished!";
        optionsDiv.innerHTML = "";
        document.getElementById("score").innerText = `Your score: ${score}/${questions.length}`;
      }
    };
    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  if (current < questions.length) showQuestion();
}
