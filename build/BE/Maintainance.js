//import information from another file
import { editVehicle } from "./fetchVehicle.js"
import { alert_Maintenance } from "./Vehicle.js"
//Create class for maintenance information
class maintenance_info{
    constructor(car_ID, driver_ID = null, date = new Date().setMinutes(new Date().getMinutes() + 1)){
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
        this.date.setMinutes(this.date.getMinutes() + 10); //10 minutes
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
    constructor(vehicle_list, driver_available_list){
        this.observers = [];
        this.vehicle_list = vehicle_list;
        this.driver_list = driver_available_list;
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
    reload(){
        const current_time = new Date();
        for(let vehicle of this.vehicle_list){
            if(vehicle.maintenance != null){
                console.log(vehicle.maintenance);
                vehicle.maintenance = new maintenance_info(vehicle.car_ID, vehicle.maintenance.driver_ID, vehicle.maintenance.date);
                console.log(vehicle.maintenance);
                console.log(current_time);
                console.log(current_time - vehicle.maintenance.date)
                if(vehicle.maintenance.date <= current_time && (current_time - vehicle.maintenance.date) <= (2 * 60 * 60 * 1000)){ 
                    this.Alert_List(vehicle);
                    console.log("Set Alert successfully")
                    console.log(vehicle.maintenance);
                } else {
                    this.NonAlert_List(vehicle);
                    console.log("Remove Alert successfully")
                    if((current_time - vehicle.maintenance.date) >= (2 * 60 * 60 * 1000)){
                        console.log("Run update")
                        vehicle.maintenance.update();
                    }
                    console.log(vehicle.maintenance);
                    vehicle.maintenance = vehicle.maintenance.toObject();
                }
            }
        }
        console.log("Reload method called");
        this.observers.forEach(observer => {
            alert_Maintenance(observer, this.driver_list); 
            observer.maintenance = observer.maintenance.toObject();
        });
    }
}


//Exporting the classes
export {maintenance_info, maintenance_alert};