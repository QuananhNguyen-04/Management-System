import { db } from "./firebase_Init"; 
// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.querySelector('.login');
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
      const username = document.querySelector.username.value;
      const password = document.querySelector.password.value;
  
      // Đăng nhập bằng Firebase Authentication
      firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
          // Đăng nhập thành công
          const user = userCredential.user;
          console.log('Đăng nhập thành công:', user);
           // Lưu thông tin đăng nhập vào Local Storage nếu người dùng đã chọn "nhớ mật khẩu"
        if (rememberMeCheckbox.checked) {
        localStorage.setItem('loggedInUser', JSON.stringify({ username, password }));
        }
           
        })
        .catch((error) => {
          // Xử lý lỗi đăng nhập
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Lỗi đăng nhập:', errorMessage);
  
          // Hiển thị thông báo lỗi đến người dùng
          const errorContainer = document.querySelector('.error-message');
          errorContainer.textContent = errorMessage;
        });
    });
  });

// Xử lý sự kiện khi người dùng nhấn nút Đăng xuất
/*const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', async () => {
  try {
    await auth.signOut();
    // Xóa thông tin đăng nhập khỏi Local Storage
    localStorage.removeItem('loggedInUser');
    // Chuyển hướng đến trang Đăng nhập sau khi đăng xuất
    window.location.href = '/login.html';
  } catch (error) {
    console.error('Lỗi đăng xuất:', error.message);
    alert('Đăng xuất không thành công. Vui lòng thử lại!');
  }
}); */