const leaderboard = [
  { name: "Alice", score: 9 },
  { name: "Bob", score: 8 },
  { name: "Charlie", score: 7 }
];

const list = document.getElementById('leaderboard');
leaderboard.forEach(player => {
  const li = document.createElement('li');
  li.textContent = `${player.name}: ${player.score}`;
  list.appendChild(li);
});