const Log = require('./log.js') // test thử từ log.js không quá quan trọng
const {db, app} = require('./firebase_Init') // import từ firebase_init
const {addDoc, collection} = require("firebase/firestore");

//!  ĐỌC README_FAKE.TXT để tiết kiệm time search gg hơn (chắc v) :Đ

//example functions
Log.info('The first log')

const temp = async function () {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}
temp()