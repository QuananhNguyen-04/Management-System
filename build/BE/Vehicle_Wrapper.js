//import information from another file
import { addVehicle, deleteVehicle, searchVehicle, DefaultsearchVehicle, editVehicle, fetchVehicle } from './fetchVehicle.js';
import { isExisted } from './ExtraFunction2.js'; //Use from driver-and-driver-wrapper branch
import { Vehicle_Type, VehicleStatus } from './Extra_function.js';
import { vehicle } from './Vehicle.js';
import { pushFile } from './driverDatabaseInteract.js';

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
    async add(VehicleType, control_Plate, weight, fuel, capacity, speciality, height, length, max_Load, image1, image2) {
        const new_vehicle = this.vehicleInfo.vehicleRegister(control_Plate, VehicleType, weight, fuel,
            capacity, speciality, height, length, max_Load);
            
        new_vehicle.maintenance = new_vehicle.maintenance.toObject();
        let checked = await DefaultsearchVehicle(new_vehicle);
        if (checked != null && checked == "Not found") {
            const front_image = await pushFile('VEHICLE/', image1, new_vehicle.car_ID, 'front');
            console.log(front_image);
            const back_image = await pushFile('VEHICLE/', image2, new_vehicle.car_ID, 'back');
            console.log(back_image);
            // console.log(new_vehicle);
            // console.log(control_Plate, weight, fuel, capacity);
            this.vehicle_list.push(new_vehicle);
            this.size++;
            addVehicle(new_vehicle, front_image, back_image);
            console.log("add vehicle success");
        } else console.log("Vehicle already existed");
    }

    async delete(VehicleData) {
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

    async Default_search(control_Plate) {
        // for(let i in this.vehicle_list){
        //     if(i.control_Plate == control_Plate)
        //         return i.vehicles_Info();
        // }
        return this.Advanced_search('control_Plate', control_Plate);
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

    async edit(control_Plate, weight, fuel, capacity, speciality, height, length, max_Load) {
        for (let vehicle of this.vehicle_list) {
            if (vehicle.control_Plate == control_Plate) {
                let OldData = await DefaultsearchVehicle(vehicle);
                if (vehicle.VehicleType == Vehicle_Type.C_Type) {
                    vehicle.weight = weight;
                    vehicle.fuel = fuel;
                } else if (i.VehicleType == Vehicle_Type.E_type) {
                    vehicle.capacity = capacity;
                    vehicle.speciality = speciality;
                } else if (i.VehicleType == Vehicle_Type.FC_type) {
                    vehicle.weight = weight;
                    vehicle.height = height;
                    vehicle.length = length;
                    vehicle.max_Load = max_Load;
                }
                OldData.forEach(doc => { editVehicle(doc.id, vehicle); });
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
    async update_continuous() {
        for (let vehicle of this.vehicle_list) {
            console.log(vehicle);
            let OldData = await DefaultsearchVehicle(vehicle);
            // let NewData = vehicle;
            // NewData.maintenance = NewData.maintenance.toObject();
            // if (Array.isArray(OldData)) {
            //     console.log(OldData.id);
            //     OldData.forEach(doc => { console.log(doc.id); editVehicle(doc.id, vehicle); });
            // } else {
            //     console.log(OldData.car_ID);
            //     editVehicle(OldData.id, vehicle);
            // }
            OldData.forEach(doc => { editVehicle(doc.id, vehicle); });
        }
    }
}

//Export the class
export { vehicles_wrapper };    