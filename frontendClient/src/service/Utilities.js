export function convertToNewObject(obj) {
    const newObj = {};
    for (const prop in obj) {
        if (/[A-Z]/.test(prop)) {
            const newProp = prop.split(/(?=[A-Z])/)[0];
            newObj[newProp] = {id: obj[prop]};
        } else {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}

//convert to object by spiliting on . and then convert to new object
export function convertToNewObjectBySplitting(obj) {
    const newObj = {};
    for (const prop in obj) {
        if (prop.includes(".")) {
            const newProp = prop.split(".")[0];
            newObj[newProp] = {id: obj[prop]};
        } else {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}