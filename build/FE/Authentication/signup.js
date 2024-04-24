import { sign_Up } from "../../BE/sign_Up.js";
// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputEmailRegister = document.querySelector(".input-signup-email");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const inputConfirmPasswordRegister = document.querySelector(".input-signup-confirmpassword");
const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage
function validateEmail(email) {
    // Regular expression for a valid email address
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email);
}

btnRegister.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = inputUsernameRegister.value;
    const email = inputEmailRegister.value;
    const password = inputPasswordRegister.value;
    const confirmpassword = inputConfirmPasswordRegister.value;
    // Kiểm tra xem tên người dùng có nhiều hơn 8 ký tự không
    
    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmpassword === ""
    ) {
        alert("Please do not leave it blank");
        return;
    }
    if (username.length < 8) {
        alert("Username must be at least 8 characters long.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    // Kiểm tra xem mật khẩu có nhiều hơn 8 ký tự và chứa ít nhất một chữ và một số không
    if (password.length < 8 || !(/[a-zA-Z]/.test(password) && /[0-9]/.test(password))) {
        alert("Password must be at least 8 characters long and contain at least one letter and one number.");
        return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmpassword) {
        alert("Passwords do not match.");
        return;
    }

    const status = await sign_Up(username, email, password)
    if (status === true) {
        // // array user
        // const user = {
        //     username: inputUsernameRegister.value,
        //     email: inputEmailRegister.value,
        //     password: inputPasswordRegister.value,
        //     // confirmpassword: inputConfirmPasswordRegister.value, //k cần
        // };
        window.location.href = "./login.html";
    }
    else {
        alert("Register failed: " + status)
        return;
    }
})



// btnRegister.addEventListener("click", (e) => {
//     e.preventDefault();
//     const username = inputUsernameRegister.value;
//     const password = inputPasswordRegister.value;
// });