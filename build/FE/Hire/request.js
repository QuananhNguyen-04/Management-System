import { driver_wrapper } from "../../BE/Driver_Wrapper.js"
import { vehicles_wrapper } from "../../BE/Vehicle_Wrapper.js";
import { Trip_Schedule, Trip, trip_Money } from "../../BE/Trip_Scheduling.js"


var Vehicles = [
    { Main_Driver_Name: 'Tài', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'sfds', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ffs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'fs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ere', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'xbc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ebvc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'rfgv', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ffs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'fs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ere', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'xbc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ebvc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'rfgv', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ffs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'fs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ere', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'xbc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ebvc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'rfgv', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ffs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'fs', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ere', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'xbc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'ebvc', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
    { Main_Driver_Name: 'rfgv', Driver_Phone: '034594582354', Assistant_Driver_Name: 'fsdfsdfsđ', Vehicle_Num: '59-S3 32423', Cost_Veh: '100.000Đ', },
];

var Suggest = [];
var Dr = [];
var cost;
async function Find_Driver(Vehicles, Drivers, start, end) {
    Suggest = Vehicles;
    Dr = Drivers;
    if (Vehicles == null || Drivers == null) {
        console.log("EMPTY");
        return;
    }
    var ContainerFilter = document.getElementById('Container_Filter');
    ContainerFilter.innerHTML = '';
    var Store = []
    if (Suggest.length > 0) {
        var divTable = document.createElement('div');
        divTable.id = 'divtable';
        var table = document.createElement('table')
        var headerRow = table.insertRow();
        var headers = ['Tài xế chính', 'Tài xế phụ', 'Biển số xe', 'Giá', 'Chọn'];
        headers.forEach(function (header) {
            var th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        const vlen = Vehicles.length;
        const dlen = Drivers.length;
        if (vlen < 1 || dlen < 2) {
            console.log("Not enough supply");
            return;
        }
        console.log("🚀 -------------------------------------------------------------🚀");
        console.log("🚀 ~~ file: request.js:60 ~~ Find_Driver ~~ Drivers:", Drivers);
        console.log("🚀 -------------------------------------------------------------🚀");

        for (let i = 0; i < Math.min(Math.max(vlen, dlen), 20); ++i) {
            const row = table.insertRow();

            const dr = Drivers[parseInt(i / 2) % dlen];
            const subdr = Drivers[parseInt(i / 2 + 1) % dlen];
            const veh = Vehicles[i % vlen];
            const coef = veh.coef
            var cell = row.insertCell();
            cell.textContent = dr.name;

            cell = row.insertCell();
            cell.style.textAlign = "center";
            cell.textContent = subdr.name;

            cell = row.insertCell();
            cell.style.textAlign = "center";
            cell.textContent = veh.control_Plate;

            cell = row.insertCell();
            cell.style.textAlign = "end";
            const Cost = trip_Money(start, end, coef);
            Store.push({ driver: dr, sub_driver: subdr, vehicle: veh, cost: Cost });
            const formatNumberWithSpaces = (number) => {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            };

            cell.textContent = formatNumberWithSpaces(Cost);

            cell = row.insertCell();
            cell.style.textAlign = "center";
            const radio = document.createElement('input');
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "choose");
            radio.setAttribute("value", dr.name);
            cell.appendChild(radio);
            row.onclick = function () {
                radio.checked = true;
            }
        }
        // Suggest.forEach(function (vehicle, index) {
        //     if (index < 20) {
        //         var row = table.insertRow();
        //         var cell = row.insertCell();
        //         cell.textContent = vehicle.Main_Driver_Name;
        //         cell = row.insertCell();
        //         cell.style.textAlign = "center";
        //         cell.textContent = vehicle.Assistant_Driver_Name;
        //         cell = row.insertCell();
        //         cell.style.textAlign = "center";
        //         cell.textContent = vehicle.Vehicle_Num;
        //         cell = row.insertCell();
        //         cell.style.textAlign = "end";
        //         cell.textContent = vehicle.Cost_Veh;
        //         cell = row.insertCell();
        //         cell.style.textAlign = "center";
        //         var radio = document.createElement('input');
        //         radio.setAttribute("type", "radio");
        //         radio.setAttribute("name", "choose");
        //         radio.setAttribute("value", vehicle.Driver_Name);
        //         cell.appendChild(radio);
        //         row.onclick = function () {
        //             radio.checked = true;
        //         }
        //     }
        //     else {
        //         return;
        //     }
        // });
        var cus_Name = document.querySelector(".Customer_Name").value;
        var cus_Phone = document.querySelector(".Customer_Phone").value;
        var Start_Time = document.querySelector(".Start_Time").value;
        var Start_Day = document.querySelector(".Start_Day").value;
        var Start_Dest = document.querySelector(".Start_Dest").value;
        var End_Dest = document.querySelector(".End_Dest").value;

        divTable.appendChild(table);
        ContainerFilter.appendChild(divTable);
        var btnhire = document.createElement('button');
        btnhire.innerHTML = `<i id="icon_add" class="fa-solid fa-calendar-plus"></i>Xác nhận`;
        btnhire.classList.add('hire_btn');
        ContainerFilter.appendChild(btnhire);
        btnhire.onclick = function () {
            var checkbox = document.getElementsByName("choose");
            for (var i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked === true) {
                    alert(checkbox[i].value);
                    console.log(Store[i]);
                    const temp = Store[i];
                    trips.add(temp.driver.id, temp.vehicle.control_Plate, temp.sub_driver.id, null, cus_Phone, start, end, Start_Time, null, temp.cost).then();
                }
            }
            // location.reload();
        };
    } else {
        var NoResult = document.createElement('p');
        NoResult.textContent = 'Không tìm thấy xe phù hợp.';
        ContainerFilter.appendChild(NoResult);
    }

}
var trips = new Trip_Schedule()

// console.log("click checkbutton");
document.getElementById('btn_check').addEventListener('click', async function () {
    var drivers = new driver_wrapper();
    var vehicle = new vehicles_wrapper();

    console.log("click checkbutton");
    var cus_Name = document.querySelector(".Customer_Name").value;
    var cus_Phone = document.querySelector(".Customer_Phone").value;
    var Start_Time = document.querySelector(".Start_Time").value;
    var Start_Day = document.querySelector(".Start_Day").value;
    var Start_Dest = document.querySelector(".Start_Dest").value;
    var End_Dest = document.querySelector(".End_Dest").value;
    var Type_Vehicles = document.querySelector("#Type_Vehicles").value;
    var dList = await drivers.searchByInfoType(["tier", "status"], [Type_Vehicles, 2]);
    if (Type_Vehicles != null) {
        if (Type_Vehicles === "Truck") {
            Type_Vehicles = 1;
        }
        else if (Type_Vehicles === "Coach") {
            Type_Vehicles = 2;
        }
        else if (Type_Vehicles === "Container") {
            Type_Vehicles = 3;
        }
    }
    // trips.search

    var vList = await vehicle.Advanced_search(["VehicleType", "status"], [Type_Vehicles, 3]);
    console.log("vehicles", vList);
    console.log("drivers", dList);

    Find_Driver(vList, dList, Start_Dest, End_Dest);

})
