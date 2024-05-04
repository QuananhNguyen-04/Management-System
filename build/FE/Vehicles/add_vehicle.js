import { vehicles_wrapper } from "../../BE/Vehicle_Wrapper.js";
import { vehicle } from "../../BE/Vehicle.js";
import { maintenance_alert } from "../../BE/Maintainance.js";
import { driver_wrapper } from "../../BE/Driver_Wrapper.js";


let buttonActive = document.getElementById('btn_Truck');
var control_Plate;
// var weight;
var type;
var img1;
var img2;
// var img3;
// var img4;
var wrapper = new vehicles_wrapper()

function showForm(formId) {
    console.log("click")
    if (buttonActive) {
        buttonActive.classList.remove('active');
    }
    const button = document.getElementById(`btn_${formId}`);
    button.classList.add('active');
    buttonActive = button;
    document.getElementById('Truck').style.display = 'none';
    document.getElementById('Coach').style.display = 'none';
    document.getElementById('Container').style.display = 'none';

    document.getElementById(formId).style.display = 'block';
}

document.getElementById('btn_Truck').addEventListener('click', () => {
    showForm('Truck')
});
document.getElementById('btn_Coach').addEventListener('click', () => {
    showForm('Coach')
});
document.getElementById('btn_Container').addEventListener('click', () => {
    showForm('Container')
});

async function submitTruck() {
    type = "TRUCK";
    control_Plate = document.querySelector("#Truck input[name='Control_Plate']").value;
    var weight = document.querySelector("#Truck input[name='Weight_Vehicle']").value;
    var fuel = document.querySelector("#Truck input[name='Fuel_Vehicle']").value;
    img1 = document.querySelector("#Truck input[name='IMG_Vehicle1']").files[0];
    img2 = document.querySelector("#Truck input[name='IMG_Vehicle2']").files[0];
    // img3 = document.querySelector("#Truck input[name='IMG_Vehicle3']").files[0];
    // img4 = document.querySelector("#Truck input[name='IMG_Vehicle4']").files[0];
    console.log(control_Plate, weight, fuel)
    await wrapper.add(1, control_Plate, weight, fuel, null, null, null, null, null, img1, img2);
}

function submitCoach() {
    type = "COACH";
    control_Plate = document.querySelector("#Coach input[name='Control_Plate']").value;
    var capacity = document.querySelector("#Coach input[name='Capacity_Vehicle']").value;
    var speciality = document.querySelector("#Coach input[name='Speciality_Vehicle']").value;
    img1 = document.querySelector("#Coach input[name='IMG_Vehicle1']").files[0];
    img2 = document.querySelector("#Coach input[name='IMG_Vehicle2']").files[0];
    // img3 = document.querySelector("#Coach input[name='IMG_Vehicle3']").files[0];
    // img4 = document.querySelector("#Coach input[name='IMG_Vehicle4']").files[0];
    wrapper.add(2, control_Plate, null, null, capacity, speciality, null, null, null, img1, img2);
}
function submitContainer() {
    type = "Container";
    control_Plate = document.querySelector("#Container input[name='Control_Plate']").value;
    var weight = document.querySelector("#Container input[name='Weight_Vehicle']").value;
    var height = document.querySelector("#Container input[name='Height_Vehicle']").value;
    var length = document.querySelector("#Container input[name='Length_Vehicle']").value;
    var max_load = document.querySelector("#Container input[name='MaxLoad_Vehicle']").value;
    img1 = document.querySelector("#Container input[name='IMG_Vehicle1']").files[0];
    img2 = document.querySelector("#Container input[name='IMG_Vehicle2']").files[0];
    // img3 = document.querySelector("#Container input[name='IMG_Vehicle3']").files[0];
    // img4 = document.querySelector("#Container input[name='IMG_Vehicle4']").files[0];
    wrapper.add(3, control_Plate, weight, null, null, null, height, length, max_load, img1, img2);
}

document.getElementById('submit_truck').addEventListener('click', async function(e) {
    e.preventDefault();
    submitTruck();
});
document.getElementById('submit_coach').addEventListener('click', async function(e) {
    e.preventDefault();
    submitCoach();
});
document.getElementById('submit_container').addEventListener('click', async function(e) {
    e.preventDefault();
    submitContainer();
});

// Test communication between classes
// const vehicleList = new vehicles_wrapper();
// const maintenanceAlert = new maintenance_alert(vehicleList.vehicle_list, null);
// Test program to run Real-time for classes
setTimeout(async function(){
    const maintenanceAlert = new maintenance_alert(wrapper.vehicle_list, new driver_wrapper());
    await maintenanceAlert.reload();
    wrapper.update_continuous();
    // for(let i in vehicleList.vehicle_list){
    //     if(Trip_Info_Object.end_Time < new Date()) vehicleList.vehicle_list[i].update_Info(Trip_Info_Object, false);
    //     else if(crashed == true) vehicleList.vehicle_list[i].update_Info(null, true);
    //     else vehicleList.vehicle_list[i].update_Info(null, false);
    // }
}, 5000);
