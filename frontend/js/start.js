let welcome_back = document.querySelector("#welcome_back");
const username = localStorage.getItem("username");
document.addEventListener("DOMContentLoaded", () => {
  if (username !== undefined) {
    welcome_back.style.opacity = "1";
    welcome_back.style.color = "green";
    welcome_back.textContent = `Welcome back ${username}`;
  }
});

let logOut_button = document.querySelector("#logOut_button");

logOut_button.addEventListener("click", () => {
  welcome_back.style.opacity = "0";
  username = undefined;
});
