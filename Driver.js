/*driver info
- ID:           Số CCCD
- License:      Object
    + ID:           số của bằng lái (!= số CCCD)
    + tier:         hạng của bằng lái
    + img:          ảnh của bằng lái
    + expiry:       ngày hết hạn bằng lái
        * Alert:    hết hạn
- yearsOfExp:   số năm kinh nghiệm (có thể thêm bộ đếm)
- recentTrip:   Object
- status:       active/inactive
- workingTime:  số giờ làm việc trong ngày 
    + Alert:        Chạm ngưỡng 10 tiếng trong ngày
    + Reset:        
- efficiency:   đánh giá từ manager        
- other:        Object (đề phòng cần thêm những thông tin cá nhân nhưng ko dùng tới trong BE)
*/

//import { set } from "firebase/database";


//          SOME FUNCTION NEEDED TO OPTIMIZE CODING: START
export function isExisted(value)
{
    if(value !== undefined && value.trim() !== ''&&value !=='N/A') return true;
    return false;
}
export function isObjectExisted(S)
{
    if (isExisted(S))
    {
        for(let key in S)
        {
            if(isExisted(S[key])) return true;
        }
    }
    return false;
}
export function compareDriver(a, b)
{
    return (a.id==b.id && a.license==b.license && a.yearsOfExp==b.yearsOfExp && a.status==b.status && a.recentTrip==b.recentTrip && a.workingTime==b.workingTime && a.efficiency==b.efficiency); 
}
export function setInfo(info, value)
{
    if(isExisted(value)) info = value;
    else info = 'N/A';
    return info;
}

//          SOME FUNCTION NEEDED TO OPTIMIZE CODING: END



export class driverLicense
{
    constructor(id, tier, img, expiryDate)
    {
        this.id = setInfo(this.id,id);
        this.tier = setInfo(this.tier,tier);
        this.img = setInfo(this.img,img);
        this.expiryDate = setInfo(this.expiryDate,expiryDate);
        this.setExpiryDate();
        
    }

    setExpiryDate()
    {
        if(isExisted(this.expiryDate)&&this.expiryDate!=='Expired')
        {
            let expiration=Date.parse(this.expiryDate) - new Date();
            if (expiration<2000) expiration=2000;
            this.expiry=setTimeout(()=>{this.expiryDate='Expired';},expiration);
        }
    }

    updateLicenseInfo(infoType,newValue)
    {
        switch(infoType)
        {
            case 'id':
                this.id=setInfo(this.id,newValue);
                break;
            case 'tier':
                this.tier=setInfo(this.tier,newValue);
                break;
            case 'img':
                this.img=setInfo(this.img,newValue);
                break;
            case 'expiryDate':
                this.expiryDatae=setInfo(this.expiryDate,newValue);
                clearTimeout(this.expiry);  // Cancel the expiry schedule
                this.setExpiryDate();
                break;
            default:
                console.log('Invalid info type.');
        }
    }
}

export class driver 
{
    constructor(id, license, yearsOfExp, status, recentTrip, workingTime, efficiency/*,other*/)
    {
        this.id = setInfo(this.id,id);
        //this.id = parseInt(this.id,10);
        this.license = setInfo(this.license, license);
        this.yearsOfExp = setInfo(this.yearsOfExp, yearsOfExp);
        this.status = setInfo(this.status,status);
        this.recentTrip = setInfo(this.recentTrip,recentTrip);
        this.workingTime = setInfo(this.workingTime,workingTime);
        this.efficiency = setInfo(this.efficiency,efficiency);
        //this.other = setInfo(this.other,other);
    }

    driverInfo()
    {
        console.log('ID: ', this.id);
        console.log('License: ', this.license);
        console.log('Years of Experiment: ', this.yearsOfExp);
        console.log('Status: ', this.status);
        console.log('Recent Trip: ', this.recentTrip);
        console.log('Work Hours: ', this.workingTime);
        console.log('Efficiency: ', this.efficiency);
        //console.log(this);
    }

    updateDriverInfo(infoType, newValue)
    {
        switch(infoType)
        {
            case 'id':
                this.id=setInfo(this.id,newValue);
                break;
            case 'license':
                this.license=setInfo(this.license,newValue);
                break;
            case 'yearsOfExp':
                this.yearsOfExp=setInfo(this.yearsOfExp,newValue);
                break;
            case 'status':
                this.status=setInfo(this.status,newValue);
                break;
            case 'recentTrip':
                this.recentTrip=setInfo(this.recentTrip,newValue);
                break;
            case 'workingTime':
                this.workingTime=setInfo(this.workingTime,newValue);
                break;
            case 'efficiency':
                this.efficiency=setInfo(this.efficiency,newValue);
                break;
            default:
                console.log('Invalid info type.');
        }
    }


}