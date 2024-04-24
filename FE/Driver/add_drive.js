var Name_Driver=document.getElementById("Name_Driver").value;
var DoB= document.getElementById("DoB_Driver").value;
var Phone= document.getElementById("Phone_Driver").value;
var ID= document.getElementById("ID_Driver").value;
var IMG_Driver= document.querySelector("#IMG_Driver").files[0];
var Lisence_Rank= document.getElementById("Lisence_Rank").value;
var Lisence_Id= document.getElementById("Lisence_ID").value;
var Lisence_BD= document.getElementById("Lisence_BD").value;
var Lisence_Experies= document.getElementById("Lisence_Experies").value;
var Front_License= document.querySelector("#Front_License").files[0];
var Back_Lisence= document.querySelector("#Back_Lisence").files[0];

import { driver_wrapper } from "../../BE/Driver_Wrapper.js"
import { driverLicense } from "../../BE/Driver.js"


document.getElementById("add_driver").addEventListener("click", async function () {
        var wrap = new driver_wrapper();
        var li = new driverLicense(Lisence_Id, Lisence_Rank, Lisence_BD, Lisence_Experies, Front_License, Back_Lisence)
        wrap.create(Name_Driver, DoB, Phone, ID, IMG_Driver, li);

        // wrap.create(ID, , )
    })
