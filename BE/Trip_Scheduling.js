const {db, app} = require('./firebase_Init')
const {getDocs, query, where, addDoc, deleteDoc, setDoc, doc, collection} = require("firebase/firestore");

class Trip_Schedule {


    async add(driver_Id, car_Id, subDriver_Id, cus_Id, cus_Phone_Num,
              start_Dest, end_Dest, start_Time, end_Time, customer_ID, customer_Phone_Number, revenue) {
        try {
            const docRef = doc(collection(db, "Trip").withConverter(tripConverter));
            await setDoc(docRef, new Trip(driver_Id, car_Id, subDriver_Id, cus_Id, cus_Phone_Num,
                start_Dest, end_Dest, start_Time, end_Time, customer_ID, customer_Phone_Number, revenue));
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

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
        const snap = getDocs(q);
        (await snap).forEach((temp => {
            deleteDoc(doc(db, "Trip", temp.id));
            // console.log("deleted ", doc.id)
        }))
        console.log("test delete car")

    }

}

class Trip {

    constructor(driver_Id, car_ID, subDriver_Id, cus_Id, cus_Phone_Num,
                start_Dest, end_Dest, start_Time, end_Time, customer_ID, customer_Phone_Number, revenue) {
        this.driver_Id = driver_Id;
        this.subDriver_Id = subDriver_Id;
        this.car_Id = car_ID;
        this.cus_Id = cus_Id;
        this.cus_Phone_Num = cus_Phone_Num;
        this.start_Dest = start_Dest;
        this.end_Dest = end_Dest, this.start_Time = start_Time;
        this.end_Time = end_Time;
        this.customer_ID = customer_ID;
        this.revenue = revenue;
    }

    toString() {
        return this.driver_Id + ', ' + this.subDriver_Id + ', ' + this.car_Id, this.cus_Id, this.cus_Phone_Num;
    }
}

const tripConverter = {
    toFirestore: (Trip) => {
        return {
            driver_Id: Trip.driver_Id,
            subDriver_Id: Trip.subDriver_Id,
            car_Id: Trip.car_Id,
            cus_Id: Trip.cus_Id,
            cus_Phone_Num: Trip.cus_Phone_Num
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Trip(data.driver_Id, data.subDriver_Id, data.car_Id, data.cus_Id, data.cus_Phone_Num);
    }
}

const trip = new Trip_Schedule()
console.log("Testing...")
// trip.add("driver", "car", "sub", "cus", "13555");
trip.add("driver", "car", "sub", "cqus", "13555",
    "start", "end", "time_start", "time_end",
    "cus_name", "cus_phone", "revenue")
// trip.del("car")