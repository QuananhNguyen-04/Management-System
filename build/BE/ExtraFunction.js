//          SOME FUNCTION NEEDED TO OPTIMIZE CODING: START
//const {driver,driverLicense} = require("./Driver");
import { standardString, isExisted } from "./ExtraFunction2.js";

function setExpiry(_driver) {
    let expiration;

    if (isExisted(_driver.license)) expiration = _driver.license.getExpiryTime();
    else console.log("License: empty");
    console.log("expiration: ", expiration);
    if (isExisted(expiration)) {
        _driver.license.expiry = setTimeout(() => {
            _driver.license.updateLicenseInfo('expiryDate', 'Expired');
            _driver.update();
        }, expiration);
    }
}



function convertToObject(_object) {
    if (!isExisted(_object)) {
        console.log('Non exist.');
        return 'N/A';
    }
    if (Object.keys(_object).length > 1) {
        //console.log('Converted.');
        _object = Object.assign({}, _object);
        //console.log(typeof _object);
    }
    else {
        //console.log('Convert: string');
        _object = standardString(_object);
    }
    return _object;
}

function clearExpiry(_driver) {
    clearTimeout(_driver.expiry);
}


function compareDriver(a, b) {
    return (a.id == b.id && a.license.id == b.license.id && a.license.tier == b.license.tier && a.license.img == b.license.img && a.license.expiryDate == b.license.expiryDate && a.yearsOfExp == b.yearsOfExp && a.status == b.status && a.recentTrip == b.recentTrip && a.workingTime == b.workingTime && a.efficiency == b.efficiency);
    //Chưa có so sánh Trip
}


function setInfo(info, value) {
    if (isExisted(value)) info = value;
    else info = 'N/A';
    return info;
}




export { setExpiry, clearExpiry, compareDriver, setInfo, convertToObject }
//          SOME FUNCTION NEEDED TO OPTIMIZE CODING: END
