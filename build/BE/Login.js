
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from './firebase_Init.js';
// Khởi tạo Firebase
// import { signInWithEmailAndPassword } from 'firebase/auth';

export function testing() {
    console.log("Testing!");
}

export async function sign_In(username, password) {
    console.log("In login signin function")

    // const username = document.querySelector.username.value;
    // const password = document.querySelector.password.value;
    // Đăng nhập bằng Firebase Authentication
    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);

        // Đăng nhập thành công
        const user = userCredential.user;
        console.log('Đăng nhập thành công:', user);
        // Lưu thông tin đăng nhập vào Local Storage nếu người dùng đã chọn "nhớ mật khẩu"
        /* if (rememberMeCheckbox.checked) {
         localStorage.setItem('loggedInUser', JSON.stringify({ username, password }));
         }*/
        return true

    } catch (error) {
        // Xử lý lỗi đăng nhập
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Lỗi đăng nhập:', errorMessage);

        // // Hiển thị thông báo lỗi đến người dùng
        // const errorContainer = document.querySelector('.error-message');
        // errorContainer.textContent = errorMessage;
        return errorMessage;
    };
}

export async function forgot(email) {
    console.log("in forgot password");
    try {
        const userCredential = await sendPasswordResetEmail(auth, email);
        console.log('Email khôi phục mật khẩu đã được gửi thành công!');
        return true

    } catch (error) {
        // Xử lý lỗi
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Lỗi gửi email khôi phục mật khẩu:', errorMessage);
        return errorMessage;
    };
}

export async function update(username, password) {
    const user = auth.currentUser;
    try {
        const userCredential = await updatePassword(user, password);
        console.log("Change successfully");
        return true;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Update Error: ", errorMessage)
        return errorMessage;
    }
}