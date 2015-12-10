/**
 * @ngdoc function
 * @name oneSearch.type:isEmpty
 *
 * @param {object|Array} obj An `Object` or `Array` to check.
 *
 * @description
 * Checks to see if an `Object` or `Array` is empty
 *
 * Adopted from {@link http://stackoverflow.com/questions/4994201/is-object-empty}
 *
 * @example
 * <pre>
 * var myObj = {};
 *
 * var isObjEmpty = isEmpty(myObj); // true
 * </pre>
 *
 * @returns {boolean} `true` or `false`
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}