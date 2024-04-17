//import information from another file
//Create class for maintenance information
class maintenance_info{
    constructor(car_ID, date, maintenance_time){
        this.car_ID = car_ID;
        this.update(date, maintenance_time);
    }

    //maintenance_info method
    assign_Driver(driver_ID){
        this.driver_ID = driver_ID;
    }
    alert(){
        console.log("Maintenance for vehicle ID: " + this.car_ID);
    }
    update(Date, maintenance_time){
        this.date = Date;
        this.maintenance_time = maintenance_time;
    }
}

//Observer pattern for maintenance alert
class maintenance_alert{
    constructor(vehicle_list){
        this.observers = [];
        this.list = vehicle_list;
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
        for(let i in this.list){
            if(i.date >= current_time) this.Alert_List(i);
            else this.NonAlert_List(i);
        }
        this.observers.forEach(observer => observer.alert_Maintenance());
    }
}


//Exporting the classes
export {maintenance_info, maintenance_alert};