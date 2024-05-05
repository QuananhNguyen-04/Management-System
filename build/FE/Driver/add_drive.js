import { driver } from "../../BE/Driver.js";
import { driverLicense } from "../../BE/Driver.js"
import { isExisted } from "../../BE/ExtraFunction2.js";
import { pushFile, searchDriverByInfo } from "../../BE/driverDatabaseInteract.js";
import {Warning, ExistID, Success, Error, showNotify} from "../alertbox.js"
document.getElementById("submitt").addEventListener("click", async function (e) {
    e.preventDefault();

    var Name_Driver = document.getElementById("Name_Driver").value;
    var DoB = document.getElementById("DoB_Driver").value;
    var Phone = document.getElementById("Phone_Driver").value;
    var ID = document.getElementById("ID_Driver").value;
    var IMG_Driver = document.querySelector("#IMG_Driver").files[0];
    var License_Rank = document.getElementById("License_Rank").value;
    var License_Id = document.getElementById("License_ID").value;
    var License_BD = document.getElementById("License_BD").value;
    var License_Experies = document.getElementById("License_Experies").value;
    var Front_License = document.querySelector("#Front_License").files[0];
    var Back_License = document.querySelector("#Back_License").files[0];

    if (!isExisted(ID) || !isExisted(Name_Driver)
        || !isExisted(DoB) || !isExisted(Phone)
        || !isExisted(IMG_Driver) || !isExisted(License_Rank)
        || !isExisted(License_Id) || !isExisted(License_BD)
        || !isExisted(License_Experies) || !isExisted(Front_License)
        || !isExisted(Back_License)) {
        Warning();
        return;
    }
    let exist = searchDriverByInfo('id', ID);
    if (!isExisted(exist)) {
        IMG_Driver = await pushFile('DRIVER/', IMG_Driver, ID, 'driverID');
        Front_License = await pushFile('LICENSE/', Front_License, License_Id, 'frontLicense');
        Back_License = await pushFile('LICENSE/', Back_License, License_Id, 'LICENSE/backLicense');
    }
    else {
        ExistID();
    }
    var _license = new driverLicense(License_Id, License_Rank, License_BD, License_Experies, Front_License, Back_License);
    var _driver = new driver(Name_Driver, DoB, Phone, ID, IMG_Driver, _license, 0, 2, null, 0, null);
    var temp = await _driver.push();
    if (temp) Success();
    else ExistID();
});
