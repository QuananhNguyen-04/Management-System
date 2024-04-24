import { forgot } from "../../BE/Login.js";
// validation form  and  user local storage
const inputUsername = document.querySelector(".input-signup-username");
const inputEmail = document.querySelector(".input-signup-email");
const inputNewPassword = document.querySelector(".input-signup-password");
const inputConfirmPassword = document.querySelector(".input-signup-confirmnewpassword");
const btnResetPassword = document.querySelector(".signup__signInButton");

btnResetPassword.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = inputUsername.value;
    const newPassword = inputNewPassword.value;
    const email = inputEmail.value;

    const status = await forgot(email);
    if (status !== true) {
        alert("Send Reset Password Failed" + status);
    }
    else {
        alert("succeed");
        window.location.href = "./login.html"
    }
});