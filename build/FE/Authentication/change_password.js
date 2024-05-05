import { update } from "../../BE/Login.js";
import { Warning, Success, Error } from "../alertbox.js";
// validation form  and  user local storage
const inputUsername = document.querySelector(".input-login-username");
const inputEmail = document.querySelector(".input-login-email");
const inputPassword = document.querySelector(".input-login-password");
const inputNewPassword = document.querySelector(".input-login-newpassword");
const inputConfirmPassword = document.querySelector(".input-login-confirmpassword");
const btnChangePassword = document.querySelector(".login__signInButton");

// validation form  and  user local storage

btnChangePassword.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = inputUsername.value;
    const newPassword = inputNewPassword.value;
    // Kiểm tra xem mật khẩu mới có nhiều hơn 8 ký tự và chứa ít nhất một chữ và một số không
    if (newPassword.length < 8 || !(/[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword))) {
        Error("Mật khẩu phải có 8 ký tự và chứa ít nhất một Chữ và Số");
        return;
    }

    // Kiểm tra xác nhận mật khẩu mới
    if (newPassword !== inputConfirmPassword.value) {
        Error("Mật khẩu không đúng.");
        return;
    }

    if (
        inputUsername.value === "" ||
        // inputEmail.value === "" ||
        // inputPassword.value === "" ||
        inputNewPassword.value === "" ||
        inputConfirmPassword.value === ""
    ) {
        Warning();
    }
    else {
        const status = await update(username, newPassword);
        if (
            status === true
        ) {
            Success("Thay đổi thành công");
            window.location.href = "../index.html";
        } else {
            Error(status);
        }
    }
});