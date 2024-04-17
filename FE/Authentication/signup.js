// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputEmailRegister = document.querySelector(".input-signup-email");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const inputConfirmPasswordRegister = document.querySelector(".input-signup-confirmpassword");
const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputUsernameRegister.value;
  const password = inputPasswordRegister.value;
  // Kiểm tra xem tên người dùng có nhiều hơn 8 ký tự không
  if (username.length < 8) {
    alert("Username must be at least 8 characters long.");
    return;
  }

  // Kiểm tra xem mật khẩu có nhiều hơn 8 ký tự và chứa ít nhất một chữ và một số không
  if (password.length < 8 || !(/[a-zA-Z]/.test(password) && /[0-9]/.test(password))) {
    alert("Password must be at least 8 characters long and contain at least one letter and one number.");
    return;
  }
  
  // Kiểm tra xác nhận mật khẩu
  if (password !== inputConfirmPasswordRegister.value) {
    alert("Passwords do not match.");
    return;
  }
  
  // Kiểm tra xem tên người dùng đã được đăng ký trước đó hay chưa
  if (localStorage.getItem(username)) {
    alert("Username already exists. Please choose another username.");
    return; // Dừng lại nếu tên người dùng đã tồn tại
  }
  if (
    inputUsernameRegister.value === "" ||
    inputEmailRegister.value === "" ||
    inputPasswordRegister.value === "" ||
    inputConfirmPasswordRegister.value === ""
  ) {
    alert("Please do not leave it blank");
  } else if (!inputEmailRegister.value.endsWith("nxhp@gmail.com")) {
    alert("Please enter a valid Gmail address.");
  } else if (inputPasswordRegister.value !== inputConfirmPasswordRegister.value) {
    alert("Please enter a valid password")
  } else {
    // array user
    const user = {
      username: inputUsernameRegister.value,
      email: inputEmailRegister.value,
      password: inputPasswordRegister.value,
      // confirmpassword: inputConfirmPasswordRegister.value, //k cần
    };
    let json = JSON.stringify(user);
    localStorage.setItem(username, json);
    alert("Register success");
    window.location.href = "login.html";
  }
});