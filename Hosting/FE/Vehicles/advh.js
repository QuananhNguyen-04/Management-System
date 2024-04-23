import { vehicles_wrapper } from "../../BE/Vehicle_Wrapper.js";
import { vehicle } from "../../BE/Vehicle.js";


function showForm(formId) {
    // Ẩn tất cả các biểu mẫu
    document.getElementById('Truck').style.display = 'none';
    document.getElementById('Coach').style.display = 'none';
    document.getElementById('Container').style.display = 'none';

    // Hiển thị biểu mẫu được chọn
    document.getElementById(formId).style.display = 'block';
}

let btns = document.querySelectorAll('.Choose_BTN')
btns.forEach(btn => {
    btn.addEventListener('click', function () {
        let formId = this.dataset.form;
            
        // Call the showForm function with the form id
        showForm(formId);
    });
    
});

var Control_Plate = document.getElementById("Control_Plate").value;
var Weight_Vehicle = document.getElementById("Weight_Vehicle").value;
var Fuel_Vehicle = document.getElementById("Fuel_Vehicle").value;
var IMG_Vehicle1 = document.getElementById("IMG_Vehicle1");
var IMG_Vehicle2 = document.getElementById("IMG_Vehicle2");
var IMG_Vehicle3 = document.getElementById("IMG_Vehicle3");
var IMG_Vehicle4 = document.getElementById("IMG_Vehicle4");
var Capacity_Vehicle = document.getElementById("Capacity_Vehicle").value;
var Speciality_Vehicle = document.getElementById("Speciality_Vehicle").value;
var Height_Vehicle = document.getElementById("Height_Vehicle").value;
var Length_Vehicle = document.getElementById("Length_Vehicle").value;
var MaxLoad_Vehicle = document.getElementById("MaxLoad_Vehicle").value;

let wrapper = new vehicles_wrapper()
let submit = document.querySelectorAll('.submit_BTN')
submit.forEach(btn => {
    btn.addEventListener('click', async function () {
        let vtype = 0;
        if (document.getElementById('Truck').style.display !== 'none') {
            wrapper.add(1, Control_Plate, Weight_Vehicle, Fuel_Vehicle, null, null, null, null, null);
            
        }
        else if (document.getElementById('Coach').style.display !== 'none') {
            wrapper.add(2, Control_Plate, null, Fuel_Vehicle, Capacity_Vehicle, null, null, null, null);
            
        }
        else if (document.getElementById('Container').style.display !== 'none') {
            wrapper.add(3, Control_Plate, null, null, null, null, Height_Vehicle, Length_Vehicle, MaxLoad_Vehicle);
        }

    })
}

)