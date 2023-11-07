let login_username = document.querySelector("#login_username");
let login_password = document.querySelector("#login_password");
let login_button = document.querySelector("#login_button");
let login_status = document.querySelector("#login_status");
let welcome_back = document.querySelector("#welcome_back");

let username = -1,
  password,
  highScore;

login_button.addEventListener("click", () => {
  fetch(`/users/${login_username.value}/${login_password.value}`)
    .then((response) => {
      if (response.status != 200) {
        login_status.style.color = "red";
        login_status.textContent = "User not found!";
      } else {
        login_status.style.color = "green";
        login_status.textContent = "User found!";
        return response.json();
      }
    })
    .then((data) => {
      username = data.username;
      password = data.password;
      highScore = data.highScore;
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("highScore", highScore);
    })
    .catch((error) => console.log(error));
});
