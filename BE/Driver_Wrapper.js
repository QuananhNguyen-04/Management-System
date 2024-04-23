import { driver } from "./Driver.js";
import { convertToObject } from "./ExtraFunction.js";
import { isExisted } from "./ExtraFunction2.js";
import { searchDriverByInfo, searchDriver, fetchDriverList, editDriver, pushNewDriver, fetchDriver, deleteDriver } from './driverDatabaseInteract.js';
import { driver } from "./Driver.js";
import { convertToObject } from "./ExtraFunction.js";
import { isExisted } from "./ExtraFunction2.js";
import { searchDriverByInfo, searchDriver, fetchDriverList, editDriver, pushNewDriver, fetchDriver, deleteDriver } from './driverDatabaseInteract.js';

class driver_wrapper
{
    constructor()
    {
        this.driverList = {};
        this.fetch();
    }
    async fetch()
    {
        let construct=await fetchDriverList(this.driverList);
        if(construct)
        {
            console.log('Create driverWrapper successfully.');
            //console.log(this.driverList);
            //console.log(this.driverList);
        }
        else
        {
            console.log('Fail: something wrong happened.');  
        }
    }
    
    get size()
    {
        return Object.keys(this.driverList).length;
    }

    create(id, license, yearsOfExp, status, recentTrip, workingTime, efficiency/*,other*/)
    {
        let newDriver=new driver(id, license, yearsOfExp, status, recentTrip, workingTime, efficiency/*,other*/);
        this.add(newDriver);
    }

    async add(_driver)
    {
        //let newDriver=oldDriver.copy();
        //console.log("New driver:\n",newDriver);
        let temp=await searchDriver(_driver);
        if(!isExisted(temp))
        {
            let newDriver=await pushNewDriver(_driver);
            this.driverList[_driver.id]=newDriver;
            console.log("Add: Success.");
        }
        else console.log('Add: Id existed.');
        else console.log('Add: Id existed.');
    }

    async delete(driverDoc)
    {
        //let temp=await searchDriver(driver);
        
        try
        {
            let temp=await fetchDriver(driverDoc.id);
            if(isExisted(temp)) 
            {
                delete this.driverList[driverDoc.data().id];
                await deleteDriver(temp.id);
            }
            else 
                console.log("Delete: Undefined driver.");
        }
        catch (error)
        {
            console.log('Error deleting driver: ',error);
        }
        
            
    }

    async searchByInfoType(infoType, value) //return an array of drivers who has the same info
    async searchByInfoType(infoType, value) //return an array of drivers who has the same info
    {
        let temp=await searchDriverByInfo(infoType,value);
        let list=[];
        if(!isExisted(temp)) return list;
        for(const a of temp)
        {
            list.push(a.data());
        }
        return list;
    }

    async edit(driverDoc,value)
    {
        let newDriver=convertToObject(value);
        let temp=await fetchDriver(driverDoc.id);
        if(isExisted(temp))
        {
            await editDriver(temp.id,newDriver);
            if(driverDoc.data().id!=value.id)
            {
                delete this.driverList[driverDoc.data().id];
                this.driverList[value.id]=temp;
            }
            console.log('Edit: success');
        }
        else console.log('Edit: Undefined driver.');
        else console.log('Edit: Undefined driver.');
    }

    async editInfoType(driverDoc,infoType,value)
    {
        try
        {
            let temp=await fetchDriver(driverDoc.id);
            if(isExisted(temp))
            {
                let _driver=new driver();
                _driver.assign(temp.data());
                _driver.updateDriverInfo(infoType,value);
                if(infoType=='id')
                {
                    delete this.driverList[temp.data().id];
                    this.driverList[_driver.id]=temp;
                }
                await editDriver(temp,_driver);
            }
        }
        catch(error)
        {
            console.log('Error editing info: ', error);
        }
    }
}

export {driver_wrapper};