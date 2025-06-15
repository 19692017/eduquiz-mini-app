const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get("subject");
const username = localStorage.getItem("eduquiz_username") || "Guest";

fetch("public/data/quiz_questions.json")
  .then(res => res.json())
  .then(data => {
    const questions = data[subject] || [];
    let current = 0;
    let score = 0;

    const h1 = document.querySelector("h1");
    function showQuestion() {
      if (current >= questions.length) {
        h1.innerHTML = `${username}, your score is ${score}/${questions.length}`;
        saveScore();
        return;
      }
      const q = questions[current];
      h1.innerHTML = `<p>${q.question}</p>`;
      h1.innerHTML += q.options.map((opt, i) =>
        `<button onclick="answer(${i})">${opt}</button>`).join("<br>");
    }

    window.answer = function (i) {
      if (i === questions[current].answer) score++;
      current++;
      showQuestion();
    }

    function saveScore() {
      const scores = JSON.parse(localStorage.getItem("eduquiz_scores")) || [];
      scores.push({ name: username, subject, score });
      localStorage.setItem("eduquiz_scores", JSON.stringify(scores));
    }

    showQuestion();
  });
