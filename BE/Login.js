
const firebaseConfig = {
    apiKey: "AIzaSyAFfRTomodMfFqP3JkXPTu34W3vYnKwtmY",
    authDomain: "nha-xe-hanh-phuc-ltnc.firebaseapp.com",
    databaseURL:"https://nha-xe-hanh-phuc-ltnc-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "nha-xe-hanh-phuc-ltnc",
    storageBucket: "nha-xe-hanh-phuc-ltnc.appspot.com",
    messagingSenderId: "260388398077",
    appId: "1:260388398077:web:2d2149e08a20947333af94",
    measurementId: "G-ZF1G64YNDE"
};


// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.querySelector('form');
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
      const username = document.querySelector('.input-login-username').value;
      const password = document.querySelector('.input-login-password').value;
  
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
  
  
          // Sau khi đăng nhập thành công, bạn có thể thực hiện xử lý dữ liệu từ Firestore
          
          const userId = user.uid;
          const usersRef = firebase.firestore().collection('users').doc(userId);
  
          usersRef.get()
            .then((doc) => {
              if (doc.exists) {
                const userData = doc.data();
                console.log('Thông tin người dùng:', userData);
  
                // Redirect hoặc thực hiện các hành động khác sau khi đăng nhập thành công
                
                window.location.href = '';  // đưa tới tranh thuê xe, đưa đường dẫn html vào
              } else {
                console.log('Không tìm thấy thông tin người dùng');
              }
            })
            .catch((error) => {
              console.error('Lỗi khi truy xuất thông tin người dùng:', error);
            });
  
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
const logoutButton = document.getElementById('logout-button');
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
});