// validation form  and  user local storage
const inputUsername = document.querySelector(".input-signup-username");
const inputEmail = document.querySelector(".input-signup-email");
const inputNewPassword = document.querySelector(".input-signup-password");
const inputConfirmPassword = document.querySelector(".input-signup-confirmnewpassword");
const btnResetPassword  = document.querySelector(".signup__signInButton");

btnResetPassword .addEventListener("click", (e) => {
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
    inputNewPassword.value === "" ||
    inputConfirmPassword.value === ""
  ) {
    alert("Please do not leave it blank");
  } else if (inputEmail.value !== "nxhp@gmail.com") {
    alert("Failed 1");
  } else if (inputNewPassword.value !== inputConfirmPassword.value){
    alert("Failed 2");
  } else {
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (
      user &&
      inputNewPassword.value === inputConfirmPassword.value
    ) {
      user.password = inputNewPassword.value;
      localStorage.setItem(username, JSON.stringify(user));

      alert("Succeed");
      window.location.href = "login.html";
    } else {
      alert("Failed 3");
    }
  }
});