let welcome_back = document.querySelector("#welcome_back");
let username = localStorage.getItem("username");
document.addEventListener("DOMContentLoaded", () => {
  if (username != -1) {
    welcome_back.style.opacity = "1";
    welcome_back.style.color = "green";
    welcome_back.textContent = `Welcome back ${username}`;
  } else {
    welcome_back.style.opacity = "0";
  }
});

let logOut_button = document.querySelector("#logOut_button");

logOut_button.addEventListener("click", () => {
  welcome_back.style.opacity = "0";
  localStorage.setItem("username", -1);
});
