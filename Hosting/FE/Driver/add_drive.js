var Name_Driver = document.getElementsByName("Name_Driver").values;
var DoB = document.getElementsByName("DoB_Driver").values;
var Phone = document.getElementsByName("Phone_Driver").values;
var ID = document.getElementsByName("ID_Driver").values;
var IMG_Driver = document.getElementsByName("IMG_Driver").values;
var Lisence_Rank = document.getElementsByName("Lisence_Rank").values;
var Lisence_Id = document.getElementsByName("Lisence_ID").values;
var Lisence_BD = document.getElementsByName("Lisence_BD").values;
var Lisence_Experies = document.getElementsByName("Lisence_Experies").values;
var Front_License = document.getElementsByName("Front_License").values;
var Back_Lisence = document.getElementsByName("Back_Lisence").values;

import { driver_wrapper } from "../../BE/Driver_Wrapper.js"
import { driverLicense } from "../../BE/Driver.js"


document.getElementById("add_driver").
addEventListener("click", async function () {
        var wrap = new driver_wrapper();
        var li = new driverLicense(Lisence_Id, Lisence_Rank, Lisence_BD, Lisence_Experies, Front_License, Back_Lisence)
        wrap.create(Name_Driver, DoB, Phone, ID, IMG_Driver, li);

        // wrap.create(ID, , )
    })
