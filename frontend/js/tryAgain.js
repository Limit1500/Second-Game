const score = localStorage.getItem("score");
const username = localStorage.getItem("username");
const password = localStorage.getItem("password");
const highScore = localStorage.getItem("highScore");
let score_p = document.querySelector("#score_p");
score_p.textContent = `Score: ${score}`;

if (score > highScore && username != -1) {
  fetch(`/users-addNewHighScore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      newHighScore: score,
    }),
  })
    .then((response) => {
      console.log(response.status);
      response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
