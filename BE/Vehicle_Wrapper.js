//import information from another file
import {Vehicle_Type, VehicleStatus} from './Extra_function.js';
import {vehicle} from './Vehicle.js';

//Create wrapper for list of vehicle information
class vehicles_wrapper{
    constructor(){
        this.vehicle_list = []
        this.vehicleInfo = new vehicle();
        this.size = 0;
    }
    //vehicle_wrapper method
    add(VehicleType, control_Plate, weight, fuel, capacity, speciality,
weight, height, length, max_Load){
        this.vehicle_list.push(this.vehicleInfo.vehicleRegister(control_Plate, VehicleType, weight, fuel,
 capacity, speciality, weight, height, length, max_Load));
        this.size++;
    }
    delete(car_ID){
        for(let i = 0; i < this.size; i++){
            if(this.vehicle_list[i].car_ID == car_ID){
                this.vehicle_list.splice(i, 1);
                this.size--;
                return;
            }
        }
    }
    search(control_Plate){
        for(let i in this.vehicle_list){
            if(i.control_Plate == control_Plate)
                return i.vehicles_Info();
        }
    }
    edit(VehicleType, control_Plate, weight, fuel, capacity, speciality,
weight, height, length, max_Load){
        for(let i in this.vehicle_list){
            if(i.control_Plate == control_Plate){
                if(i.VehicleType == Vehicle_Type.Truck){
                    i.vehicle.weight = weight;
                    i.vehicle.fuel = fuel;
                }
                else if(i.VehicleType == Vehicle_Type.Coach){
                    i.vehicle.capacity = capacity;
                    i.vehicle.speciality = speciality;
                }
                else if(i.VehicleType == Vehicle_Type.Container){
                    i.vehicle.weight = weight;
                    i.vehicle.height = height;
                    i.vehicle.length = length;
                    i.vehicle.max_Load = max_Load;
                }
            }
        }
    }
    active_List(){
        const active_list = [];
        for(let i in this.vehicle_list){
            if(i.status == VehicleStatus.ACTIVE)
                active_list.push(i.vehicles_Info());
        }
        return active_list;
    }
    maintenance_List(){
        const maintenance_list = [];
        for(let i in this.vehicle_list){
            if(i.status == VehicleStatus.MAINTENANCE)
                maintenance_list.push(i.vehicles_Info());
        }
        return maintenance_list;
    }
    unavailable_List(){
        const unavailable_list = [];
        for(let i in this.vehicle_list){
            if(i.status == VehicleStatus.UNAVAILABLE)
                unavailable_list.push(i.vehicles_Info());
        }
        return unavailable_list;
    }
}

//Export the class
export {vehicles_wrapper};