// adopted from https://github.com/a8m/angular-filter/blob/master/src/_common.js
function toArray(object) {
    return Array.isArray(object) ? object :
        Object.keys(object).map(function(key) {
            return object[key];
        });
}