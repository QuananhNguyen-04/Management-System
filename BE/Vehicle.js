//import information from another file
import { generateID, generateCoef, Vehicle_Type, VehicleStatus } from './Extra_function.js';
import { maintenance_info } from './Maintainance.js';

//Create parent vehicle class
class vehicle {
    //Factory method pattern to create vehicle object
    constructor(control_Plate) {
        this.car_ID = generateID();
        this.control_Plate = control_Plate;
        this.status = VehicleStatus.ACTIVE;
        this.recent_Trip = null;
        this.maintenance = null;
    }
    vehicleRegister(control_Plate, VehicleType, weight, fuel, capacity, speciality,
        height, length, max_Load) {
        if (VehicleType == Vehicle_Type.B2_Type)
            return new Truck(control_Plate, weight, fuel);    
        else if (VehicleType == Vehicle_Type.C_type)
            return new Coach(control_Plate, capacity, speciality);
        else if (VehicleType == Vehicle_Type.E_type)
            return new Container(control_Plate, weight, height, length, max_Load);
    }
    //vehicle method
    vehicles_Info() {
        if (this.VehicleType == Vehicle_Type.B2_Type)
            return "ID: " + this.car_ID + "\n" +
                "Control Plate: " + this.control_Plate + "\n" +
                "Vehicle Type: " + this.VehicleType + "\n" +
                "Weight: " + this.vehicle.weight + "\n" +
                "Fuel: " + this.vehicle.fuel + "\n" +
                "Status: " + this.status;
        else if (this.VehicleType == Vehicle_Type.C_type)
            return "ID: " + this.car_ID + "\n" +
                "Control Plate: " + this.control_Plate + "\n" +
                "Vehicle Type: " + this.VehicleType + "\n" +
                "Capacity: " + this.vehicle.capacity + "\n" +
                "Speciality: " + this.vehicle.speciality + "\n" +
                "Status: " + this.status;
        else if (this.VehicleType == Vehicle_Type.E_type)
            return "ID: " + this.car_ID + "\n" +
                "Control Plate: " + this.control_Plate + "\n" +
                "Vehicle Type: " + this.VehicleType + "\n" +
                "Weight: " + this.vehicle.weight + "\n" +
                "Height: " + this.vehicle.height + "\n" +
                "Length: " + this.vehicle.length + "\n" +
                "Max Load: " + this.vehicle.max_Load + "\n" +
                "Status: " + this.status;
    }
    setting_Maintenance(Date, maintenance_time, driver_ID, Driver_Object) {
        this.maintenance = new maintenance_info(this.car_ID, Date, maintenance_time);
        this.maintenance.assign_Driver(driver_ID, Driver_Object);
    }
    alert_Maintenance() {
        this.status = VehicleStatus.MAINTENANCE;
        this.maintenance.alert();
    }
    update_Info(Trip_Info_Object, crashed) {
        if (this.maintenance == null && crashed == false) {
            this.status = VehicleStatus.ACTIVE;
        } else if (crashed == true) {
            this.status = VehicleStatus.UNAVAILABLE;
        } else {
            const current_time = new Date();
            if (this.maintenance.date + this.maintenance.maintenance_time < current_time) {
                this.status = VehicleStatus.ACTIVE;
                this.maintenance = null;
            }
        }
        if (this.recent_Trip != null) {
            this.recent_Trip = Trip_Info_Object;
        }
    }
}

//Create child classes for vehicle
class Truck extends vehicle {
    constructor(control_Plate, weight, fuel) {
        super(control_Plate);   //Get control_plate from parent class
        this.VehicleType = Vehicle_Type.B2_Type;
        this.coef = generateCoef(weight, 1000);        //1000 is the min weight for truck and container. Unit: kg 
        this.weight = weight;
        this.fuel = fuel;
    }
}
class Coach extends vehicle {
    constructor(control_Plate, VehicleType, capacity, speciality) {
        super(control_Plate, VehicleType);      //Get control_plate from parent class
        this.VehicleType = Vehicle_Type.C_type;
        this.coef = generateCoef(capacity, 10);        //10 is the min capacity for coach. Unit: people
        this.capacity = capacity;
        this.speciality = speciality;
    }
}
class Container extends vehicle {
    constructor(control_Plate, VehicleType, weight, height, length, max_Load) {
        super(control_Plate, VehicleType);       //Get control_plate from parent class
        this.VehicleType = Vehicle_Type.E_type;
        this.coef = generateCoef(weight, 1000);        //1000 is the min weight for truck and container. Unit: kg
        this.weight = weight;
        this.height = height;
        this.length = length;
        this.max_Load = max_Load;
    }
}

//export the classes
export { vehicle, Truck, Coach, Container };

// Test communication between classes
// const vehicleList = new vehicles_wrapper();
// const maintenanceAlert = new maintenance_alert(vehicleList.vehicle_list);
// Test program to run Real-time for classes
// setInterval(function(){
//     maintenanceAlert.reload();
//     for(let i in vehicleList.vehicle_list){
//         if(Trip_Info_Object.end_Time < new Date()) vehicleList.vehicle_list[i].update_Info(Trip_Info_Object, false);
//         else if(crashed == true) vehicleList.vehicle_list[i].update_Info(null, true);
//         else vehicleList.vehicle_list[i].update_Info(null, false);
//     }
// }, 1000);
// Note: The above code is a test code to run the program in real-time to see whether the class function act normally.
//  The actual code will be different.
