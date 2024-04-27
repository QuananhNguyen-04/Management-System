//Random ID generator for vehicle ID
function generateID(){
    return Math.floor(Math.random() * 1000000);
}

//Random coef for vehicle spending per trip
function generateCoef(comparison_coef, min_coef){
    if(min_coef == 1000) {
        min_coef = min_coef / 1000;  //Adjust the valuable for truck and container related to weight(kg)
        comparison_coef = comparison_coef / 1000;
    } else {
        comparison_coef = comparison_coef / 10;  //Adjust the valuable for coach related to capacity(people)
        min_coef = min_coef / 10;
    }
    const random_coef = (Math.random() + 1) * (comparison_coef - min_coef);
    return random_coef.toFixed(2);
}

//Enum for vehicle type and status
const Vehicle_Type = {
    C_Type: 1,
    E_type: 2,
    FC_type: 3
};

const VehicleStatus = {
    ACTIVE: 1,
    MAINTENANCE: 2,
    UNAVAILABLE: 3
};

//Exporting the functions and enums
export {generateID, generateCoef, Vehicle_Type, VehicleStatus};