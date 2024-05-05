// function cho alert...........................................................................
function toast({
    messeage ='',
    type='',
    func = "fff"
}){
    var main = document.getElementById('toast');
    if(main){
        const toast_body = document.createElement('div');
        document.addEventListener('keyup', function(event) {
            var keycode = event.keyCode || event.which;
            if (keycode == 13) {
                main.removeChild(toast_body);
                func();
            }
        });
        toast_body.onclick=function(e){
            if(e.target.closest('.toast__close')){
                main.removeChild(toast_body);
                func();
            }
        }
        // const icon=icons[type];
        // const delay=(duration/1000).toFixed(2);
        toast_body.classList.add('toast__body',`toast__body-${type}`);
        // toast.style.display= block;

        toast_body.innerHTML=`
        <div class="toast__tittle">
            <h3>Thông báo</h3>
        </div>
        <div class="toast__msg">
            <p>${messeage}</p>
        </div>
        <div class="toast__close">
            <button class="toast__close-btn">OK</button>
        </div> 
        `;
        main.appendChild(toast_body);

        
    }
}
// hàm alert
function Success(){
    toast({
        messeage: 'Thêm tài xế thành công',
        type: 'success',
        func: function(){
            window.location.reload();
        }
    });
}
function Warning(){
    toast({
        messeage: 'Bạn phải điền đầy đủ thông tin',
        type: 'warning',
        func: function(){
        }
    });
}
function Error(e = "Đã xảy ra lỗi"){
    toast({
        messeage: e,
        type: 'error',
        func: function(){
            window.location.reload();
        }
    });
}
function ExistID(){
    toast({
        messeage: 'Đã tồn tại ID',
        type: 'existID',
        func: function(){
            window.location.reload();
        }
    });
}

// biến vehicle_update là tên biến danh sách xe sắp bảo dưỡng được lấy từ file .json
function showNotify(){
    var notifyBox =document.getElementById('notify_box');
    notifyBox.innerHTML='';
    notifyBox.classList.add('notifyBox');
    notifyBox.style.animation=`slidein ease .4s`;
    const tittlee=document.createElement('div');
    tittlee.innerHTML='';
    tittlee.classList.add('notify_titlee');
    const tittle_h1=document.createElement('h1');
    tittle_h1.classList.add('notify_title_h1');
    tittle_h1.textContent = "Thông báo";
    const close_btn=document.createElement('div');
    close_btn.classList.add('notify_btn');
    close_btn.innerHTML=`<i class="fa-solid fa-circle-xmark"></i>`;
    close_btn.addEventListener('click', function() {
    notifyBox.style.animation=`slideout ease .4s forwards`;
    // document.getElementById('notify_box').style.display = 'none';
    });
    tittlee.appendChild(tittle_h1);
    tittlee.appendChild(close_btn);
    notifyBox.appendChild(tittlee);
    if(vehicle_update.length>0){
        document.getElementById('excla').style.display='block';
        var divNotify=document.createElement('div');
        divNotify.classList.add('divNotify');
        vehicle_update.forEach(function(vehicle){
            const time=vehicle.Time;
            const BSX=vehicle.plateNumber;
            const notify_toast=document.createElement('div');
            notify_toast.classList.add('notify_toast');
            notify_toast.innerHTML=`
                    <div class="notify_toast__icon">
                        <i class="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                    <div class="notify_toast__body">
                        <h3 class="notify_toast__title">Bảo Dưỡng</h3>
                        <p class="notify_toast__msg">Xe có biển số ${BSX} cần được bảo dưỡng trong ${time} ngày nữa </p>
                    </div>
                    `;
                divNotify.appendChild(notify_toast);
        })
        notifyBox.appendChild(divNotify);
    }else{
        const nothing=document.createElement('p');
        nothing.textContent="Không có thông báo mới";
        notifyBox.appendChild(nothing);
    }
    
}

export { toast, Success, Warning, Error, ExistID, showNotify};