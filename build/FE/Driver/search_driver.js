import { driver, driverLicense } from "../../BE/Driver.js";
import { driver_wrapper } from "../../BE/Driver_Wrapper.js";
import { searchDriver } from "../../BE/driverDatabaseInteract.js";
import {Warning, ExistID, Success, Error, showNotify} from "../alertbox.js"
var wrap = new driver_wrapper();
var drivers = [
    { name: 'Tài xế 1', type: 'Xe khách', phone: '0123456789', profilePicture: 'profile1.jpg', drivingLicense: 'license1.jpg', personalInfo: 'Some information about driver 1.' },
    { name: 'Tài xế 2', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 3', type: 'Xe container', phone: '0912345678', profilePicture: 'profile3.jpg', drivingLicense: 'license3.jpg', personalInfo: 'Some information about driver 3.' },
    { name: 'Tài xế 4', type: 'Xe khách', phone: '0123456788', profilePicture: 'profile4.jpg', drivingLicense: 'license4.jpg', personalInfo: 'Some information about driver 4.' },
    { name: 'Tài xế 5', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 6', type: 'Xe container', phone: '0912345678', profilePicture: 'profile3.jpg', drivingLicense: 'license3.jpg', personalInfo: 'Some information about driver 3.' },
    { name: 'Tài xế 7', type: 'Xe khách', phone: '0123456788', profilePicture: 'profile4.jpg', drivingLicense: 'license4.jpg', personalInfo: 'Some information about driver 4.' },
    { name: 'Tài xế 8', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 9', type: 'Xe container', phone: '0912345678', profilePicture: 'profile3.jpg', drivingLicense: 'license3.jpg', personalInfo: 'Some information about driver 3.' },
    { name: 'Tài xế 10', type: 'Xe khách', phone: '0123456788', profilePicture: 'profile4.jpg', drivingLicense: 'license4.jpg', personalInfo: 'Some information about driver 4.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },
    { name: 'Tài xế 11', type: 'Xe tải', phone: '0987654321', profilePicture: 'profile2.jpg', drivingLicense: 'license2.jpg', personalInfo: 'Some information about driver 2.' },

];

var filteredDrivers = [];
var currentDriverIndex = null;
var dIndex;

// Function hiển thị profile của tài xế
function showProfile(index) {
    dIndex = index;
    var driver = filteredDrivers[index];
    currentDriverIndex = index;
    document.getElementById('profile-picture').src = driver.idCard;
    document.getElementById('driving-license').src = driver.license.frontImg;
    document.getElementById('profile-picture').onclick = function () {
        window.open(driver.idCard, '_blank');
    };
    document.getElementById('driving-license').onclick = function () {
        window.open(driver.license.frontImg, '_blank');
    };

    document.getElementById('profile-name').textContent = driver.name;
    document.getElementById('profile-info').textContent = "Eff: " + driver.efficiency + ". Status: " + (driver.status == 1? "Working" : "Resting");
    document.querySelector('.edit-container').style.display = 'none';
    document.querySelector('.profile-container').style.display = 'block';
    document.querySelector('.edit-container').style.display = 'none'; // Ẩn phần chỉnh sửa
    document.querySelector('.profile-container button:nth-child(3)').style.display = 'inline'; // Hiển thị nút "Chỉnh sửa"
    // document.querySelector('.profile-container button:nth-child(4)').style.display = 'inline'; // Hiển thị nút "Đóng"
}

// Function đóng profile
function closeProfile() {
    document.querySelector('.profile-container').style.display = 'none';
    document.querySelector('.edit-container').style.display = 'none'; // Ẩn phần chỉnh sửa
    document.querySelector('#overlay').style.display = 'none';
}

document.querySelector('#overlay').addEventListener('click', function () {
    closeProfile();
})

// Function hiển thị form chỉnh sửa
function editProfile() {
    var driver = filteredDrivers[currentDriverIndex];
    document.getElementById('edit-name').value = driver.name;
    document.getElementById('edit-type').value = driver.license.tier;
    document.getElementById('edit-efficiency').value = driver.efficiency;
    document.getElementById('edit-phone').value = driver.phoneNumber;
    document.querySelector('.edit-container').style.display = 'block'; // Hiển thị phần chỉnh sửa
    document.querySelector('.profile-container button:nth-child(3)').style.display = 'none'; // Ẩn nút "Chỉnh sửa"
    // document.querySelector('.profile-container button:nth-child(4)').style.display = 'none'; // Ẩn nút "Đóng"
}

// Function hủy chỉnh sửa
function cancelEdit() {
    document.querySelector('.edit-container').style.display = 'none'; // Ẩn phần chỉnh sửa
    document.querySelector('.profile-container button:nth-child(3)').style.display = 'inline'; // Hiển thị nút "Chỉnh sửa"
}

// Function cập nhật thông tin tài xế
async function updateDriver() {
    try {
        
        // console.log(dIndex);
        var drdata = filteredDrivers[dIndex];
        var dr = new driver();
        console.log("🚀 ~ updateDriver ~ dr:", dr)
        dr.assign(drdata);
        let newd = dr.copy();
        let doc = await searchDriver(newd);
        var newName = document.getElementById('edit-name').value;
        var newType = document.getElementById('edit-type').value;
        var newEff = document.getElementById('edit-efficiency').value;
        var newPhone = document.getElementById('edit-phone').value;
    
        newd.name = newName;
        newd.license.tier = newType;
        newd.efficiency = newEff;
        newd.phoneNumber = newPhone;
    
        wrap.edit(doc, newd);
    
        // Hiển thị lại thông tin
        showProfile(dIndex);
        redraw();
    
        // Ẩn phần chỉnh sửa và hiển thị thông báo cập nhật
        document.querySelector('.edit-container').style.display = 'none';
        // document.querySelector('.update-text').style.display = 'block';ppppppppppppppppppppppppppppppppppppppppppppppppp
        document.querySelector('.profile-container button:nth-child(3)').style.display = 'inline'; // Hiển thị nút "Chỉnh sửa"
        // document.querySelector('.profile-container button:nth-child(4)').style.display = 'inline'; // Hiển thị nút "Đóng"
        Success("Chỉnh sửa thành công");
    } catch (error) {
        Error(error.message);
    }
}

// Xử lý sự kiện khi nhấn nút tìm kiếm
async function redraw() {
    var selectedType = document.getElementById('search-type').value.toLowerCase();
    var searchText = document.getElementById('search-text').value.toLowerCase();
    
    filteredDrivers = []
    let vhType = selectedType == "" ? 0 : selectedType;
    console.log("🚀 ~ redraw ~ vhType:", vhType)
    if (vhType == 0) {
        const t1 = await wrap.searchByInfoType("tier", "Truck")
        const t2 = await wrap.searchByInfoType("tier", "Container")
        const t3 = await wrap.searchByInfoType("tier", "Coach")
        filteredDrivers.push(...t1);
        filteredDrivers.push(...t3);
        filteredDrivers.push(...t2);
    }
    else if (vhType == 1) {
        // Only Truck
        const truckDrivers = await wrap.searchByInfoType("tier", "Truck");
        if (Array.isArray(truckDrivers))
        filteredDrivers.push(...truckDrivers);
    } else if (vhType == 2) {
        // Only Coach
        const coachDrivers = await wrap.searchByInfoType("tier", "Coach");
        if (Array.isArray(coachDrivers))
        filteredDrivers.push(...coachDrivers);
    } else if (vhType == 3) {
        // Only Container
        const containerDrivers = await wrap.searchByInfoType("tier", "Container");
        if (Array.isArray(containerDrivers))
        filteredDrivers.push(...containerDrivers);
    }
    filteredDrivers = filteredDrivers.filter(function (driver) {
        return (driver["name"].toLowerCase().includes(searchText) || searchText === '');
    });
    console.log("🚀 ---------------------------------------------------------------------🚀");
    console.log("🚀 ~~ file: search_driver.js:155 ~~ filteredDrivers:", filteredDrivers);
    console.log("🚀 ---------------------------------------------------------------------🚀");

    var resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    if (filteredDrivers.length > 0) {
        var table = document.createElement('table');
        table.id = 'result-table';
        var headerRow = table.insertRow();
        var headers = ['Tên tài xế', 'Loại xe', 'Số điện thoại'];
        headers.forEach(function (header) {
            var th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        filteredDrivers.forEach(function (driver, index) {
            var row = table.insertRow();

            var cell = row.insertCell();
            cell.textContent = driver.name;
            let tier;
            const lic = driver.license;
            if (lic == null || lic == "N/A") {
                tier = "Thiếu thông tin, hãy bổ sung";
            }
            else {
                if (lic.tier == "Truck") {
                    tier = "Xe Tải";
                }
                else if (lic.tier == "Container") {
                    tier = "Container";
                }
                else if (lic.tier == "Coach") {
                    tier = "Xe Khách";
                }
                else {
                    tier = lic.tier;
                }
            }

            cell = row.insertCell();
            cell.textContent = tier;


            cell = row.insertCell();
            cell.textContent = driver.phoneNumber;
            row.addEventListener('click', function () {
                document.getElementById('overlay').style.display = 'block';
                showProfile(index);
            });
        });
        resultContainer.appendChild(table);
    } else {
        var noResult = document.createElement('p');
        noResult.textContent = 'Không tìm thấy tài xế phù hợp.';
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
document.getElementById('cancel_btn').addEventListener('click', async function () {
    cancelEdit();
})
document.getElementById('update_btn').addEventListener('click', async function () {
    updateDriver();
})
document.getElementById('overlay').addEventListener('click', async function (event) {
    if (!overlay.contains(event.target)) {
        overlay.style.display = 'block';
    }
})
document.getElementById('search-type').addEventListener('change', async function () {
    redraw();
})
document.getElementById('edit_btn').addEventListener('click', async function() {
    editProfile();
})
redraw();
// var overlay = document.getElementById('overlay');
// document.addEventListener('click', function(event) {
// if (!overlay.contains(event.target)) {
//     overlay.style.display = 'block';
// }
// });
