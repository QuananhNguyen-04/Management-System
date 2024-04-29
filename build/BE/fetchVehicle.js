//Import the firebase functions
import { isExisted } from "./ExtraFunction2.js";
import { db } from "./firebase_Init.js"
import { getDocs, getDoc, setDoc, doc, collection, deleteDoc, query, where, and, or } 
from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


// try {
//     const docRef = await addDoc(collection(db, "vehicles"), {
//         name: "Tokyo",
//         country: "Japan"
//     });
//     console.log("Document written with ID: ", docRef.id);
// } catch (e) {   
//     console.error("Error adding document: ", e);
// }

//functions to interact with data on firestore
async function addVehicle(Vehicle_data, front_image, back_image) {
    try {
        const VehicleListRef = collection(db, "vehicles");
        const NewVehicleRef = doc(VehicleListRef);
        const NewVehicleData = Object.assign({}, Vehicle_data);
        NewVehicleData.front_image = front_image;
        NewVehicleData.back_image = back_image;
        await setDoc(NewVehicleRef, NewVehicleData);
        console.log("Vehicle added succesfully: ", NewVehicleData);
    } catch (e) {   
        console.error("Error adding vehicle: ", e);
    }
}

async function deleteVehicle(VehicleData_ID) {
    try {
        const VehicleListRef = collection(db, "vehicles");
        const VehicleRef = await getDoc(VehicleListRef, VehicleData_ID);
        await deleteDoc(VehicleRef);
    } catch (e) {   
        console.error("Error deleting vehicle: ", e);
    }
}

async function searchVehicle(field, value) {
    console.log(field, value)
    try {
        const VehicleListRef = collection(db, "vehicles");
        /* if the field is car_ID, Control_Plate, VehicleType, status: Use default 
           if the field is recent_Trip: field = recent_Trip.id
        */
        if (field == 'recent_Trip') field = 'recent_Trip.id';
        // const VehicleData = await getDocs(VehicleListRef);
        // VehicleData.forEach((doc) => {
        //     if (doc.data()[field] == value) {
        //         console.log("Vehicle data: ", doc.data());
        //     }
        // });
        var q = VehicleListRef;
        
        if (Array.isArray(field)) {
            for (let i = 0; i < field.length; i++) {
                console.log("value: ", field[i], value[i])
                q = query(q, where(field[i], "==", value[i]));
            }
        }
        else {
            q = await query(VehicleListRef, where(field, '==', value));
        }
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return null;
        else return querySnapshot;
    } catch (e) {   
        console.error("Error searching vehicle: ", e);
    }
}

async function DefaultsearchVehicle(VehicleData) {
    try {
        let temp = await searchVehicle('control_Plate', VehicleData.control_Plate);
        if (isExisted(temp) != true) return 'Not found';
        else 
            if(temp.size > 1) return false;
            else temp.forEach((doc) => {
                console.log(doc);
                return doc.data();
            });
    } catch (e) {    
        console.error("Error searching vehicle: ", e);
    }
}

async function editVehicle(VehicleData_ID, Vehicle_newdata) {
    try {
        const VehicleListRef = collection(db, "vehicles");
        const VehicleRef = doc(VehicleListRef, VehicleData_ID);
        const NewVehicleData = Object.assign({}, Vehicle_newdata);
        let OldVehicleData = await getDoc(VehicleRef);
        if(OldVehicleData.exists()){
            OldVehicleData = OldVehicleData.data();
            NewVehicleData.front_image = OldVehicleData.front_image;
            NewVehicleData.back_image = OldVehicleData.back_image;
        }
        await setDoc(VehicleRef, NewVehicleData);
    } catch (e) {   
        console.error("Error changing data of vehicle: ", e);
    }
}

async function fetchVehicle(vehicle_list) {
    try {
        const VehicleListRef = collection(db, "vehicles");
        const VehicleWrapper = await getDocs(VehicleListRef);
        VehicleWrapper.forEach((doc) => {
            const VehicleData = doc.data();
            vehicle_list.push(VehicleData);
            // console.log("Vehicle data: ", VehicleData);
        });
        console.log("Vehicle list fetched succesfully: ", vehicle_list);
        return true;
    } catch (e) {   
        console.error("Error fetching vehicle list: ", e);
        return false;
    }
}

export {addVehicle, deleteVehicle, searchVehicle, DefaultsearchVehicle, editVehicle, fetchVehicle};