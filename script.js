function saveName() {
  const name = document.getElementById("username").value.trim();
  if (name) {
    localStorage.setItem("eduquiz_username", name);
    document.getElementById("subjectButtons").style.display = "block";
  } else {
    alert("Please enter your name.");
  }
}
