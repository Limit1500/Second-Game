let signin_username = document.querySelector("#signin_username");
let signin_password = document.querySelector("#signin_password");
let signin_button = document.querySelector("#signin_button");
let signin_status = document.querySelector("#signin_status");

signin_button.addEventListener("click", () => {
  fetch(`/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: signin_username.value,
      password: signin_password.value,
    }),
  })
    .then((response) => {
      if (response.status != 200) {
        signin_status.style.color = "red";
        signin_status.textContent = "User already registered";
      } else {
        signin_status.style.color = "green";
        signin_status.textContent = "You have been registered";
      }
      response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
});
