function isExisted(value)
{
    if(value !== undefined && value.toString().trim() != ''&& value.toString().trim() !='N/A' && value !== null && value.toString().toUpperCase()!='NOT FOUND' &&value != false)
            if (Object.keys(value).length>0)
            {
                for(let key in value)
                {
                    if(value[key] !== undefined && value[key].toString().trim() !== ''&& value[key].toString().trim() !=='N/A' && value[key] !== null && value[key].toString().toUpperCase()!='NOT FOUND' && value != false) return true;
                }
            }
            else return false;
    else return false;
}

function standardString(_string)
{
    const words=_string.toString().toLowerCase().split(' ');
    const standardWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
    });
    return standardWords.join(' ');
}

module.exports={isExisted,standardString}