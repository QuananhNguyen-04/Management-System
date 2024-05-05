import { vehicles_wrapper } from "../../BE/Vehicle_Wrapper.js";
import { fetchDriver, searchDriver, searchDriverByInfo } from "../../BE/driverDatabaseInteract.js";
import { maintenance_alert } from "../../BE/Maintainance.js";
import {Warning, ExistID, Success, Error, showNotify} from "../alertbox.js"
var drivers = [
    {
        plateNumber: '29B-12345',
        mainDriver: 'Tài xế 1',
        mainDriverDOB: '01/01/1980',
        mainDriverHometown: 'Hà Nội',
        mainDriverPhone: '0123456789',
        statusVehicle: 'Đang bảo dưỡng',
        type: 'Xe khách',
        mainDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    {
        plateNumber: '29B-12346',
        mainDriver: '',
        mainDriverDOB: '',
        mainDriverHometown: '',
        mainDriverPhone: '',
        statusVehicle: 'Chưa sử dụng',
        type: 'Xe tải',
        mainDriverPhoto: '',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    {
        plateNumber: '29B-12346',
        mainDriver: '',
        mainDriverDOB: '',
        mainDriverHometown: '',
        mainDriverPhone: '',
        statusVehicle: 'Chưa sử dụng',
        type: 'Xe khách',
        mainDriverPhoto: '',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    {
        plateNumber: '29B-12346',
        mainDriver: '',
        mainDriverDOB: '',
        mainDriverHometown: '',
        mainDriverPhone: '',
        statusVehicle: 'Chưa sử dụng',
        type: 'Xe khách',
        mainDriverPhoto: '',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    {
        plateNumber: '29B-12346',
        mainDriver: '',
        mainDriverDOB: '',
        mainDriverHometown: '',
        mainDriverPhone: '',
        statusVehicle: 'Chưa sử dụng',
        type: 'Xe khách',
        mainDriverPhoto: '',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    {
        plateNumber: '29B-12346',
        mainDriver: '',
        mainDriverDOB: '',
        mainDriverHometown: '',
        mainDriverPhone: '',
        statusVehicle: 'Chưa sử dụng',
        type: 'Xe khách',
        mainDriverPhoto: '',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    {
        plateNumber: '29B-12346',
        mainDriver: '',
        mainDriverDOB: '',
        mainDriverHometown: '',
        mainDriverPhone: '',
        statusVehicle: 'Chưa sử dụng',
        type: 'Xe khách',
        mainDriverPhoto: '',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    {
        plateNumber: '29B-12346',
        mainDriver: '',
        mainDriverDOB: '',
        mainDriverHometown: '',
        mainDriverPhone: '',
        statusVehicle: 'Chưa sử dụng',
        type: 'Xe khách',
        mainDriverPhoto: '',
        imageUrl: ['https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    },
    // Các dữ liệu mẫu khác...
];
var filteredDrivers = [];
var currentDriverIndex = null;
var wrapper = new vehicles_wrapper();
// Function hiển thị profile của tài xế và phụ xe
async function showProfile(index) {
    var driver = filteredDrivers[index];
    currentDriverIndex = index;
    let maintain = driver['maintenance'];
    let dr = null;
    if (maintain != null) {
        let id = maintain.driver_ID;
        let sth = await searchDriverByInfo("id", id);

        console.log(id);
        console.log("sth: ", sth[0]);
        if (sth != "Not found") {
            dr = sth[0];
            dr = dr.data();
        }
    }
    document.getElementById('profile-name').textContent = "Biển số xe: " + driver.control_Plate;
    document.getElementById('profile-type').textContent = "Loại xe: " + (driver.VehicleType == 1 ? "Xe Tải" : driver.VehicleType == 2 ? "Xe Khách" : "Containers");
    document.getElementById('profile-phone').textContent = "Số điện thoại tài xế: " + ((dr == null || dr.phoneNumber == null) ? "" : dr.phoneNumber);
    document.getElementById('profile-route').textContent = "Tình trạng xe: " + (driver.status == 3 ? "Chưa Sử Dụng" : "Đang Bảo Dưỡng");

    // var profileImages = document.getElementById('profile-images');
    // profileImages.innerHTML = '';
    // driver.imageUrl.forEach(function (imageUrl) {
    //     var img = document.createElement('img');
    //     img.src = imageUrl;
    //     img.onclick = function () {
    //         window.open(imageUrl, '_blank');
    //     };
    //     profileImages.appendChild(img);
    // });

    // Hiển thị thông tin tài xế và phụ xe
    if (dr != null) {
        document.getElementById('profile-driver-name').textContent = "Tên tài xế: " + (dr.name == null ? "" : dr.name);
        document.getElementById('profile-driver-dob').textContent = "Ngày sinh: " + (dr.DoB == null ? "" : dr.DoB);
        document.getElementById('profile-driver-hometown').textContent = "Quê quán: " + (dr.hometown == null ? "" : dr.hometown);
        document.getElementById('profile-driver-photo').src = (dr.idCard == "" || dr.idCard == "N/A") ? "" : dr.idCard;
    }
    else {
        document.getElementById('profile-driver-name').textContent = "Tên tài xế: " + "";
        document.getElementById('profile-driver-dob').textContent = "Ngày sinh: " + "";
        document.getElementById('profile-driver-hometown').textContent = "Quê quán: " + "";
        document.getElementById('profile-driver-photo').src = driver.front_image == null || driver.front_image == "N/A" ? "" : driver.front_image;;
        document.getElementById('profile-driver-photo').textContent = "Non driver";
    }
    var profileImages = document.getElementById('profile-driver-photo');
    profileImages.onclick = function () {
        window.open(profileImages.src, '_blank');
    };
    document.querySelector('.profile-container').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block'; // Show overlay
}

// Function đóng profile
function closeProfile() {
    document.querySelector('.profile-container').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none'; // Hide overlay
}
document.querySelector('.overlay').addEventListener('click', function () {
    closeProfile();
})

// Function mở form chỉnh sửa
// Function mở form chỉnh sửa
function editProfile() {
    var driver = filteredDrivers[currentDriverIndex];
    document.getElementById("edit-weight").value = driver.weight != null ? driver.weight : "Không thể sửa";
    document.getElementById("edit-fuel").value = driver.fuel != null ? driver.fuel : "Không thể sửa";
    document.getElementById("edit-capacity").value = driver.capacity != null ? driver.capacity : "Không thể sửa";
    document.getElementById("edit-height").value = driver.height != null ? driver.height : "Không thể sửa";
    document.getElementById("edit-length").value = driver.length != null ? driver.length : "Không thể sửa";
    document.getElementById("edit-status").value = driver.status != null ? driver.status : "Không thể sửa";
    document.querySelector('.edit-form').style.display = 'block';
    document.querySelector('.profile-container').style.display = 'none';

}
// Thêm sự kiện click vào overlay
document.querySelector('.overlay').addEventListener('click', function () {
    // Đóng bảng profile
    document.querySelector('.profile-container').style.display = 'none';
    // Đóng form chỉnh sửa
    document.querySelector('.edit-form').style.display = 'none';
    // Ẩn overlay
    this.style.display = 'none';
});


// Function hủy chỉnh sửa
function cancelEdit() {
    document.querySelector('.edit-form').style.display = 'none';
    document.querySelector('.profile-container').style.display = 'block';
}


// Function cập nhật thông tin tài xế
async function updateDriver() {
    var driver = filteredDrivers[currentDriverIndex];
    driver.weight = document.getElementById("edit-weight").value;
    driver.fuel = document.getElementById("edit-fuel").value;
    driver.capacity = document.getElementById("edit-capacity").value;
    driver.height = document.getElementById("edit-height").value;
    driver.length = document.getElementById("edit-length").value;
    driver.status = document.getElementById("edit-status").value;

    // driver.imageUrl[0] = document.getElementById('edit-image-url').value;
    // redraw()
    let result = await wrapper.edit(driver.control_Plate, driver.weight, driver.fuel, driver.capacity, driver.speciality,
        driver.height, driver.lenght, driver.max_Load)
    // Cập nhật xong, ẩn form chỉnh sửa và hiển thị profile
    document.querySelector('.edit-form').style.display = 'none';
    document.querySelector('.profile-container').style.display = 'block';
    // Hiển thị thông tin cập nhật trên profile
    showProfile(currentDriverIndex);
    if (result == true) {
        Success("Chỉnh sửa thành công");
    }
    else {
        Error(result);
    }
}

var wrap = new vehicles_wrapper();

// Xử lý sự kiện khi nhấn nút tìm kiếm


var redraw = async function () {
    var selectedType = document.getElementById('search-type').value.toLowerCase();
    var searchText = document.getElementById('search-text').value.toLowerCase();

    filteredDrivers = []
    let vhType = selectedType == "" ? 0 : selectedType;
    console.log(vhType)
    var free_list, maintain_list;
    if (vhType === 0) {
        free_list = await wrap.unavailable_List();
        maintain_list = await wrap.maintenance_List();
    }
    else {
        free_list = await wrap.Advanced_search(["status", "VehicleType"], [3, parseInt(vhType)])
        maintain_list = await wrap.Advanced_search(["status", "VehicleType"], [2, parseInt(vhType)])
    }

    console.log(free_list)
    console.log(maintain_list)
    if (free_list != null) {
        free_list.forEach((ele) => {
            filteredDrivers.push(ele);
        })
    }
    if (maintain_list != null) {
        maintain_list.forEach((ele) => {
            filteredDrivers.push(ele);
        })
    }

    filteredDrivers = filteredDrivers.filter(function (driver) {
        return (driver["control_Plate"].toLowerCase().includes(searchText) || searchText === '');
    });
    console.log(filteredDrivers)
    var resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    if (filteredDrivers.length > 0) {
        var table = document.createElement('table');
        table.id = 'result-table';

        var headerRow = table.insertRow();
        var headers = ['Loại xe', 'Biển số xe', 'Lái xe chính', 'Số điện thoại', 'Tình trạng xe', 'Hình ảnh'];
        headers.forEach(function (header) {
            var th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        filteredDrivers.forEach(async function (vehicle, index) {
            var row = table.insertRow();
            // var values = [vehicle.type, vehicle.plateNumber, vehicle.mainDriver, vehicle.mainDriverPhone, vehicle.statusVehicle, vehicle.imageUrl[0]];
            let features = ["VehicleType", "control_Plate", "status"];
            // values.forEach(function (value, i) {
            //     var cell = row.insertCell();
            //     if (i === 5) {
            //         var img = document.createElement('img');
            //         img.src = value;
            //         img.style.maxWidth = '100px';
            //         cell.appendChild(img);
            //     } else {
            //         cell.textContent = value;
            //     }
            // });
            console.log("vehicle: ", vehicle)
            // Assuming 'vehicle' is your JSON object
            for (const key of features) {
                if (vehicle.hasOwnProperty(key)) {
                    if (key == "status") {
                        if (vehicle[key] === 3) {
                            cell = row.insertCell();
                            cell.textContent = null;
                            cell = row.insertCell();
                            cell.textContent = null;
                            cell = row.insertCell();
                            cell.textContent = "Chưa Sử Dụng";
                            continue
                        }
                        let maintain = vehicle["maintenance"];
                        if (maintain !== null) {
                            console.log("maintain: ", maintain);
                            let id = maintain.driver_ID;
                            let sth = await searchDriverByInfo("id", id);

                            console.log(id);
                            console.log("sth: ", sth[0]);
                            if (sth != 'Not found') {
                                let dr = sth[0];
                                dr = dr.data();
                                console.log("vehicle: ", dr);
                                cell = row.insertCell();
                                cell.textContent = dr.name;
                                cell = row.insertCell();
                                cell.textContent = dr.phoneNumber;
                                cell = row.insertCell();
                                cell.textContent = "Đang Bảo Trì";
                                continue;
                            }
                        }
                        cell = row.insertCell();
                        cell.textContent = null;
                        cell = row.insertCell();
                        cell.textContent = null;
                        cell = row.insertCell();
                        cell.textContent = "Đang Bảo Trì";
                        // }
                        continue
                    }
                    var cell = row.insertCell();
                    var value = vehicle[key];
                    if (key == "VehicleType") {
                        switch (vehicle[key]) {
                            case 1:
                                value = "Xe Tải"
                                break;

                            case 2:
                                value = "Xe Khách"
                                break;

                            case 3:
                                value = "Container"
                                break;

                            default:
                                break;
                        }
                    }
                    // Do something with 'value', e.g., insert it into a table cell
                    cell.textContent = value;
                }
            }
            var cell = row.insertCell();
            var img = document.createElement('img');
            console.log("loc:", vehicle.front_image)
            img.src = vehicle.front_image == null || vehicle.front_image == "N/A" ? "" : vehicle.front_image;
            img.style.maxWidth = '100px';
            cell.appendChild(img);


            row.addEventListener('click', function () {
                document.getElementById('overlay').style.display = 'block';
                showProfile(index);
            });
        });

        resultContainer.appendChild(table);
    } else {
        var noResult = document.createElement('p');
        noResult.textContent = 'Không tìm thấy xe phù hợp.';
        noResult.className = 'no-result-message'; // Áp dụng class CSS mới
        resultContainer.appendChild(noResult);
    }
};
document.getElementById('search-btn').addEventListener('click', function () {
    redraw();
});
document.addEventListener('keypress', function (event) {
    var keycode = event.keyCode || event.which;
    if (keycode == '13') {
        redraw();
    }
});

redraw();

document.getElementById('edit_btn').addEventListener('click', async function (e) {
    e.preventDefault();
    editProfile();
})
document.getElementById('cancel_btn').addEventListener('click', async function (e) {
    e.preventDefault();
    cancelEdit();
})
document.getElementById('update_btn').addEventListener('click', async function (e) {
    e.preventDefault();
    await updateDriver();
})
document.getElementById('search-type').addEventListener('change', async function () {
    // let vlistfree = await wrap.Advanced_search(["VehicleType", "status"], ["...", 3])
    // let vlistmaintain = await wrap.Advanced_search(["VehicleType", "status"], ["...", 2])
    redraw();
})
setTimeout(async function () {
    const maintenanceAlert = new maintenance_alert(wrapper.vehicle_list);
    await maintenanceAlert.reload();
    wrapper.update_continuous();
    // for(let i in vehicleList.vehicle_list){
    //     if(Trip_Info_Object.end_Time < new Date()) vehicleList.vehicle_list[i].update_Info(Trip_Info_Object, false);
    //     else if(crashed == true) vehicleList.vehicle_list[i].update_Info(null, true);
    //     else vehicleList.vehicle_list[i].update_Info(null, false);
    // }
}, 1000);