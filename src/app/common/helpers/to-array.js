/**
 * @ngdoc function
 * @name oneSearch.global:toArray
 *
 * @param {object} object `Object` to convert into an `Array`.
 *
 * @description
 * Converts the given object into an `Array` of it's values
 *
 * Adopted from {@link https://github.com/a8m/angular-filter/blob/master/src/_common.js}
 *
 * @example
 * <pre>
 * var myObj = {
 *  prop1: "Don't",
 *  prop2: "cross the",
 *  prop3: "streams!"
 * };
 *
 * var arrayNowPlease = toArray(myObj); // returns ["Don't", "cross the", "streams"]
 * </pre>
 *
 * @returns {Array} Array of the object's property's values
 */
function toArray(object) {
    return Array.isArray(object) ? object :
        Object.keys(object).map(function(key) {
            return object[key];
        });
}