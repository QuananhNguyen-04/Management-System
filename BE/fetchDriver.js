const {isExisted} = require("./isExisted");
const {initializeApp} = require("firebase/app");
const {getDocs, getDoc, setDoc, doc, getFirestore, collection, query, where} = require("firebase/firestore");


const firebaseConfig = {
    apiKey: "AIzaSyAFfRTomodMfFqP3JkXPTu34W3vYnKwtmY",
    authDomain: "nha-xe-hanh-phuc-ltnc.firebaseapp.com",
    databaseURL: "https://nha-xe-hanh-phuc-ltnc-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "nha-xe-hanh-phuc-ltnc",
    storageBucket: "nha-xe-hanh-phuc-ltnc.appspot.com",
    messagingSenderId: "260388398077",
    appId: "1:260388398077:web:2d2149e08a20947333af94",
    measurementId: "G-ZF1G64YNDE"
};

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

async function fetchDriverList(driverList)
{
    try
    {
        const driverRef=collection(db,'driver');
        const driverWrapper=await getDocs(driverRef);
        driverWrapper.forEach((driverDoc) => {
            const driverData=driverDoc.data();
            driverList[driverData.id]=driverData;
            //console.log(driverData);
        });
        
        //console.log(driverList);
        return true;
    }
    catch (error)
    {
        console.error('Error fetching driver list: ',error);
        return false;
    }
}

async function editDriver(documentId, value)
{
    try
    {
        const driverRef=doc(collection(db,'driver'),documentId);
        value.license.expiry='N/A';
        value.license=Object.assign({},value.license);
        value.recentTrip=Object.assign({},value.recentTrip);
        const newDriverData=Object.assign({},value);
        await setDoc(driverRef, newDriverData);
    }
    catch(error)
    {
        console.log('Error pushing driver: ',error);
    }
}
async function pushNewDriver(driverData) 
{
    try 
    {
        const driverCollectionRef = collection(db, 'driver');
        const newDriverRef = doc(driverCollectionRef);
        console.log("before:\n",driverData);
        driverData.license.expiry='N/A';
        driverData.license=Object.assign({},driverData.license);
        driverData.recentTrip=Object.assign({},driverData.recentTrip);
        const newDriverData=Object.assign({},driverData);
        await setDoc(newDriverRef, newDriverData);
        console.log('New driver pushed successfully:', driverData);
    } 
    catch (error) 
    {
        console.error('Error pushing new driver: ', error);
    }
}

async function searchDriver(driver)
{
    try
    {
        let temp=await searchDriverByInfo('id',driver.id);
        //console.log('Temp: ',temp);
        //console.log('Search direct Done');
        //console.log(temp);
        if (!isExisted(temp)) return 'Not found';
        else return driver.id;
    }
    catch (error)
    {
        console.log('Error searching direct driver ',error);
    }
}

async function searchDriverByInfo(infoType, value)
{
    try
    {
        const documentCollectionRef = collection(db,'driver');
        /*
        - infoType = 'id' || 'efficiency' || 'workingTime' || 'yearsOfExp' || 'status' : stay unchanged
        - infoType = 'recentTrip' : ='recentTrip.id';
        - infoType = 'license' : ='license.id';
        */
        if(infoType == 'recentTrip') infoType = 'recentTrip.id';
        else
            if(infoType == 'license') infoType = 'license.id';
            else
                {if(infoType != 'id' && infoType != 'efficiency' && infoType != 'workingTime' && infoType != 'yearsOfExp' && infoType != 'status') 
                {
                    console.log('Invalid info type');
                    return null;
                }}
        //console.log('infoType done');
        const q=query(documentCollectionRef, where(infoType, '==', value));
        //console.log('q done.');
        //console.log(q);
        let qSnapshot = await getDocs(q);
        //console.log('qSnapshot done.');
        if(qSnapshot.empty) 
        {
            console.log('Not found.');
            return 'Not found';
        }
        else 
        {
            console.log('Found.');
            return qSnapshot.docs;
        }
    }
    catch(error)
    {
        //console.log('something wrong in searchbyinfo.');
        console.log('Error searching driver: ',error);
        //return null;
    }
}

async function deleteDriver(documentId)
{
    try
    {
        const documentCollectionRef = collection (db, 'driver');
        const documentRef = await getDoc(documentCollectionRef,documentId);
        await deleteDoc(documentRef);
    }
    catch (error)
    {
        console.log('Error deleting driver: ',error);
    }
}
module.exports={searchDriverByInfo,fetchDriverList,editDriver,pushNewDriver,deleteDriver,searchDriver};

