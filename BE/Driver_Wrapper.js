import { driver, compareDriver, setInfo, driverLicense, setExpiry, clearExpiry } 
from "./Driver.js";
import { isExisted } 
from "./isExisted.js";
import { searchDriverByInfo, searchDriver, fetchDriverList, editDriver, pushNewDriver, deleteDriver } 
from './fetchDriver.js';

class driver_wrapper
{
    constructor()
    {
        this.driverList = [];
        this.idList = [];
        this.size = 0;

        if(fetchDriverList(this.driverList,this.idList))
        {
            console.log('Create driverWrapper successfully.');
            this.size=this.getSize();
        }
        else
        {
            console.log('Fail: something wrong happened.');
            
        }
        /*
        //Creating a Proxy of driverList to make the size variable more independent
        let handler = {
            get: function(target, property) 
            {
                if(property === 'length')
                {
                    return target.length;
                }
                return target[property];
            }
            set: function(target, property, value)
            {
                target[property] = value;
                return true;
            }
        }
        
        let proxyDriverList = new Proxy(this.driverList, handler);
        //END

        this.size = proxyDriverList.length; //size will changed every time driverList's length changed  */
        // Overcooked
        
    }
    create(id, license, yearsOfExp, status, recentTrip, workingTime, efficiency/*,other*/)
    {
        let newDriver=new driver(id, license, yearsOfExp, status, recentTrip, workingTime, efficiency/*,other*/);
        this.add(newDriver);
    }
    getSize()
    {
        this.size = this.driverList.length;
        return this.size;
    }

    add(newDriver)
    {
        let temp=searchDriver(newDriver);
        //console.log('Temp is calculated.');
        //console.log(temp);
        if(isExisted(temp))
        {
            this.driverList[newDriver.id]=newDriver;
            this.idList[this.size]=newDriver.id;                
            this.size++;
            pushNewDriver(newDriver);
            console.log("Add Success")
        }
        else console.log('Fail: Id existed.');
    }

    delete(driver)
    {
        let temp=searchDriver(driver);
        if(isExisted(temp)) 
        {
            this.driverList.splice(driver.id,1);
            this.idList.splice(this.idList.indexOf(driver.id),1);
            this.size--;
            temp.forEach(async (doc) => {deleteDriver(doc.id);});
        }
        else 
            console.log("Fail: Undefined driver.");
            
    }

    searchByInfoType(infoType, value) //return an array of drivers who has the same info
    {
        let temp=searchDriverByInfo(infoType,value);
        let list=[];
        temp.forEach(doc => {list.push(doc.data());});
        list.forEach(element => {console.log(element);});
        return list;
    }
    edit(driver, newDriver)
    {
        let temp=searchDriver(driver);
        if(isExisted(temp))
        {
            this.driverList[driver.id]=newDriver;
            this.idList[this.idList.indexOf(driver.id)]=newDriver.id;
            temp.forEach(doc => {editDriver(doc.id,newDriver);});
        }
        else console.log('Fail: Undefined driver.');
    }
    editInfoType(oldDriver,infoType,value)
    {
        let temp=searchDriver(oldDriver);
        if(isExisted(temp))
        {
            let newDriver=new driver();
            temp.forEach(doc => {newDriver=doc.data();});
            newDriver.updateDriverInfo(infoType, value);
            editDriver(oldDriver,newDriver);
        }
        else console.log('Fail: Undefined driver.');
    }
}
export {driver_wrapper};