let welcome_back = document.querySelector("#welcome_back");
const username = localStorage.getItem("username");
document.addEventListener("DOMContentLoaded", () => {
  if (username !== undefined) {
    welcome_back.style.color = "green";
    welcome_back.textContent = `Welcome back ${username}`;
  }
});
