import { vehicles_wrapper } from "../../BE/Vehicle_Wrapper.js";
import { vehicle } from "../../BE/Vehicle.js";


let buttonActive = document.getElementById('btn_Truck');
var control_Plate;
// var weight;
var type;
var img1;
var img2;
var img3;
var img4;
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

function submitTruck() {
    type = "TRUCK";
    control_Plate = document.querySelector("#Truck input[name='Control_Plate']").value;
    var weight = document.querySelector("#Truck input[name='Weight_Vehicle']").value;
    var fuel = document.querySelector("#Truck input[name='Fuel_Vehicle']").value;
    img1 = document.querySelector("#Truck input[name='IMG_Vehicle1']").value;
    img2 = document.querySelector("#Truck input[name='IMG_Vehicle2']").value;
    img3 = document.querySelector("#Truck input[name='IMG_Vehicle3']").value;
    img4 = document.querySelector("#Truck input[name='IMG_Vehicle4']").value;
    wrapper.add(1, Control_Plate, Weight_Vehicle, Fuel_Vehicle, null, null, null, null, null);
}

function submitCoach() {
    type = "COACH";
    control_Plate = document.querySelector("#Coach input[name='Control_Plate']").value;
    var capacity = document.querySelector("#Coach input[name='Capacity_Vehicle']").value;
    var speciality = document.querySelector("#Coach input[name='Speciality_Vehicle']").value;
    img1 = document.querySelector("#Coach input[name='IMG_Vehicle1']").value;
    img2 = document.querySelector("#Coach input[name='IMG_Vehicle2']").value;
    img3 = document.querySelector("#Coach input[name='IMG_Vehicle3']").value;
    img4 = document.querySelector("#Coach input[name='IMG_Vehicle4']").value;
    wrapper.add(2, Control_Plate, null, Fuel_Vehicle, Capacity_Vehicle, null, null, null, null);
}
function submitContainer() {
    type = "Container";
    control_Plate = document.querySelector("#Container input[name='Control_Plate']").value;
    var weight = document.querySelector("#Container input[name='Weight_Vehicle']").value;
    var height = document.querySelector("#Container input[name='Height_Vehicle']").value;
    var length = document.querySelector("#Container input[name='Length_Vehicle']").value;
    var max_load = document.querySelector("#Container input[name='MaxLoad_Vehicle']").value;
    img1 = document.querySelector("#Container input[name='IMG_Vehicle1']").value;
    img2 = document.querySelector("#Container input[name='IMG_Vehicle2']").value;
    img3 = document.querySelector("#Container input[name='IMG_Vehicle3']").value;
    img4 = document.querySelector("#Container input[name='IMG_Vehicle4']").value;
    wrapper.add(3, Control_Plate, null, null, null, null, Height_Vehicle, Length_Vehicle, MaxLoad_Vehicle);
}

document.getElementById('submit_truck').addEventListener('click', async function() {
    submitTruck();
});
document.getElementById('submit_coach').addEventListener('click', async function() {
    submitCoach();
});
document.getElementById('submit_container').addEventListener('click', async function() {
    submitContainer();
});
