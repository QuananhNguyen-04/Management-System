//! How to connect to firebase and using the database

1) Khi deploy KHÔNG thực hiện "firebase init", chỉ gõ "firebase deploy" để depploy lên public
2) Hạn chế sử dụng file firebase_Init, để sử dụng chỉ cần
const {db, app} = require('./firebase_Init')
là được, có vài hàm mẫu để ví dụ
3) Sau khi deploy nhớ restart trang web lại
4) lệnh 'firebase' CHỈ chạy được trên Terminal không chạy được trên Powershell vì lý do bảo mật gì đó của nó
