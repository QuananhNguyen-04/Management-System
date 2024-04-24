import {db, auth, createUserWithEmailAndPassword, setDoc, getDoc, doc } from './firebase_Init.js'
// import  from './firebase_Init.js'

export async function sign_Up(username, email, password) {
    console.log("In login sign up function")

    

    try {
        // Đăng ký tài khoản người dùng bằng Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userRef = doc(db, 'users', username);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return "This name has been used, try another.";
        }

        // Lưu thông tin người dùng vào Firestore
        await setDoc(doc(db, 'users', user.uid), {
            username: username,
            email: email,
        });

        console.log('Đăng ký thành công:', user);
        return true;
    } catch (error) {
        // Xử lý lỗi đăng ký
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Lỗi đăng ký:', errorMessage);
        return error;
    }
}
