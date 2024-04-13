//import information from another file
import {generateID, Vehicle_Type, VehicleStatus} from './Extra_function.js';
import {maintenance_info} from './Maintainance.js';

//Create parent vehicle class
class vehicle{
    //Factory method pattern to create vehicle object
    vehicleRegister(control_Plate, VehicleType, weight, fuel, capacity, speciality,
 weight, height, length, max_Load){
        this.car_ID = generateID();
        this.control_Plate = control_Plate;
        this.VehicleType = VehicleType;
        if(this.VehicleType == Vehicle_Type.Truck)
            this.vehicle = new Truck(weight, fuel);
        else if(this.VehicleType == Vehicle_Type.Coach)
            this.vehicle = new Coach(capacity, speciality);
        else if(this.VehicleType == Vehicle_Type.Container)
            this.vehicle = new Container(weight, height, length, max_Load);
        this.status = VehicleStatus.ACTIVE;
        this.recent_Trip = null;
        this.maintenance = null;
        return this.vehicle;
    }
    //vehicle method
    vehicles_Info(){
        if(this.VehicleType == VehicleType.Truck)
            return "ID: " + this.car_ID + "\n" +
                   "Control Plate: " + this.control_Plate + "\n" +
                   "Vehicle Type: " + this.VehicleType + "\n" +
                   "Weight: " + this.vehicle.weight + "\n" +
                   "Fuel: " + this.vehicle.fuel + "\n" +
                   "Status: " + this.status;
        else if(this.VehicleType == VehicleType.Coach)
            return "ID: " + this.car_ID + "\n" +
                   "Control Plate: " + this.control_Plate + "\n" +
                   "Vehicle Type: " + this.VehicleType + "\n" +
                   "Capacity: " + this.vehicle.capacity + "\n" +
                   "Speciality: " + this.vehicle.speciality + "\n" +
                   "Status: " + this.status;
        else if(this.VehicleType == VehicleType.Container)
            return "ID: " + this.car_ID + "\n" +
                   "Control Plate: " + this.control_Plate + "\n" +
                   "Vehicle Type: " + this.VehicleType + "\n" +
                   "Weight: " + this.vehicle.weight + "\n" +
                   "Height: " + this.vehicle.height + "\n" +
                   "Length: " + this.vehicle.length + "\n" +
                   "Max Load: " + this.vehicle.max_Load + "\n" +
                   "Status: " + this.status;
    }
    setting_Maintenance(Date, maintenance_time, driver_ID, Driver_Object){
        this.maintenance = new maintenance_info(this.car_ID, Date, maintenance_time);
        this.maintenance.assign_Driver(driver_ID, Driver_Object);
    }
    alert_Maintenance(){
        this.status = VehicleStatus.MAINTENANCE;
        this.maintenance.alert();
    }
    update_Info(Trip_Info_Object, crashed){
        if(this.maintenance == null && crashed == false){
            this.status = VehicleStatus.ACTIVE;
        } else if(crashed == true){
            this.status = VehicleStatus.UNAVAILABLE;
        } else {
            const current_time = new Date();
            if(this.maintenance.date + this.maintenance.maintenance_time < current_time){
                this.status = VehicleStatus.ACTIVE;
                this.maintenance = null;
            }
        }
        if(this.recent_Trip != null){
            this.recent_Trip = Trip_Info_Object;
        }
    }
}

//Create child classes for vehicle
class Truck extends vehicle{
    constructor(weight, fuel){
        this.weight = weight;
        this.fuel = fuel;
    }
}
class Coach extends vehicle{
    constructor(capacity, speciality){
        this.capacity = capacity;
        this.speciality = speciality;
    }
}
class Container extends vehicle{
    constructor(weight, height, length, max_Load){
        this.weight = weight;
        this.height = height;
        this.length = length;
        this.max_Load = max_Load;
    }
}

//export the classes
export {vehicle, Truck, Coach, Container};

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
