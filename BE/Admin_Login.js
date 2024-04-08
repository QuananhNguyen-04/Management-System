// Xử lý đăng nhập cho quản trị viên
async function adminLogin() {
  const username = document.querySelector(".input-login-username").value;
  const password = document.querySelector(".input-login-password").value;

  try {
    // Đăng nhập bằng Email và Password vào Firebase
    const userCredential = await firebase.auth().signInWithEmailAndPassword(username, password);
    const user = userCredential.user;

    // Kiểm tra xem người dùng có phải là admin không (vd: kiểm tra custom claims)
    if (user) {
      const isAdmin = await checkAdminStatus(user.uid);
      
      if (isAdmin) {
        // Đăng nhập thành công và là admin, chuyển hướng đến trang admin dashboard
        window.location.href = "./admin_dashboard.html";
      } else {
        // Không có quyền admin
        alert("You are not authorized as an admin.");
      }
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
    alert("Invalid credentials. Please try again.");
  }
}

// Kiểm tra vai trò của người dùng (ví dụ: sử dụng custom claims)
async function checkAdminStatus(userId) {
  // Tải thông tin người dùng từ Firestore
  const userDoc = await firebase.firestore().collection("users").doc(userId).get();

  // Kiểm tra custom claims để xác định vai trò admin
  const isAdmin = userDoc.data().isAdmin || false; // Assumption: isAdmin field exists in Firestore

  return isAdmin;
}
