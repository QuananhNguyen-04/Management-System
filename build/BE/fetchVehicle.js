//Import the firebase functions
import { isExisted } from "./ExtraFunction2.js";
import { db } from "./firebase_Init.js";
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
    const VehicleListRef = collection(db, "vehicles");
    const NewVehicleRef = doc(VehicleListRef);
    const NewVehicleData = Object.assign({}, Vehicle_data);
    console.log(NewVehicleData)
    // NewVehicleData.maintenance = maintenance_info;
    NewVehicleData.front_image = front_image;
    NewVehicleData.back_image = back_image;
    await setDoc(NewVehicleRef, NewVehicleData);
    console.log("check add");
    console.log("Vehicle added succesfully: ", NewVehicleData);
    return true;
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
        console.log("🚀 --------------------------------------------------------------------------------🚀");
        console.log("🚀 ~~ file: fetchVehicle.js:69 ~~ searchVehicle ~~ querySnapshot:", querySnapshot);
        console.log("🚀 --------------------------------------------------------------------------------🚀");
        if (querySnapshot.empty) return null;
        else return querySnapshot;
    } catch (e) {
        console.error("Error searching vehicle: ", e);
    }
}

async function DefaultsearchVehicle(VehicleData) {
    try {
        let temp = await searchVehicle('control_Plate', VehicleData.control_Plate);

        if (temp == null) return "Not found";
        console.log("Search Complete: ", temp);
        if (temp == null) return "Not found";
        if (isExisted(temp) != true) return 'Not found';

        else
            if (temp.size > 1) return false;
            else return temp;
        // temp.forEach((doc) => {
        //     console.log("WTF: ", doc.data());
        //     return doc.data();
        // });
    } catch (e) {
        console.error("Error searching vehicle: ", e);
    }
}

async function editVehicle(VehicleData_ID, Vehicle_newdata) {
    try {
        // if (!VehicleData_ID) {
        //     console.error("Invalid VehicleData_ID: ", VehicleData_ID);
        //     return;
        // }

        const VehicleListRef = collection(db, "vehicles");
        const VehicleRef = doc(VehicleListRef, VehicleData_ID);
        const NewVehicleData = Object.assign({}, Vehicle_newdata);

        let OldVehicleData = await getDoc(VehicleRef);
        if (OldVehicleData.exists()) {
            OldVehicleData = OldVehicleData.data();
            // NewVehicleData.maintenance = OldVehicleData.maintenance.toObject();
            NewVehicleData.front_image = OldVehicleData.front_image;
            NewVehicleData.back_image = OldVehicleData.back_image;
        }
        console.log("🚀 ~ file: fetchVehicle.js:111 ~ NewVehicleData:", NewVehicleData);
        await setDoc(VehicleRef, NewVehicleData);
        return true;
    } catch (e) {
        console.error("Error changing data of vehicle: ", e);
        return false;
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

export { addVehicle, deleteVehicle, searchVehicle, DefaultsearchVehicle, editVehicle, fetchVehicle };