
import { convertToObject } from "./ExtraFunction.js";;
import { isExisted } from "./ExtraFunction2.js";
import { getDocs, getDoc, setDoc, doc, collection } 
from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { driver } from './Driver.js';
import { db } from './firebase_Init.js'

async function fetchDriverList(driverList, idList) {
    try {
        const driverRef = collection(db, 'driver');
        const driverWrapper = await getDocs(driverRef);
        driverWrapper.forEach((driverDoc) => {
            const driverData = driverDoc.data();
            driverList.push(driverData);
            idList.push(driverData.id);
            console.log(driverData);
        });

        console.log(driverList);
        console.log(idList);
        return true;
    }
    catch (error) {
        console.error('Error fetching driver list: ', error);
        return false;
    }
}

//fetchDriverList();

async function editDriver(documentId, value) {
    try {
        const driverRef = doc(collection(db, 'driver'), documentId);
        await setDoc(driverRef, value);
    }
    catch (error) {
        console.log('Error pushing driver: ', error);
    }
}
async function pushNewDriver(driverData) {
    try {
        const driverCollectionRef = collection(db, 'driver');
        const newDriverRef = doc(driverCollectionRef);
        const newDriverData = Object.assign({}, driverData);
        await setDoc(newDriverRef, newDriverData);
        console.log('New driver pushed successfully:', driverData);
        return newDriverRef;
    }
    catch (error) {
        console.error('Error pushing new driver: ', error);
    }
}

async function searchDriver(driver) {
    try {
        let temp = await searchDriverByInfo('id', driver.id);
        //console.log('Temp: ',temp);
        //console.log('Search direct Done');
        //console.log(temp);
        if (isExisted(temp) != true) return 'Not found';
        else
            if (temp.size > 1) return false;
            else temp.forEach((doc) => { return doc.data(); });
    }
    catch (error) {
        console.log('Error searching direct driver ', error);
    }
}

async function searchDriverByInfo(infoType, value) {
    try {
        const documentCollectionRef = collection(db, 'driver');
        /*
        - infoType = 'id' || 'efficiency' || 'workingTime' || 'yearsOfExp' || 'status' : stay unchanged
        - infoType = 'recentTrip' : ='recentTrip.id';
        - infoType = 'license' : ='license.id';
        */
        if (infoType == 'recentTrip') infoType = 'recentTrip.id';
        else
            if (infoType == 'license') infoType = 'license.id';
            else {
                if (infoType != 'id' && infoType != 'efficiency' && infoType != 'workingTime' && infoType != 'yearsOfExp' && infoType != 'status') {
                    console.log('Invalid info type');
                    return null;
                }
            }
        //console.log('infoType done');
        const q = query(documentCollectionRef, where(infoType, '==', value));
        //console.log('q done.');
        //console.log(q);
        let qSnapshot = await getDocs(q);
        //console.log('qSnapshot done.');
        if (qSnapshot.empty) {
            console.log('By info: Not found.');
            return 'Not found';
        }
        else {
            //console.log('Found.');
            return qSnapshot;
        }
    }
    catch (error) {
        //console.log('something wrong in searchbyinfo.');
        console.log('Error searching driver: ', error);
        //return null;
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


export { searchDriverByInfo, fetchDriverList, editDriver, pushNewDriver, deleteDriver, searchDriver };

