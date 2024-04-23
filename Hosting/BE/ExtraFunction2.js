function isExisted(value) {
    // Define an array of invalid values
    const invalidValues = ['', 'N/A', 'NOT FOUND'];

    // Function to check if a value is valid
    const isValid = (val) => {
        // Convert the value to string and trim it
        const strVal = String(val).trim().toUpperCase();

        // Check if the value is not undefined, null, false, or in the invalidValues array
        return val !== undefined && val !== null && val !== false && !invalidValues.includes(strVal);
    };

    // If the value is an object, check all its properties
    if (typeof value === 'object' && value !== null) {
        for (let key in value) {
            if (isValid(value[key])) {
                return true;
            }
        }
        return false;
    }

    // If the value is not an object, just check the value itself
    return isValid(value);
}

function standardString(_string) {
    const words = _string.toString().toLowerCase().split(' ');
    const standardWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
    });
    return standardWords.join(' ');
}

export { isExisted, standardString }