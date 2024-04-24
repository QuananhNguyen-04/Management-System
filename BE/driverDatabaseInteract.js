const {convertToObject} = require("./ExtraFunction");
const {isExisted} = require("./ExtraFunction2");
const {initializeApp} = require("firebase/app");
const {getDocs, getDoc, setDoc, doc, getFirestore, collection} = require("firebase/firestore");
const {driver} = require('./Driver');

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
            //console.log(driverDoc.data());
            driverList[driverDoc.data().id]=driverDoc;
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
        value.license=convertToObject(value.license)
        value.recentTrip=convertToObject(value.recentTrip);
        const newDriverData=convertToObject(value);
        await setDoc(driverRef, newDriverData);
    }
    catch(error)
    {
        console.log('Error editing driver: ',error);
    }
}
async function pushNewDriver(driverData) 
{
    try 
    {
        const driverCollectionRef = collection(db, 'driver');
        const newDriverRef = doc(driverCollectionRef);
        driverData.license.expiry='N/A';
        driverData.license=convertToObject(driverData.license);
        //console.log(driverData.license);
        driverData.recentTrip=convertToObject(driverData.recentTrip);
        let newDriverData=convertToObject(driverData);
        //console.log('Type of new object: ',typeof newDriverData);
        //console.log(newDriverData);
        //let newDriver=Object.assign({},newDriverData);
        await setDoc(newDriverRef, newDriverData);
        console.log('New driver pushed successfully:', driverData);
        return newDriverRef;
    } 
    catch (error) 
    {
        console.error('Error pushing new driver: ', error);
        return 'N/A';
    }
}

async function fetchDriver(documentId)
{
    try
    {
        const colRef=collection(db,'driver');
        const temp=await getDoc(colRef,documentId);
        //console.log('Temp: ',temp);
        //console.log('Search direct Done');
        //console.log(temp);
        if (!temp.exists) return 'Not found';
        else return temp;
    }
    catch (error)
    {
        console.log('Error searching direct driver ',error);
    }
}
async function searchDriver(_driver)
{
    try
    {
        let driverDoc='N/A';
        let temp=await searchDriverByInfo('id',_driver.id);
        console.log('Direct: ',temp);
        if(isExisted(temp)) 
        {
            temp.forEach(doc => { 
                driverDoc=doc;
            })
        }
        return driverDoc;
    }
    catch (error)
    {
        console.log('Error searching driver ',error);
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
        const variations = new RegExp('^'+value+'$','i');
        let q=await getDocs(documentCollectionRef);
        let docList=q.docs;
        let res=[];
        //console.log(docList);
        if(docList.size === 0) 
        {
            console.log('By info: Not found');
            return 'Not found';
        }
        for (const doc of docList)
        {
            const data=doc.data();
            if(data[infoType].match(variations)) res.push(doc);
        }
        //console.log('q done.');
        //console.log(q);
        //console.log('qSnapshot done.');
        if(res.length<1) 
        {
            console.log('By info: Not found.');
            return 'Not found';
        }
        else 
        {
            console.log('By info: Found.');
            return res;
        }
    }
    catch(error)
    {
        //console.log('something wrong in searchbyinfo.');
        console.log('Error searching driver info: ',error);
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


module.exports={searchDriverByInfo,fetchDriverList,editDriver,pushNewDriver,deleteDriver,searchDriver,fetchDriver};

