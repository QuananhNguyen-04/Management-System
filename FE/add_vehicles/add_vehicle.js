function showForm(formId) {
    // Ẩn tất cả các biểu mẫu
    document.getElementById('Truck').style.display = 'none';
    document.getElementById('Coach').style.display = 'none';
    document.getElementById('Container').style.display = 'none';

    // Hiển thị biểu mẫu được chọn
    document.getElementById(formId).style.display = 'block';
}