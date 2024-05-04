
import { convertToObject } from "./ExtraFunction.js";;
import { isExisted } from "./ExtraFunction2.js";
import { getDocs, getDoc, setDoc, doc, collection, query, where }
    from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
import { driver } from './Driver.js';
import { db } from './firebase_Init.js'

async function fetchDriverList(driverList) {
    try {
        const driverRef = collection(db, 'driver');
        const driverWrapper = await getDocs(driverRef);
        driverWrapper.forEach((driverDoc) => {
            //console.log(driverDoc.data());
            driverList[driverDoc.data().id] = driverDoc;
            //console.log(driverData);
        });

        //console.log(driverList);
        return true;
    }
    catch (error) {
        console.error('Error fetching driver list: ', error);
        return false;
    }
}

async function editDriver(documentId, value) {
    try {
        const driverRef = doc(collection(db, 'driver'), documentId);
        //value.license.expiry='N/A';
        value.license = convertToObject(value.license)
        value.recentTrip = convertToObject(value.recentTrip);
        const newDriverData = convertToObject(value);
        await setDoc(driverRef, newDriverData);
    }
    catch (error) {
        console.log('Error editing driver: ', error);
    }
}
async function pushNewDriver(driverData) {
    try {
        const driverCollectionRef = collection(db, 'driver');
        const newDriverRef = doc(driverCollectionRef);
        //driverData.license.expiry='N/A';
        driverData.license = convertToObject(driverData.license);
        //console.log(driverData.license);
        driverData.recentTrip = convertToObject(driverData.recentTrip);
        let newDriverData = convertToObject(driverData);
        //console.log('Type of new object: ',typeof newDriverData);
        //console.log(newDriverData);
        //let newDriver=Object.assign({},newDriverData);
        await setDoc(newDriverRef, newDriverData);
        console.log('New driver pushed successfully:', driverData);
        return newDriverRef;
    }
    catch (error) {
        console.error('Error pushing new driver: ', error);
        return 'N/A';
    }
}

async function fetchDriver(documentId) {
    try {
        // const colRef = collection(db, 'driver');
        // console.log(documentId)
        const temp = await getDoc(doc(db, 'driver', documentId));
        // console.log("🚀 ~ file: driverDatabaseInteract.js:69 ~ temp:", temp);
        
        if (!temp.exists) return 'Not found';
        else return temp;
    }
    catch (error) {
        console.log('Error searching direct driver ', error);
        return "Not found";
    }
}
async function searchDriver(_driver)    //Type: driver
{
    try {
        let driverDoc = 'N/A';
        let temp = await searchDriverByInfo('id', _driver.id);
        console.log('Direct: ', temp);
        if (isExisted(temp)) {
            temp.forEach(doc => {
                driverDoc = doc;
            })
        }
        return driverDoc;
    }
    catch (error) {
        console.log('Error searching driver ', error);
    }
}
async function searchDriverByInfo(infoType, value) {
    const handleInfo = (infoType) => {
        if (infoType == 'recentTrip') infoType = 'recentTrip.id';
        else
        if (infoType == 'license') infoType = 'license.id';
        else if (infoType == 'tier') infoType = 'license.tier';
        else if (infoType != 'id' && infoType != 'efficiency' && infoType != 'workingTime' && infoType != 'yearsOfExp' && infoType != 'status') {
            console.log('Invalid info type');
            return null;
        }
        return infoType;
    }
    try {
        /*
        - infoType = 'id' || 'efficiency' || 'workingTime' || 'yearsOfExp' || 'status' : stay unchanged
        - infoType = 'recentTrip' : ='recentTrip.id';
        - infoType = 'license' : ='license.id';
        */
       //console.log('infoType done');
       // const variations = new RegExp('^' + value + '$', 'i');
        // console.log("🚀 ~ file: driverDatabaseInteract.js:94 ~ value:", value);
        // console.log("🚀 ~ file: driverDatabaseInteract.js:94 ~ infoType:", infoType);

        const documentCollectionRef = collection(db, 'driver');
        var q = documentCollectionRef;
        var type;
        let needLicense = false;
        let licenseInfoNeed = null;
        if (Array.isArray(infoType)) {
            for (let i = 0; i < infoType.length; ++i) {
                type = handleInfo(infoType[i]);
                var keyParts = type.split('.');
                if (keyParts[0] == "license") {
                    if (!needLicense) needLicense = true;
                    else {
                        let temp = licenseInfoNeed;
                        licenseInfoNeed = Array();
                        licenseInfoNeed.push(keyParts[1]);
                        continue;
                    }
                    licenseInfoNeed = keyParts[1];
                    continue;
                }
                q = query(q, where(type, "==", value[i]));
            }
        }
        else {
            type = handleInfo(infoType);

            var keyParts = type.split('.');
            // console.log("🚀 ~~ file: driverDatabaseInteract.js:139 ~~ searchDriverByInfo ~~ type:", keyParts);
            if (keyParts[0] == "license") {
                needLicense = true;
                licenseInfoNeed = keyParts[1];
            }
            else {
                
                // console.log("🚀 ~ file: driverDatabaseInteract.js:151 ~ value:", value);
                q = query(q, where(type, "==", value));
            }
        }
        q = await getDocs(q);
        console.log(q);
        // console.log("🚀 ~~ file: driverDatabaseInteract.js:144 ~~ searchDriverByInfo ~~ needLicense:", needLicense);
        // console.log("🚀 ~ file: driverDatabaseInteract.js:145 ~ licenseInfoNeed:", licenseInfoNeed);
        let docList = q.docs;
        // console.log("🚀 ~ file: driverDatabaseInteract.js:153 ~ docList:", docList);
        if (docList == null || docList.length === 0) {
            console.log('By info: Not found');
            return 'Not found';
        }
        let res = [];
        for (const doc of docList) {
            const data = doc.data();
            if (data.id == "N/A") continue;
            let currentValue;
            if (needLicense && !Array.isArray(licenseInfoNeed)) {
                currentValue = data["license"][licenseInfoNeed];
            }
            else {
                // console.log("HANDLE ERROR: multiple license info driverInteraction 164")
                res.push(doc);
                continue;
            }
            // console.log("🚀 ~ file: driverDatabaseInteract.js:180 ~ value:", value);
            // console.log("🚀 ~ file: driverDatabaseInteract.js:167 ~ currentValue:", currentValue);
            if (Array.isArray(value)) {
                if (value.includes(currentValue)) {
                    console.log("matching: ", doc.data());
                    res.push(doc);
                }
            }
            else {
                if (value == currentValue) {
                    console.log("matching: ", doc.data());
                    res.push(doc);
                }

            }
        }
        if (res.length < 1) {
            console.log('By info: Not found.');
            return 'Not found';
        }
        else {
            //for (const a of res) console.log(a.data());
            console.log('By info: Found.');
            return res;
        }
    }
    catch (error) {
        console.log('Error searching driver info: ', error);
    }

}

async function deleteDriver(documentId) {
    try {
        const documentCollectionRef = collection(db, 'driver');
        const documentRef = await getDoc(documentCollectionRef, documentId);
        await deleteDoc(documentRef);
    }
    catch (error) {
        console.log('Error deleting driver: ', error);
    }
}

async function pushFile(path, file, id, type) {
    try {
        // Upload the image to Firebase Storage

        const storage = getStorage();
        const storageRef = ref(storage);
        const fileName = path + id + '_' + type + '.' + file.name.split('.').pop();
        const imageRef = ref(storageRef, `images/${fileName}`); // Set the desired storage path

        await uploadBytes(imageRef, file);
        console.log('Image uploaded successfully.');

        // Retrieve the image URL from Firebase Storage
        const imageUrl = await getDownloadURL(imageRef);
        console.log('Image URL:', imageUrl);
        return imageUrl;
        // Store the image URL in a Firestore document
    } catch (error) {
        console.error('Error:', error);
        return 'N/A';
    }
}

export { searchDriverByInfo, fetchDriverList, editDriver, pushNewDriver, deleteDriver, searchDriver, fetchDriver, pushFile, getStorage, ref, getDownloadURL };
