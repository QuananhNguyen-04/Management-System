// validation form  and  user local storage
const inputUsername = document.querySelector(".input-login-username");
const inputEmail = document.querySelector(".input-login-email");
const inputPassword = document.querySelector(".input-login-password");
const inputNewPassword = document.querySelector(".input-login-newpassword");
const inputConfirmPassword = document.querySelector(".input-login-confirmpassword");
const btnChangePassword  = document.querySelector(".login__signInButton");

// validation form  and  user local storage

btnChangePassword .addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputUsername.value;
  const newPassword = inputNewPassword.value;
  // Kiểm tra xem mật khẩu mới có nhiều hơn 8 ký tự và chứa ít nhất một chữ và một số không
  if (newPassword.length < 8 || !(/[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword))) {
    alert("New password must be at least 8 characters long and contain at least one letter and one number.");
    return;
  }
  
  // Kiểm tra xác nhận mật khẩu mới
  if (newPassword !== inputConfirmPassword.value) {
    alert("New passwords do not match.");
    return;
  }


  if (
    inputUsername.value === "" ||
    inputEmail.value === "" ||
    inputPassword.value === "" ||
    inputNewPassword.value === "" ||
    inputConfirmPassword.value === ""
  ) {
    alert("Please do not leave it blank");
  } else if (!inputEmail.value.endsWith("nxhp@gmail.com")) {
    alert("Please enter a valid Gmail address.");
  } else {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (
      loggedInUser === inputUsername.value &&
      user &&
      user.password === inputPassword.value &&
      inputNewPassword.value === inputConfirmPassword.value
    ) {
      user.password = inputNewPassword.value;
      localStorage.setItem(username, JSON.stringify(user));

      alert("Succeed");
      window.location.href = "index.html";
    } else {
      alert("Failed 1");
    }
  }
});