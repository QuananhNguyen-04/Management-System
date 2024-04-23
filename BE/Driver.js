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

import { setExpiry, clearExpiry, setInfo } from "./ExtraFunction.js";
import { isExisted } from "./ExtraFunction2.js";
import { searchDriverByInfo, editDriver } from "./driverDatabaseInteract.js";
//const {Trip} = require("./Trip");

class driverLicense
{
    constructor(id, tier, issuanceDate, expiryDate, frontImg, backImg)
    {
        this.id = setInfo(this.id,id);
        this.tier = setInfo(this.tier,tier);
        this.frontImg = setInfo(this.frontImg,frontImg);
        this.backImg = setInfo(this.backImg,backImg);
        this.issuanceDate = setInfo(this.issuanceDate,issuanceDate);
        this.expiryDate = setInfo(this.expiryDate,expiryDate);
        this.expiry= undefined;
    }

    getExpiryTime() {
        if (isExisted(this.expiryDate) && this.expiryDate !== 'Expired') {
            console.log("ExpiryDate: ", this.expiryDate);
            //let a=Date.parse(this.expiryDate);
            //console.log(a);
            let dl = new Date(this.expiryDate);
            console.log("dl: ", dl);
            let expiration = dl.getTime() - Date.now();
            if (expiration < 2000) expiration = 2000;
            return expiration;
        }
        else return 'N/A';
    }

    updateLicenseInfo(infoType, newValue) {
        switch (infoType) {
            case 'id':
                this.id = setInfo(this.id, newValue);
                break;
            case 'tier':
                this.tier = setInfo(this.tier, newValue);
                break;
            case 'frontImg':
                this.frontImg = setInfo(this.frontImg, newValue);
                break;
            case 'backImg':
                this.backImg = setInfo(this.backImg, newValue);
                break;
            case 'expiryDate':
                this.expiryDate = setInfo(this.expiryDate, newValue);
                break;
            case 'issuanceDate':
                this.issuanceDate = setInfo(this.issuanceDate, newValue);
                break;
            default:
                console.log('Invalid info type.');
        }
    }

    copy() {
        let newLicense = new driverLicense(this.id, this.tier, this.issuanceDate, this.expiryDate, this.frontImg, this.backImg);
        return newLicense;
    }

    assign(data) {
        this.id = setInfo(this.id, data.id);
        this.tier = setInfo(this.tier, data.tier);
        this.issuanceDate = setInfo(this.issuanceDate, data.issuanceDate);
        this.expiryDate = setInfo(this.expiryDate, data.expiryDate);
        this.frontImg = setInfo(this.frontImg, data.frontImg);
        this.backImg = setInfo(this.backImg, data.backImg);
    }
}

class driver {
    constructor(name, DoB, phoneNumber, id, idCard, license, yearsOfExp, status, recentTrip, workingTime, efficiency/*,other*/) {
        this.name = setInfo(this.name, name);
        this.DoB = setInfo(this.DoB, DoB);
        this.phoneNumber = setInfo(this.phoneNumber, phoneNumber);
        this.idCard = setInfo(this.idCard, idCard);
        this.id = setInfo(this.id, id);


        // FE nên có 1 section để tạo License luôn trong phần add driver, để tạo driverLicense luôn, còn không thì phần này sẽ trở thành N/A
        this.license = new driverLicense();
        this.license = setInfo(this.license, license);
        this.yearsOfExp = setInfo(this.yearsOfExp, yearsOfExp);

        this.status = setInfo(this.status, status);              //nên là 1 check box, chỉ trọng 1 trong 2 trạng thái active/inactive

        this.recentTrip = setInfo(this.recentTrip, recentTrip);  //chưa có import Trip class


        this.workingTime = setInfo(this.workingTime, workingTime);

        this.efficiency = setInfo(this.efficiency, efficiency);

        //this.other = setInfo(this.other,other);

        if (isExisted(license)) {
            setExpiry(this);
        }
        console.log('Driver created.');
    }


    carType() {
        //Car Type sẽ thuộc {A1,A2,A3,A4,B1,B2,B3,...}
        //Khi kiểm tra xem tài xế có thể lái một loại xe hay không, hãy so sánh giá trị này với giá trị yêu cầu tối thiểu của xe
        //<=carType() nghĩa là tài xế có thê lái xe đó
        //Ví dụ: xe khách cần tối thiểu bằng lái hạng D, carType()= B2, không được phép lái
        return this.license.tier;
    }

    updateDriverInfo(infoType, newValue) {
        switch (infoType) {
            case 'name':
                this.name = setInfo(this.name, newValue);
                break;
            case 'DoB':
                this.DoB = setInfo(this.DoB, newValue);
                break;
            case 'phoneNumber':
                this.phoneNumber = setInfo(this.phoneNumber, newValue);
                break;
            case 'id':
                this.id = setInfo(this.id, newValue);
                break;
            case 'idCard':
                this.idCard = setInfo(this.idCard, newValue);
                break;
            case 'license':
                this.license = setInfo(this.license, newValue);
                clearExpiry(this);
                setExpiry(this);
                break;
            case 'yearsOfExp':
                this.yearsOfExp = setInfo(this.yearsOfExp, newValue);
                break;
            case 'status':
                this.status = setInfo(this.status, newValue);
                break;
            case 'recentTrip':
                this.recentTrip = setInfo(this.recentTrip, newValue);
                break;
            case 'workingTime':
                this.workingTime = setInfo(this.workingTime, newValue);
                break;
            case 'efficiency':
                this.efficiency = setInfo(this.efficiency, newValue);
                break;
            default:
                console.log('Invalid info type.');
        }
    }

    async update() {
        let temp = await searchDriverByInfo('id', this.id);
        if (isExisted(temp)) {
            console.log(temp.size);
            for (const doc of temp) {
                await (async () => {
                    await editDriver(doc.id, this);
                })();
            }
        }
        else console.log('Update: Undefined driver.');
    }

    copy() {
        let newDriver = new driver(this.name, this.DoB, this.phoneNumber, this.id, this.idCard, this.license, this.yearsOfExp, this.status, this.recentTrip, this.workingTime, this.efficiency/*,other*/);
        return newDriver;
    }

    assign(data) {
        this.name = setInfo(this.name, data.name);
        this.DoB = setInfo(this.DoB, data.DoB);
        this.phoneNumber = setInfo(this.phoneNumber, data.phoneNumber);
        this.idCard = setInfo(this.idCard, data.idCard);
        this.id = setInfo(this.id, data.id);

        this.license = new driverLicense();
        this.license.assign(data);

        this.yearsOfExp = setInfo(this.yearsOfExp, data.yearsOfExp);
        this.status = setInfo(this.status, data.status);
        this.recentTrip = setInfo(this.recentTrip, data.recentTrip);
        this.workingTime = setInfo(this.workingTime, data.workingTime);
        this.efficiency = setInfo(this.efficiency, data.efficiency);

        if (isExisted(license)) {
            setExpiry(this);
        }

    }
}
export { driver, driverLicense };