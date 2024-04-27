//import information from another file
import { addVehicle, deleteVehicle, searchVehicle, DefaultsearchVehicle, editVehicle, fetchVehicle } from './fetchVehicle.js';
import { isExisted } from './ExtraFunction2.js'; //Use from driver-and-driver-wrapper branch
import { Vehicle_Type, VehicleStatus } from './Extra_function.js';
import { vehicle } from './Vehicle.js';

//Create wrapper for list of vehicle information
class vehicles_wrapper {
    constructor() {
        this.vehicle_list = []
        this.vehicleInfo = new vehicle();
        this.size = 0;

        if (fetchVehicle(this.vehicle_list)) {
            console.log('Create VehicleWrapper successfully.');
            // this.size = this.getSize();
        } else {
            console.log('Fail: something wrong happened.');
        }
    }
    //vehicle_wrapper method
    async add(VehicleType, control_Plate, weight, fuel, capacity, speciality, height, length, max_Load) {
        const new_vehicle = this.vehicleInfo.vehicleRegister(control_Plate, VehicleType, weight, fuel,
            capacity, speciality, height, length, max_Load);
        // console.log(new_vehicle);
        // console.log(control_Plate, weight, fuel, capacity);
        let checked = await DefaultsearchVehicle(new_vehicle);
        if (!isExisted(checked)) {
            this.vehicle_list.push(new_vehicle);
            this.size++;
            addVehicle(new_vehicle);
            console.log("add vehicle success");
        } else console.log("Vehicle already existed");
    }

    delete(VehicleData) {
        let checked = DefaultsearchVehicle(VehicleData);
        if (isExisted(checked)) {
            checked.forEach(async (doc) => { deleteVehicle(doc.id); });
            for (let i = 0; i < this.size; i++) {
                if (this.vehicle_list[i].control_Plate == VehicleData.control_Plate) {
                    this.vehicle_list.splice(i, 1);
                    this.size--;
                }
            }
        } else console.log("Vehicle not found")
    }

    Default_search(control_Plate) {
        // for(let i in this.vehicle_list){
        //     if(i.control_Plate == control_Plate)
        //         return i.vehicles_Info();
        // }
        this.Advanced_search('control_Plate', control_Plate);
    }

    async Advanced_search(field, value) {
        let result = await searchVehicle(field, value);
        // console.log(result)
        if (result === null) {
            console.log("Not found");
            return null;
        }
        let result_list = [];
        result.forEach((doc) => { result_list.push(doc.data()); });
        console.log("print result_list");
        result_list.forEach(element => { console.log(element); });
        return result_list;
    }

    edit(control_Plate, weight, fuel, capacity, speciality, height, length, max_Load) {
        for (let i in this.vehicle_list) {
            if (i.control_Plate == control_Plate) {
                let OldData = DefaultsearchVehicle(i);
                if (i.VehicleType == Vehicle_Type.C_Type) {
                    i.vehicle.weight = weight;
                    i.vehicle.fuel = fuel;
                } else if (i.VehicleType == Vehicle_Type.E_type) {
                    i.vehicle.capacity = capacity;
                    i.vehicle.speciality = speciality;
                } else if (i.VehicleType == Vehicle_Type.FC_type) {
                    i.vehicle.weight = weight;
                    i.vehicle.height = height;
                    i.vehicle.length = length;
                    i.vehicle.max_Load = max_Load;
                }
                OldData.forEach(doc => { editVehicle(doc.id, i); });
                break;
            }
        }
    }
    async active_List() {
        return this.Advanced_search('status', VehicleStatus.ACTIVE);
    }
    async maintenance_List() {
        return this.Advanced_search('status', VehicleStatus.MAINTENANCE);
    }
    async unavailable_List() {
        return this.Advanced_search('status', VehicleStatus.UNAVAILABLE);
    }
}

//Export the class
export { vehicles_wrapper };    