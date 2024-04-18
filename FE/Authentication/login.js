// import sign_In from "../../BE/Login.js";
import { sign_In } from "../../BE/Login.js";

// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");
// validation form login

btnLogin.addEventListener("click", async (e) => {
      e.preventDefault();
    // checkConnect()
    // testing();
    console.log("goigoi")
    if (inputUsername.value === "" || inputPassword.value === "") {
        alert("Please do not leave it blank");
    } else {
        const user = JSON.parse(localStorage.getItem(inputUsername.value));
        const status = await sign_In(inputUsername.value, inputPassword.value);
        if (status === true) {
            // localStorage.setItem("loggedInUser", inputUsername.value);
            window.location.href = "../index.html";
        } else {
            alert("Login failed: " +  status);
        }
    }
});