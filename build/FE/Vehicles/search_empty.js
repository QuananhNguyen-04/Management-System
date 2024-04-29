import { vehicles_wrapper } from "../../BE/Vehicle_Wrapper.js";
import { fetchDriver } from "../../BE/driverDatabaseInteract.js";
import { db, doc, getDoc } from "../../BE/firebase_Init.js";
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

// Function hiển thị profile của tài xế và phụ xe
async function showProfile(index) {
    var driver = filteredDrivers[index];
    currentDriverIndex = index;
    let maintain = driver['maintenance'];
    let dr = null;
    if (maintain != null) {
        dr = await fetchDriver(maintain.driver_Id);
        dr = dr.data();
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
    document.getElementById('profile-driver-photo').src = dr.idCard;
    }
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
    document.getElementById('edit-main-driver').value = driver.mainDriver;
    document.getElementById('edit-main-driver-dob').value = driver.mainDriverDOB;
    document.getElementById('edit-main-driver-hometown').value = driver.mainDriverHometown;
    document.getElementById('edit-main-driver-phone').value = driver.mainDriverPhone;
    document.getElementById('edit-status-vehicle').value = driver.statusVehicle;
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
function updateDriver() {
    var driver = filteredDrivers[currentDriverIndex];
    driver.mainDriver = document.getElementById('edit-main-driver').value;
    driver.mainDriverPhone = document.getElementById('edit-main-driver-phone').value;
    driver.statusVehicle = document.getElementById('edit-status-vehicle').value;

    // driver.imageUrl[0] = document.getElementById('edit-image-url').value;
    // redraw()
    // Cập nhật xong, ẩn form chỉnh sửa và hiển thị profile
    document.querySelector('.edit-form').style.display = 'none';
    document.querySelector('.profile-container').style.display = 'block';
    // Hiển thị thông tin cập nhật trên profile
    document.getElementById('profile-name').textContent = "Biển số xe: " + driver.plateNumber;
    document.getElementById('profile-type').textContent = "Loại xe: " + driver.type;
    document.getElementById('profile-phone').textContent = "Số điện thoại tài xế: " + driver.mainDriverPhone;
    var profileImages = document.getElementById('profile-images');
    profileImages.innerHTML = '';
    driver.imageUrl.forEach(function (imageUrl) {
        var img = document.createElement('img');
        img.src = imageUrl;
        img.onclick = function () {
            window.open(imageUrl, '_blank');
        };
        profileImages.appendChild(img);
    });

    // Hiển thị thông tin tài xế và phụ xe
    document.getElementById('profile-driver-name').textContent = "Tên tài xế: " + driver.mainDriver;
    document.getElementById('profile-driver-dob').textContent = "Ngày sinh: " + driver.mainDriverDOB;
    document.getElementById('profile-driver-hometown').textContent = "Quê quán: " + driver.mainDriverHometown;
    document.getElementById('profile-driver-photo').src = driver.mainDriverPhoto;
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
        filteredDrivers.forEach(async function (driver, index) {
            var row = table.insertRow();
            // var values = [driver.type, driver.plateNumber, driver.mainDriver, driver.mainDriverPhone, driver.statusVehicle, driver.imageUrl[0]];
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
            console.log("vehicle: ", driver)
            // Assuming 'driver' is your JSON object
            for (const key of features) {
                if (driver.hasOwnProperty(key)) {
                    if (key == "status") {
                        if (driver[key] === 3) {
                            cell = row.insertCell();
                            cell.textContent = null;
                            cell = row.insertCell();
                            cell.textContent = null;
                            cell = row.insertCell();
                            cell.textContent = "Chưa Sử Dụng";
                            continue
                        }
                        let maintain = driver["maintenance"];
                        if (maintain !== null) {
                            console.log("maintain: ", maintain);
                            let id = maintain.driver_Id;
                            let dr = await fetchDriver(id);
                            if (dr != 'Not found') {
                                dr = dr.data();
                                console.log("driver: ", dr);
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
                    var value = driver[key];
                    if (key == "VehicleType") {
                        switch (driver[key]) {
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
            console.log("loc:", driver.imgCard)
            img.src = driver.imgCard != null? driver.imgCard: "";
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
    updateDriver();
})
document.getElementById('search-type').addEventListener('change', async function () {
    // let vlistfree = await wrap.Advanced_search(["VehicleType", "status"], ["...", 3])
    // let vlistmaintain = await wrap.Advanced_search(["VehicleType", "status"], ["...", 2])
    redraw();
})