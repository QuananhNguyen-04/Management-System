import { driver, driverLicense } from "../../BE/Driver";
import { driver_wrapper } from "../../BE/Driver_Wrapper";

let driverList = new driver_wrapper();
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
    document.getElementById('profile-picture').src = driver.profilePicture;
    document.getElementById('driving-license').src = driver.drivingLicense;
    document.getElementById('profile-name').textContent = driver.name;
    document.getElementById('profile-info').textContent = driver.personalInfo;
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
    document.getElementById('edit-type').value = driver.type;
    document.getElementById('edit-phone').value = driver.phone;
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
function updateDriver() {
    // console.log(dIndex);
    var newName = document.getElementById('edit-name').value;
    var newType = document.getElementById('edit-type').value;
    var newPhone = document.getElementById('edit-phone').value;

    filteredDrivers[dIndex].name = newName;
    filteredDrivers[dIndex].type = newType;
    filteredDrivers[dIndex].phone = newPhone;

    // Hiển thị lại thông tin
    showProfile(dIndex);
    redraw();

    // Ẩn phần chỉnh sửa và hiển thị thông báo cập nhật
    document.querySelector('.edit-container').style.display = 'none';
    // document.querySelector('.update-text').style.display = 'block';ppppppppppppppppppppppppppppppppppppppppppppppppp
    document.querySelector('.profile-container button:nth-child(3)').style.display = 'inline'; // Hiển thị nút "Chỉnh sửa"
    // document.querySelector('.profile-container button:nth-child(4)').style.display = 'inline'; // Hiển thị nút "Đóng"
}


// Xử lý sự kiện khi nhấn nút tìm kiếm
var redraw = function () {
    var selectedType = document.getElementById('search-type').value;
    var searchText = document.getElementById('search-text').value.toLowerCase();
    filteredDrivers = drivers.filter(function (driver) {
        return (driver.type === selectedType || selectedType === '') && (driver.name.toLowerCase().includes(searchText) || searchText.trim() === '');
    });

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

            cell = row.insertCell();
            cell.textContent = driver.type;

            cell = row.insertCell();
            cell.textContent = driver.phone;
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

redraw();
// var overlay = document.getElementById('overlay');
// document.addEventListener('click', function(event) {
// if (!overlay.contains(event.target)) {
//     overlay.style.display = 'block';
// }
// });


search_driver();