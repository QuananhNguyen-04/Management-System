// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");
import checkConnect from "../../BE/Login.js"
// validation form login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  checkConnect();
  return;
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("Please do not leave it blank");
  } else {
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      localStorage.setItem("loggedInUser", inputUsername.value);
      alert("Login success");
      window.location.href = "index.html";
    } else {
      alert("Login failed");
    }
  }
});