const {db, app} = require('./firebase_Init')
const {
    or,
    getCountFromServer,
    getDoc,
    getDocs,
    query,
    where,
    addDoc,
    deleteDoc,
    setDoc,
    doc,
    collection
} = require("firebase/firestore");

class Trip_Schedule {


    async getSize() {
        const coll = collection(db, "Trip");
        const snapshot = await getCountFromServer(coll);
        console.log('count: ', snapshot.data().count);
    }

    async add(driver_Id, car_Id, subDriver_Id, cus_Id, cus_Phone_Num,
              start_Dest, end_Dest, start_Time, end_Time, customer_Phone_Number, revenue) {
        try {
            const docRef = doc(collection(db, "Trip").withConverter(tripConverter));
            await setDoc(docRef, new Trip(driver_Id, car_Id, subDriver_Id, cus_Id, cus_Phone_Num,
                start_Dest, end_Dest, start_Time, end_Time, customer_Phone_Number, revenue));
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

    async show_All() {
        console.log("Show_all")
        const q = query(collection(db, "Trip"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }

}

class Trip {

    constructor(driver_Id, car_ID, subDriver_Id, cus_Id, cus_Phone_Num,
                start_Dest, end_Dest, start_Time, end_Time, customer_Phone_Number, revenue) {
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

console.log("Testing...")
// trip.show_All()
trip.add("tamdeptrai", "car", "sub", "cus_id(name)", "13555",
    "start", "end", "time_start", "time_end",
    "cus_phone", "revenue")
trip.del("car")
// trip.getSize()
trip.search("sub")