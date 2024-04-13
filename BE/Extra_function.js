//Random ID generator for vehicle ID
function generateID(){
    return Math.floor(Math.random() * 1000000);
}2

//Enum for vehicle type and status
const Vehicle_Type = {
    Truck: 1,
    Coach: 2,
    Container: 3
};

const VehicleStatus = {
    ACTIVE: 1,
    MAINTENANCE: 2,
    UNAVAILABLE: 3
};

//Exporting the functions and enums
export {generateID, Vehicle_Type, VehicleStatus};