import {driver,compareDriver,isExisted,setInfo,driverLicense,isObjectExisted} from "./Driver";

export class driver_wrapper
{
    constructor()
    {
        this.driverList = {};
        this.idList = {};
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
        this.size = 0;
    }

    getSize()
    {
        this.size = this.driverList.length;
        return this.size;
    }

    add(newDriver)
    {
        if(this.driverList[newDriver.id].isEx )
        {
            this.driverList[newDriver.id]=newDriver;
            this.idList[size]=newDriver.id;
            this.size++;
        }
        else console.log('Fail: Existed driver. ID duplicated.');
    }

    delete(driver)
    {
        let temp=search(driver);
        if(temp !== 'N/A' ) 
        {
            this.driverList.splice(driver.id,1);
            this.idList.splice(this.idList.indexOf(driver.id),1);
            this.size--;
        }
        else console.log("Fail: Undefined driver.");
    }
    deleteByID(id)
    {
        if(isExisted(id)&&isObjectExisted(this.driverList[id]))
        {
            this.driverList.splice(id,1);
            this.idList.splice(this.idList.indexOf(id),1);
            this.size--;
        }
        else console.log("Fail: Undefined driver.");
    }
    searchByID(id)
    {
        let temp;
        if(isExisted(id)) temp=this.driverList[id];
        else return 'N/A';
        if(isObjectExisted(temp)) return id;
        else return 'N/A';
    }
    search(driver)
    {
        if(isObjectExisted(driver))
        {
            if(isExisted(driver.id)&&isObjectExisted(this.driverList[driver.id]))
            {
                let temp=this.driverList[driver.id];
                if (compareDriver(temp,driver)) return driver.id;
            }
        }
        else 
            {
                console.log("Fail: Undefined driver.");
                return 'N/A';
            }
    }

    editNew(oldDriver, newDriver)
    {
        if(!isObjectExisted(newDriver)) //may cause some bug due to front-end signal
        {
            this.delete(oldDriver.id);
        }
        else
        {
            this.driverList[newDriver.id]=newDriver;
            if(oldDriver.id!==newDriver.id) this.delete(oldDriver.id);
        }
    }
    /*editByType()
    {

    }*/

}