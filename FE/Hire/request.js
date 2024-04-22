import { driver_wrapper } from "../../BE/Driver_Wrapper.js"
import { vehicles_wrapper } from "../../BE/Vehicle_Wrapper.js";
import { Trip_Schedule, Trip} from "../../BE/Trip_Scheduling.js"

var Vehicles = [
    { Driver_Name: 'Tài', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Driver_Name: 'sfds', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Driver_Name: 'ffs', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Driver_Name: 'fs', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Driver_Name: 'ere', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Driver_Name: 'xbc', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Driver_Name: 'ebvc', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Driver_Name: 'rfgv', Driver_Phone: '034594582354', Vehicle_Type: 'Xe khách', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
];

var Suggest = [];
var cost;
function Find_Driver() {
    Suggest = Vehicles;
    var ContainerFilter = document.getElementById('Container_Filter');
    ContainerFilter.innerHTML = '';
    if (Suggest.length > 0) {
        var table = document.createElement('table');
        table.id = 'tableclass';
        var headerRow = table.insertRow();
        var headers = ['Tên tài xế', 'Loại xe', 'Biển số xe', 'Giá', 'Chọn'];
        headers.forEach(function (header) {
            var th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        Suggest.forEach(function (vehicle, index) {
            var row = table.insertRow();
            var cell = row.insertCell();
            cell.textContent = vehicle.Driver_Name;
            cell = row.insertCell();
            cell.style.textAlign = "center";
            cell.textContent = vehicle.Vehicle_Type;
            cell = row.insertCell();
            cell.style.textAlign = "center";
            cell.textContent = vehicle.Vehicle_Num;
            cell = row.insertCell();
            cell.style.textAlign = "end";
            cell.textContent = vehicle.Cost_Veh;
            cell = row.insertCell();
            cell.style.textAlign = "center";
            var radio = document.createElement('input');
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "choose");
            radio.setAttribute("value", vehicle.Driver_Name);
            cell.appendChild(radio);
            row.onclick = function () {
                radio.checked = true;
            }
        });
        ContainerFilter.appendChild(table);
        var btnhire = document.createElement('button');
        btnhire.textContent = 'Xác nhận';
        btnhire.classList.add('hire_btn');
        ContainerFilter.appendChild(btnhire);
        btnhire.onclick = function () {
            var checkbox = document.getElementsByName("choose");
            for (var i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked === true) {
                    alert(checkbox[i].value);
                }
            }
        };
    } else {
        var NoResult = document.createElement('p');
        NoResult.textContent = 'Không tìm thấy xe phù hợp.';
        ContainerFilter.appendChild(NoResult);
    }

}

var Customer_Name = document.querySelector(".Customer_Name").value
var Customer_Phone = document.querySelector(".Customer_Phone").value
var Start_Dest = document.querySelector(".Start_Dest").value
var End_Dest = document.querySelector(".End_Dest").value
var Start_Time = document.querySelector(".Start_Time").value
var Start_Day = document.querySelector(".Start_Day").value


var trips = new Trip_Schedule()

document.getElementById('btn_check').addEventListener('click', async function() {

    console.log("click checkbutton")
    Find_Driver();
})