var drivers = [
    { 
      plateNumber: '29B-12345', 
      mainDriver: 'Tài xế 1', 
      mainDriverDOB: '01/01/1980', 
      mainDriverHometown: 'Hà Nội', 
      mainDriverPhone: '0123456789', 
      assistantDriver: 'Phụ xe 1', 
      assistantDriverDOB: '02/02/1985', 
      assistantDriverHometown: 'Hải Phòng', 
      assistantDriverPhone: '0987654321', 
      route: 'Hà Nội - TP.HCM', 
      type: 'Xe khách', 
      mainDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
      assistantDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
      imageUrl: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'] 
    },
    { 
      plateNumber: '29B-12346', 
      mainDriver: 'Tài xế 2', 
      mainDriverDOB: '01/01/1980', 
      mainDriverHometown: 'Hà Nội', 
      mainDriverPhone: '0123456789', 
      assistantDriver: 'Phụ xe 2', 
      assistantDriverDOB: '02/02/1985', 
      assistantDriverHometown: 'Hải Phòng', 
      assistantDriverPhone: '0987654321', 
      route: 'Hà Nội - TP.HCM2', 
      type: 'Xe tải', 
      mainDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
      assistantDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
      imageUrl: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'] 
    },
    { 
      plateNumber: '29B-12346', 
      mainDriver: 'Tài xế 3', 
      mainDriverDOB: '01/01/1980', 
      mainDriverHometown: 'Hà Nội', 
      mainDriverPhone: '0123456789', 
      assistantDriver: 'Phụ xe 3', 
      assistantDriverDOB: '02/02/1985', 
      assistantDriverHometown: 'Hải Phòng', 
      assistantDriverPhone: '0987654321', 
      route: 'Hà Nội - TP.HCM2', 
      type: 'Xe khách', 
      mainDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
      assistantDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
      imageUrl: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'] 
    },
    { 
        plateNumber: '29B-12346', 
        mainDriver: 'Tài xế 4', 
        mainDriverDOB: '01/01/1980', 
        mainDriverHometown: 'Hà Nội', 
        mainDriverPhone: '0123456789', 
        assistantDriver: 'Phụ xe 3', 
        assistantDriverDOB: '02/02/1985', 
        assistantDriverHometown: 'Hải Phòng', 
        assistantDriverPhone: '0987654321', 
        route: 'Hà Nội - TP.HCM2', 
        type: 'Xe khách', 
        mainDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
        assistantDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
        imageUrl: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'] 
      },
      { 
        plateNumber: '29B-12346', 
        mainDriver: 'Tài xế 5', 
        mainDriverDOB: '01/01/1980', 
        mainDriverHometown: 'Hà Nội', 
        mainDriverPhone: '0123456789', 
        assistantDriver: 'Phụ xe 3', 
        assistantDriverDOB: '02/02/1985', 
        assistantDriverHometown: 'Hải Phòng', 
        assistantDriverPhone: '0987654321', 
        route: 'Hà Nội - TP.HCM2', 
        type: 'Xe tải', 
        mainDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
        assistantDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
        imageUrl: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'] 
      },
      { 
        plateNumber: '29B-12346', 
        mainDriver: 'Tài xế 6', 
        mainDriverDOB: '01/01/1980', 
        mainDriverHometown: 'Hà Nội', 
        mainDriverPhone: '0123456789', 
        assistantDriver: 'Phụ xe 3', 
        assistantDriverDOB: '02/02/1985', 
        assistantDriverHometown: 'Hải Phòng', 
        assistantDriverPhone: '0987654321', 
        route: 'Hà Nội - TP.HCM2', 
        type: 'Xe container', 
        mainDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
        assistantDriverPhoto: 'https://photocross.net/wp-content/uploads/2020/03/anh-chan-dung.jpg', 
        imageUrl: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'] 
      },
    // Các dữ liệu mẫu khác...
  ];

  var filteredDrivers = [];
  var currentDriverIndex = null;

  // Function hiển thị profile của tài xế và phụ xe
  function showProfile(index) {
    var driver = filteredDrivers[index];
    currentDriverIndex = index;
    document.getElementById('profile-name').textContent = "Biển số xe: " + driver.plateNumber;
    document.getElementById('profile-type').textContent = "Loại xe: " + driver.type;
    document.getElementById('profile-phone').textContent = "Số điện thoại tài xế: " + driver.mainDriverPhone + ", Số điện thoại phụ xe: " + driver.assistantDriverPhone;
    document.getElementById('profile-route').textContent = "Lộ trình: " + driver.route;
    
    var profileImages = document.getElementById('profile-images');
    profileImages.innerHTML = '';
    driver.imageUrl.forEach(function(imageUrl) {
      var img = document.createElement('img');
      img.src = imageUrl;
      img.onclick = function() {
        window.open(imageUrl, '_blank');
      };
      profileImages.appendChild(img);
    });

    // Hiển thị thông tin tài xế và phụ xe
    document.getElementById('profile-driver-name').textContent = "Tên tài xế: " + driver.mainDriver;
    document.getElementById('profile-driver-dob').textContent = "Ngày sinh: " + driver.mainDriverDOB;
    document.getElementById('profile-driver-hometown').textContent = "Quê quán: " + driver.mainDriverHometown;
    document.getElementById('profile-driver-photo').src = driver.mainDriverPhoto;

    document.getElementById('profile-assistant-name').textContent = "Tên phụ xe: " + driver.assistantDriver;
    document.getElementById('profile-assistant-dob').textContent = "Ngày sinh: " + driver.assistantDriverDOB;
    document.getElementById('profile-assistant-hometown').textContent = "Quê quán: " + driver.assistantDriverHometown;
    document.getElementById('profile-assistant-photo').src = driver.assistantDriverPhoto;
    document.querySelector('.profile-container').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block'; // Show overlay
  }

  // Function đóng profile
  function closeProfile() {
    document.querySelector('.profile-container').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none'; // Hide overlay
  }
  document.querySelector('.overlay').addEventListener('click', function() {
    closeProfile();
  })

  // Function mở form chỉnh sửa
  // Function mở form chỉnh sửa
  function editProfile() {
    var driver = filteredDrivers[currentDriverIndex];
    document.getElementById('edit-main-driver').value = driver.mainDriver;
    document.getElementById('edit-main-driver-dob').value = driver.mainDriverDOB;
    document.getElementById('edit-main-driver-hometown').value = driver.mainDriverHometown;
    document.getElementById('edit-assistant-driver').value = driver.assistantDriver;
    document.getElementById('edit-assistant-driver-dob').value = driver.assistantDriverDOB;
    document.getElementById('edit-assistant-driver-hometown').value = driver.assistantDriverHometown;
    document.getElementById('edit-main-driver-phone').value = driver.mainDriverPhone;
    document.getElementById('edit-assistant-driver-phone').value = driver.assistantDriverPhone;
    document.getElementById('edit-main-driver-photo').value = driver.mainDriverPhoto;
    document.getElementById('edit-assistant-driver-photo').value = driver.assistantDriverPhoto;
    document.querySelector('.edit-form').style.display = 'block';
    document.querySelector('.profile-container').style.display = 'none';
    
  }
  // Thêm sự kiện click vào overlay
  document.querySelector('.overlay').addEventListener('click', function() {
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
    driver.assistantDriver = document.getElementById('edit-assistant-driver').value;
    driver.mainDriverPhone = document.getElementById('edit-main-driver-phone').value;
    driver.assistantDriverPhone = document.getElementById('edit-assistant-driver-phone').value;
    // driver.imageUrl[0] = document.getElementById('edit-image-url').value;
    // redraw()
    // Cập nhật xong, ẩn form chỉnh sửa và hiển thị profile
    document.querySelector('.edit-form').style.display = 'none';
    document.querySelector('.profile-container').style.display = 'block';
    // Hiển thị thông tin cập nhật trên profile
    document.getElementById('profile-name').textContent = "Biển số xe: " + driver.plateNumber;
    document.getElementById('profile-type').textContent = "Loại xe: " + driver.type;
    document.getElementById('profile-phone').textContent = "Số điện thoại tài xế: " + driver.mainDriverPhone + ", Số điện thoại phụ xe: " + driver.assistantDriverPhone;
    var profileImages = document.getElementById('profile-images');
    profileImages.innerHTML = '';
    driver.imageUrl.forEach(function(imageUrl) {
      var img = document.createElement('img');
      img.src = imageUrl;
      img.onclick = function() {
        window.open(imageUrl, '_blank');
      };
      profileImages.appendChild(img);
    });

    // Hiển thị thông tin tài xế và phụ xe
    document.getElementById('profile-driver-name').textContent = "Tên tài xế: " + driver.mainDriver;
    document.getElementById('profile-driver-dob').textContent = "Ngày sinh: " + driver.mainDriverDOB;
    document.getElementById('profile-driver-hometown').textContent = "Quê quán: " + driver.mainDriverHometown;
    document.getElementById('profile-driver-photo').src = driver.mainDriverPhoto;

    document.getElementById('profile-assistant-name').textContent = "Tên phụ xe: " + driver.assistantDriver;
    document.getElementById('profile-assistant-dob').textContent = "Ngày sinh: " + driver.assistantDriverDOB;
    document.getElementById('profile-assistant-hometown').textContent = "Quê quán: " + driver.assistantDriverHometown;
    document.getElementById('profile-assistant-photo').src = driver.assistantDriverPhoto;
  }

  

    // Xử lý sự kiện khi nhấn nút tìm kiếm
    

    var redraw = function() {
        var selectedType = document.getElementById('search-type').value.toLowerCase();
        var searchText = document.getElementById('search-text').value.toLowerCase();

        filteredDrivers = drivers.filter(function(driver) {
        return (driver.plateNumber.toLowerCase().includes(searchText) || searchText === '') && (driver.type.toLowerCase().includes(selectedType) || selectedType === '');
        });

        var resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';

        if (filteredDrivers.length > 0) {
        var table = document.createElement('table');
        table.id = 'result-table';

        var headerRow = table.insertRow();
        var headers = ['Loại xe', 'Biển số xe', 'Lái xe chính', 'Phụ xe', 'Số điện thoại', 'Lộ trình', 'Hình ảnh'];
        headers.forEach(function(header) {
            var th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        filteredDrivers.forEach(function(driver, index) {
            var row = table.insertRow();
            
            var values = [driver.type, driver.plateNumber, driver.mainDriver, driver.assistantDriver, driver.mainDriverPhone + ', ' + driver.assistantDriverPhone, driver.route, driver.imageUrl[0]];
            values.forEach(function(value, i) {
            var cell = row.insertCell();
            if (i === 6) {
                var img = document.createElement('img');
                img.src = value;
                img.style.maxWidth = '100px';
                cell.appendChild(img);
            } else {
                cell.textContent = value;
            }
            });
            row.addEventListener('click', function() {
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
    document.getElementById('search-btn').addEventListener('click', function() {
        redraw();
    }); 
    document.addEventListener('keypress', function(event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            redraw();
        }
    });

    redraw();