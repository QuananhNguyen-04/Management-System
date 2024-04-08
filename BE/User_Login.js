
async function validate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(username, password);
      const user = userCredential.user;
  
      if (user) {
        alert("Validation successful!");
        
        window.location.href = "login.html"; // chuyển hướng người dùng đến trang user login
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Error signing in. Please try again.");
    }
  }
  
  // Function để kiểm tra và xử lý form trước khi đăng ký người dùng
  function formValidate(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("pass").value;
    const confirmPassword = document.getElementById("cnfrpass").value;
  
    // Kiểm tra các điều kiện hợp lệ trước khi đăng ký
    if (username.length >= 30) {
      alert("Error: Person name should be less than 30 characters.");
      return false;
    }
  
    const phone = document.getElementById("mobile").value;
    if (isNaN(phone) || phone.length !== 10) {
      alert("Error: Phone/Mobile number should be a 10-digit number.");
      return false;
    }
  
    const drivingLicense = document.getElementById("dril").value;
    if (isNaN(drivingLicense) || drivingLicense.length !== 8) {
      alert("Error: Driving license ID should be an 8-digit number.");
      return false;
    }
  
    if (password !== confirmPassword) {
      alert("Error: Your password and confirmation password do not match.");
      return false;
    }
  
    if (password.length < 8) {
      alert("Error: Password must be at least eight characters long.");
      return false;
    }
  
    const numbers = /[0-9]/g;
    if (!password.match(numbers)) {
      alert("Error: Password must contain at least one number (0-9).");
      return false;
    }
  
    const lowerCaseLetters = /[a-z]/g;
    if (!password.match(lowerCaseLetters)) {
      alert("Error: Password must contain at least one lowercase letter (a-z).");
      return false;
    }
  
    const upperCaseLetters = /[A-Z]/g;
    if (!password.match(upperCaseLetters)) {
      alert("Error: Password must contain at least one uppercase letter (A-Z).");
      return false;
    }
  
    // Nếu các điều kiện đều hợp lệ, thực hiện đăng ký người dùng vào Firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then((userCredential) => {
        alert(`Welcome ${username}, you have been added as a new user.`);
        // Redirect to user dashboard or desired page upon successful registration
        window.location.href = "./user_dashboard.html";
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        alert("Error creating user. Please try again.");
      });
  
    return true;
  }
  