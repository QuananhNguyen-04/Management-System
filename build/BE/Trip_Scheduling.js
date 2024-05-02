import { db } from './firebase_Init.js';
import { DefaultsearchVehicle, searchVehicle } from './fetchVehicle.js';
import { driver } from './Driver.js';
import { searchDriver, searchDriverByInfo } from './driverDatabaseInteract.js';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAFfRTomodMfFqP3JkXPTu34W3vYnKwtmY",
//     authDomain: "nha-xe-hanh-phuc-ltnc.firebaseapp.com",
//     databaseURL: "https://nha-xe-hanh-phuc-ltnc-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "nha-xe-hanh-phuc-ltnc",
//     storageBucket: "nha-xe-hanh-phuc-ltnc.appspot.com",
//     messagingSenderId: "260388398077",
//     appId: "1:260388398077:web:2d2149e08a20947333af94",
//     measurementId: "G-ZF1G64YNDE"
// };

// // Initialize Firebase
// var app;
// let analytics;
// let firestore;
// if (firebaseConfig?.projectId) {
//     // Initialize Firebase
//     app = initializeApp(firebaseConfig);

//     // ERROR: window is not defined (cookies or similar), analytics is not supported
//     if (app.name && typeof window !== 'undefined') {
//         analytics = getAnalytics(app);
//     }
// }

// const db = getFirestore(app);


import { and, or, getCountFromServer, getDoc, getDocs, query, where, addDoc, deleteDoc, setDoc, doc, collection }
    from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { driver_wrapper } from './Driver_Wrapper.js';

class Trip_Schedule {
    async sup_Add(car_id, start, des) {
        let money = trip_Money(start, des, 1.0);
        if (car_id.type == "Truck") {
            if (car_id.k == 1) {
                money += 23456678 // Điều kiện
            }
        } else if (car_id.type == "Coach") {
            money -= 1000000
        } else if (car_id.type == "Container") {
            money += 500000
        }

    }

    async getSize() {
        const coll = collection(db, "Trip");
        const snapshot = await getCountFromServer(coll);
        console.log('count: ', snapshot.data().count);
    }

    //Delete function search_bien_so_xe
    // async search_bien_so_xe(search) {
    //     const q = await query(collection(db, "vehicles"),
    //         and(where('status', '==', 'on')),
    //         where('bxs', '==', search));
    //     const temp = await getDocs(q)
    //     const q1 = await query(collection(db, "Trip"),
    //         where("car_Id", '==', temp.forEach(doc => doc.id))
    //     )
    //     temp.forEach(tmp => {
    //
    //     })
    // }

    async add(driver_Id, car_Id, subDriver_Id, cus_Id, cus_Phone_Num,
        start_Dest, end_Dest, start_Time, end_Time, customer_Phone_Number, revenue) {
        try {
            const docRef = doc(collection(db, "Trip"));
            console.log(docRef);
            var temp = new Trip(driver_Id, car_Id, subDriver_Id, cus_Id, cus_Phone_Num,
                start_Dest, end_Dest, start_Time, end_Time, customer_Phone_Number, revenue);
            temp = tripConverter.toFirestore(temp);
            await setDoc(docRef, temp);

            const wrap = new driver_wrapper();
            const updateDr = async function(id) {
                try {
                    var drdata = await searchDriverByInfo("id", id);
                    console.log("🚀 ~ file: Trip_Scheduling.js:94 ~ drdata:", drdata[0].data());
                    var dr = new driver();
                    
                    dr.assign(drdata[0].data());
                    console.log("🚀 ~ updateDriver ~ dr:", dr)
                    let newd = dr.copy();
                    let doc = await searchDriver(newd);
        
                    newd.status = 1;
                    console.log("🚀 -----------------------------------------------🚀");
                    console.log("🚀 ~ file: Trip_Scheduling.js:100 ~ newd:", newd);
                    console.log("🚀 -----------------------------------------------🚀");
                    
                    let result = await wrap.edit(doc, newd);
                    console.log("🚀 ~ file: Trip_Scheduling.js:101 ~ result:", result);
                    return result;
                } catch (error) {
                    console.log("🚀 --------------------------------------------------------------------------------🚀");
                    console.log("🚀 ~~ file: Trip_Scheduling.js:102 ~~ Trip_Schedule ~~ updateDr ~~ error:", error);
                    console.log("🚀 --------------------------------------------------------------------------------🚀");
                    
                }
            }
            let result = await updateDr(driver_Id);
            if (result == null) {
                console.log("🚀 ~~ file: Trip_Scheduling.js:102 ~~ Trip_Schedule ~~ buggging nuulll:", result);
            }
            result = await updateDr(subDriver_Id);
            if (result == null) {
                console.log("🚀 ~~ file: Trip_Scheduling.js:115 ~~ Trip_Schedule ~~ result:", result);
            }
            result = await searchVehicle("control_Plate", car_Id);
            if (result != null) {
                console.log("🚀 ~~ file: Trip_Scheduling.js:119 ~~ Trip_Schedule ~~ result:", result[0]);
            }
            // ToDo: wait for Drivers
            //  updateDoc(doc(db, "users", driver_Id), {
            //     status: "has_Trip"
            // });
            // updateDoc(doc(db, "users", subDriver_Id), {
            //     status: "has_Trip"
            // });
            // updateDoc(doc(db, "car", car_Id), {
            //     status: "has_Trip"
            // });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    async search(search_info) {
        const q = await query(collection(db, "Trip"),
            or(where('driver_Id', '==', search_info),
                where('car_Id', '==', search_info),
                where('subDriver_Id', '==', search_info),
                where('cus_Id', '==', search_info),
                where('cus_Phone_Num', '==', search_info),
                where('cus_Phone_Num', '==', search_info),
                where('cus_Phone_Num', '==', search_info),
                where('cus_Phone_Num', '==', search_info),
                where('cus_Phone_Num', '==', search_info),
            ));
        const temp = await getDocs(q)
        temp.forEach((tmp) => {
            console.log(tmp.data())
        })
    }

    async del(ID) {
        const collectionRef = collection(db, 'Trip')
        const q = await query(collectionRef,
            where('car_Id', '==', ID)
            // where('car_Id', '==', ID)
            // where('subDriver_Id', '==', ID)

        );
        const q1 = await query(collectionRef,
            where('driver_Id', '==', ID)
        );
        // await deleteDoc(doc(db, "Trip",));
        const snap = await getDocs(q);
        snap.forEach((temp => {
            deleteDoc(doc(db, "Trip", temp.id));
            // console.log("deleted ", doc.id)
        }))
        console.log("test delete car")
        
    }
    async release(carID) {
        const updateDr = async function(id) {
            try {
                var drdata = await searchDriverByInfo("id", id);
                console.log("🚀 ~ file: Trip_Scheduling.js:94 ~ drdata:", drdata[0].data());
                var dr = new driver();
                
                dr.assign(drdata[0].data());
                console.log("🚀 ~ updateDriver ~ dr:", dr)
                let newd = dr.copy();
                let doc = await searchDriver(newd);
    
                newd.status = 2;
                console.log("🚀 ~ file: Trip_Scheduling.js:100 ~ newd:", newd);
                
                let result = await wrap.edit(doc, newd);
                console.log("🚀 ~ file: Trip_Scheduling.js:101 ~ result:", result);
                return result;
            } catch (error) {
                console.log("🚀 ~~ file: Trip_Scheduling.js:102 ~~ Trip_Schedule ~~ updateDr ~~ error:", error);
                
            }
        }
        const colRef = collection(db, "Trip");
        const q = await query(colRef, 
            where("car_Id", "==", carID)
        );
        const snap = await getDocs(q);
        
        snap.forEach(doc => {
            updateDr(doc.driver_Id);
            updateDr(doc.subDriver_Id);
        })
    }
    async show_All() {
        var list = []
        console.log("Show_all")
        const q = query(collection(db, "Trip"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            list.push(doc.data());
            // getDoc(db, "vehicles", doc.id);
        });
    }
    async show(infoType, value) {
        var list = []
        const colRef = collection(db, "Trip");
        var q = colRef;
        if (Array.isArray(infoType)) {
            for (let i = 0; i < infoType.length; ++i) {
                q = query(q, where(infoType[i], "==", value[i]));
            }
        }
        else {
            q = query(q, where(infoType, "==", value));
        }
        q = await getDocs(q);
        if (q == null) return "Not found";
        q.forEach(doc => {
            list.push(doc.data());
        })
        return list;
    }
}

class Trip {

    constructor(driver_Id, car_ID, subDriver_Id, cus_Id, cus_Phone_Num,
        start_Dest, end_Dest, start_Time, end_Time, revenue) {
        this.driver_Id = driver_Id;
        this.subDriver_Id = subDriver_Id;
        this.car_Id = car_ID;
        this.cus_Id = cus_Id;
        this.cus_Phone_Num = cus_Phone_Num;
        this.start_Dest = start_Dest;
        this.end_Dest = end_Dest;
        this.start_Time = start_Time;
        this.end_Time = end_Time;
        this.revenue = revenue;
    }

    toString() {
        return this.driver_Id + ', ' + this.subDriver_Id + ', ' + this.car_Id + ', ' + this.cus_Id + ', ' + this.cus_Phone_Num
            + ', ' + this.start_Dest + ', ' + this.end_Dest + ', ' + this.start_Time + ', ' + this.end_Time + ', ' + this.revenue;

    }
}

const tripConverter = {
    toFirestore: (Trip) => {
        console.log("🚀 ~~ file: Trip_Scheduling.js:180 ~~ Trip:", Trip);
        return {
            driver_Id: Trip.driver_Id,
            subDriver_Id: Trip.subDriver_Id,
            car_Id: Trip.car_Id,
            cus_Id: Trip.cus_Id,
            cus_Phone_Num: Trip.cus_Phone_Num,
            start_Dest: Trip.start_Dest,
            end_Dest: Trip.end_Dest,
            start_Time: Trip.start_Time,
            end_Time: Trip.end_Time,
            revenue: Trip.revenue
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Trip(data.driver_Id, data.subDriver_Id, data.car_Id, data.cus_Id, data.cus_Phone_Num,
            data.start_Dest, data.end_Dest, data.start_Time, data.end_Time, data.revenue);
    }
}

const trip = new Trip_Schedule()

function trip_Money(start, des, coef) {
    let money = 0;
    if (start == "HN" && des == "HCM" || start == "HCM" && des == "HN") {
        money = 2_000_000;
    } else if (start == "HN" && des == "DN" || start == "DN" && des == "HN") {
        money = 1_500_000;
    } else if (start == "HCM" && des == "DN" || start == "DN" && des == "HCM") {
        money = 1_800_000;
    } else if (start == "HCM" && des == "VT" || start == "VT" && des == "HCM") {
        money = 1_000_000;
    } else if (start == "DN" && des == "VT" || start == "VT" && des == "DN") {
        money = 1_200_000;
    } else if (start == "HN" && des == "VT" || start == "VT" && des == "HN") {
        money = 1_800_000;
    }
    else if (start == "HCM") {
        money = Math.round(Math.random() * (8 - 2) + 2) * 1_000_000;
    }
    else if (start == "HN") {
        money = Math.round(Math.random() * (7 - 3) + 3) * 1_000_000;
    }
    else {
        money = Math.round(Math.random() * (10 - 6) + 6) * 1_000_000;
    }
    money = money * Math.abs(coef);
    money = parseInt(money / 1000) * 1000;
    return money;
}

// console.log("Testing...")
// trip.show_All()
// trip.add("driverId", "car", "sub", "cus_id(name)", "13555",
//     "start", "end", "time_start", "time_end",
//     "cus_phone", "revenue")
// trip.del("car")
// trip.getSize()
// trip.search("car")
// trip.search_bien_so_xe("1221")

export { Trip_Schedule, Trip, trip_Money }