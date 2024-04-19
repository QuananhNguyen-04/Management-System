
    let buttonActive=null;
    var control_Plate;
    // var weight;
    var type;
    var img1;
    var img2;
    var img3;
    var img4;
    function showForm(formId) {
    if(buttonActive){
        buttonActive.classList.remove('active');
    }
    const button=document.getElementById(`btn_${formId}`);
    button.classList.add('active');
    buttonActive=button;
    document.getElementById('Truck').style.display = 'none';
    document.getElementById('Coach').style.display = 'none';
    document.getElementById('Container').style.display = 'none';

    
    document.getElementById(formId).style.display = 'block';
    }
    function submitTruck(){
        type="TRUCK";
        control_Plate=document.querySelector("#Truck input[name='Control_Plate']").value;
        var weight=document.querySelector("#Truck input[name='Weight_Vehicle']").value;
        var fuel=document.querySelector("#Truck input[name='Fuel_Vehicle']").value;
        img1=document.querySelector("#Truck input[name='IMG_Vehicle1']").value;
        img2=document.querySelector("#Truck input[name='IMG_Vehicle2']").value;
        img3=document.querySelector("#Truck input[name='IMG_Vehicle3']").value;
        img4=document.querySelector("#Truck input[name='IMG_Vehicle4']").value;
    }
    
    function submitCoach(){
        type="COACH";
        control_Plate=document.querySelector("#Coach input[name='Control_Plate']").value;
        var capacity=document.querySelector("#Coach input[name='Capacity_Vehicle']").value;
        var speciality=document.querySelector("#Coach input[name='Speciality_Vehicle']").value;
        img1=document.querySelector("#Coach input[name='IMG_Vehicle1']").value;
        img2=document.querySelector("#Coach input[name='IMG_Vehicle2']").value;
        img3=document.querySelector("#Coach input[name='IMG_Vehicle3']").value;
        img4=document.querySelector("#Coach input[name='IMG_Vehicle4']").value;
    }
    function submitContainer(){
        type="Container";
        control_Plate=document.querySelector("#Container input[name='Control_Plate']").value;
        var weight=document.querySelector("#Container input[name='Weight_Vehicle']").value;
        var height=document.querySelector("#Container input[name='Height_Vehicle']").value;
        var length=document.querySelector("#Container input[name='Length_Vehicle']").value;
        var max_load=document.querySelector("#Container input[name='MaxLoad_Vehicle']").value;
        img1=document.querySelector("#Container input[name='IMG_Vehicle1']").value;
        img2=document.querySelector("#Container input[name='IMG_Vehicle2']").value;
        img3=document.querySelector("#Container input[name='IMG_Vehicle3']").value;
        img4=document.querySelector("#Container input[name='IMG_Vehicle4']").value;
    }
    