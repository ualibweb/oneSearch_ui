/*
    Given an object with an array as it's value,
    this function will create a new object having the array
    keys as separate object keys and the old object keys as their value

    {
        field: ['value1', 'value2']
    }

    will result in

    {
        value1: 'field',
        value2: 'field'
    }
 */
/**
 * @ngdoc function
 * @name oneSearch.type:invertArrayToObject
 *
 * @param {object} obj An `Object` with an `Array` as the property values
 *
 * @description
 * Given an object with an array as it's value,
 * this function will create a new object having the array
 * keys as separate object keys and the old object keys as their value
 *
 * @example
 * <pre>
 * var myObj = {
 *      field: ['value1', 'value2']
 * };
 * var invertedObj = invertArrayToObject(myObj);
 * // The resulting invertedObj will look like:
 * // {
 * //   value1: 'field',
 * //   value2: 'field',
 * // }
 * </pre>
 *
 * @returns {object} An new, inverted object, where the values of the `Array` are now the properties assigned a value of the old `property`
 */

var invertArrayToObject = function(obj){
    var inverted = {};

    Object.keys(obj).map(function(value, index){
        for (var i = 0, len = obj[value].length; i < len; i++){
            inverted[obj[value][i]] = value;
        }
    });
    return inverted;
}