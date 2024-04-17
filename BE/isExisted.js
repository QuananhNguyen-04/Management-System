function isExisted(value)
{
    if(value !== undefined && value.toString().trim() != ''&& value.toString().trim() !='N/A' && value !== null && value.toString().toUpperCase()!='NOT FOUND') /*return true;
    else return false;*/
        if(Object.keys(value).length>1) 
        {
            if (Object.keys(value).length>0)
    {
        for(let key in value)
        {
            if((value[key] !== undefined && value[key].toString().trim() !== ''&& value[key].toString().trim() !=='N/A' && value[key] !== null && value[key].toString().toUpperCase()!='NOT FOUND')) return true;
        }
    }
    return false;
        }
        else return true;
    return false;
}
module.exports = {isExisted};