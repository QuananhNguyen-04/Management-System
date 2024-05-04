//import information from another file
import { editVehicle } from "./fetchVehicle.js"
import { VehicleStatus } from "./Extra_function.js";
import { searchDriverByInfo } from "./driverDatabaseInteract.js";

//Function support for maintenance alert
function setting_Maintenance(vehicleData, driver_ID) {
    vehicleData.maintenance.assign_Driver(driver_ID);
}

async function alert_Maintenance(vehicleData) {
    vehicleData.status = VehicleStatus.MAINTENANCE;
    console.log("🚀 ~ file: Maintainance.js:12 ~ vehicleData:", vehicleData);
    var type = vehicleData.VehicleType;
    type = ((type == 1) ? "Truck" : type == 2 ? "Coach" : "Container") 
    let temp = await searchDriverByInfo(["tier", "status"], [type, 2]);
    if (temp == "Not found") {
        return;
    }
    console.log("🚀 ~ file: Maintainance.js:17 ~ temp:", temp);
    let newid = temp[0].data().id;
    if (vehicleData.maintenance.driver_ID == null) vehicleData.maintenance.driver_ID = newid;
    // vehicleData.maintenance.assign_Driver(123456);
    vehicleData.maintenance.alert();
}

//Create class for maintenance information
class maintenance_info{
    constructor(car_ID, driver_ID = null, date = new Date().setMonth(new Date().getMonth() + 2)){
        //Assign value for maintenance information - change a object into class temporary
        this.car_ID = car_ID;
        this.driver_ID = driver_ID;
        date = (date.seconds * 1000) + (date.nanoseconds / 1000000);
        this.date = new Date(date);  
        // this.date.setMonth(this.date.getMonth() + 6); //6 months 
        // this.date.setMinutes(this.date.getMinutes() + 1); //1 minute
        this.maintenance_time = "7 days"; //7 days
    }

    //maintenance_info method
    assign_Driver(driver_ID){

        this.driver_ID = driver_ID;
    }
    alert(){
        console.log("Maintenance for vehicle ID: " + this.car_ID);
        console.log("ID of driver take maintainance: " + this.driver_ID);
    }
    update(){
        console.log("Update method called");
        this.driver_ID = null;
        this.date = new Date();  //current date
        // this.date.setMonth(this.date.getMonth() + 6); //6 months 
        this.date.setMonth(this.date.getMonth() + 2); //2 months
    }
    toObject(){
        return {
            car_ID: this.car_ID,
            driver_ID: this.driver_ID,
            date: this.date,
            maintenance_time: this.maintenance_time
        };
    }
}

//Observer pattern for maintenance alert
class maintenance_alert{
    constructor(vehicle_list){
        this.observers = [];
        this.vehicle_list = vehicle_list;

    }
    
    //maintenance_alert method
    Alert_List(observer){
        this.observers.push(observer);
    }
    NonAlert_List(observer){
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }
    // notify(){
    //     this.observers.forEach(observer => observer.update());
    // }
    async reload(){
        const current_time = new Date();
        for(let vehicle of this.vehicle_list){
            if(vehicle.maintenance != null){
                // console.log(vehicle.maintenance);
                vehicle.maintenance = new maintenance_info(vehicle.car_ID, vehicle.maintenance.driver_ID, vehicle.maintenance.date);
                // console.log(vehicle.maintenance);
                // console.log(current_time);
                // console.log(current_time - vehicle.maintenance.date)
                if(vehicle.maintenance.date <= current_time && (current_time - vehicle.maintenance.date) <= (7 * 24 * 60 * 60 * 1000)){ 
                    this.Alert_List(vehicle);
                    console.log("Set Alert successfully")
                    console.log(vehicle.maintenance);
                } else {
                    this.NonAlert_List(vehicle);
                    console.log("Remove Alert successfully")
                    vehicle.status = VehicleStatus.UNAVAILABLE
                    if((current_time - vehicle.maintenance.date) >= (7 * 24 * 60 * 60 * 1000)){
                        console.log("Run update")
                        vehicle.maintenance.update();
                    }
                    console.log(vehicle.maintenance);
                    vehicle.maintenance = vehicle.maintenance.toObject();
                }
            }
        }
        console.log("Reload method called");
        this.observers.forEach(async function (observer) {
            await alert_Maintenance(observer); 
            observer.maintenance = observer.maintenance.toObject();
        });
    }
}

//Exporting the classes
export {maintenance_info, maintenance_alert};