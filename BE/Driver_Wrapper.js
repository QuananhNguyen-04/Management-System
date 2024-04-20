const {driver} =require("./Driver");
const {isExisted} = require("./ExtraFunction");
const {searchDriverByInfo,searchDriver,fetchDriverList,editDriver,pushNewDriver,deleteDriver} = require('./fetchDriver');

class driver_wrapper
{
    constructor()
    {
        this.driverList = [];
        let construct=fetchDriverList(this.driverList);
        if(construct)
        {
            console.log('Create driverWrapper successfully.');
            //console.log(this.driverList);
        }
        else
        {
            console.log('Fail: something wrong happened.');  
        }
        
    }

    get size()
    {
        return this.driverList.length;
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

    async add(oldDriver)
    {
        let newDriver=oldDriver.copy();
        console.log("New driver:\n",newDriver);
        let temp=await searchDriver(newDriver);
        if(!isExisted(temp))
        {
            this.driverList[newDriver.id]=newDriver;        
            await pushNewDriver(newDriver);
            console.log("Added.");
        }
        else console.log('Add: Id existed.');
    }

    async delete(driver)
    {
        let temp=await searchDriver(driver);
        if(isExisted(temp)) 
        {
            this.driverList.splice(driver.id,1);
            temp.forEach(async (doc) => {await deleteDriver(doc.id);});
        }
        else 
            console.log("Delete: Undefined driver.");
            
    }

    async searchByInfoType(infoType, value) //return an array of drivers who has the same info
    {
        let temp=await searchDriverByInfo(infoType,value);
        let list=[];
        if(!isExisted(temp)) return list;
        temp.forEach(doc => {list.push(doc.data());});
        list.forEach(element => {console.log(element);});
        return list;
    }

    async edit(oldDriver, newDriver)
    {
        let temp=await searchDriver(oldDriver);
        if(isExisted(temp))
        {
            if(oldDriver.id!=newDriver.id)
            {
                this.driverList[newDriver.id]=newDriver;
                this.driverList.splice(oldDriver.id,1);
            }
            else this.driverList[oldDriver.id]=newDriver;
            for (const doc of temp) {
                await (async () => {
                  await editDriver(doc.id, newDriver);
                })();
              }
        }
        else console.log('Edit: Undefined driver.');
    }

    async editInfoType(oldDriver,infoType,value)
    {
        let temp=await searchDriver(oldDriver);
        if(isExisted(temp))
        {
            if(infoType=='id')
            {
                this.driverList.splice(oldDriver.id,1);
            }
            oldDriver.updateDriverInfo(infoType,value);
            this.driverList[oldDriver.id]=oldDriver;
            for (const doc of temp) {
                await (async () => {
                  await editDriver(doc.id, newDriver);
                })();
              }
        }
        
    }
}

module.exports={driver_wrapper};