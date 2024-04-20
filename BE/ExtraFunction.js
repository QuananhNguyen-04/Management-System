//          SOME FUNCTION NEEDED TO OPTIMIZE CODING: START
//const {driver,driverLicense} = require("./Driver");

function setExpiry(_driver)
{
    let expiration;
    
    if(isExisted(_driver.license)) expiration=_driver.license.getExpiryTime();
    else console.log("License: empty");
    console.log("expiration: ",expiration);
    if(isExisted(expiration))
    {
        _driver.license.expiry=setTimeout(()=>{
            _driver.license.updateLicenseInfo('expiryDate','Expired');
            _driver.update();
        },expiration);
    }
}


function clearExpiry(_driver)
{
    clearTimeout(_driver.expiry);
}


function compareDriver(a, b)
{
    return (a.id==b.id && a.license.id==b.license.id && a.license.tier==b.license.tier && a.license.img==b.license.img && a.license.expiryDate == b.license.expiryDate && a.yearsOfExp==b.yearsOfExp && a.status==b.status && a.recentTrip==b.recentTrip && a.workingTime==b.workingTime && a.efficiency==b.efficiency); 
    //Chưa có so sánh Trip
}


function setInfo(info, value)
{
    if(isExisted(value)) info = value;
    else info = 'N/A';
    return info;
}


function isExisted(value)
{
    if(value !== undefined && value.toString().trim() != ''&& value.toString().trim() !='N/A' && value !== null && value.toString().toUpperCase()!='NOT FOUND' &&value != false)
        if(Object.keys(value).length>1) 
        {
            if (Object.keys(value).length>0)
            {
                for(let key in value)
                {
                    if(value[key] !== undefined && value[key].toString().trim() !== ''&& value[key].toString().trim() !=='N/A' && value[key] !== null && value[key].toString().toUpperCase()!='NOT FOUND' && value != false) return true;
                }
            }
            else return false;
        }
        else return true;
    else return false;
}

module.exports= {setExpiry,clearExpiry,compareDriver,setInfo,isExisted}
//          SOME FUNCTION NEEDED TO OPTIMIZE CODING: END
