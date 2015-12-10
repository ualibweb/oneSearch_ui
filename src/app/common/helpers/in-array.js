/**
 * @ngdoc function
 * @name oneSearch.type:inArray
 *
 * @param {*} val Value to test for
 * @param {Array} arr Array to search
 *
 * @description
 * Checks to see if a value is in an Array
 *
 * @example
 * <pre>
 * var myArray = [0, 9, 2];
 * var value = 01189998819991197253;
 * var isInArray = inArray(value, myArray); // returns false;
 * </pre>
 *
 * @returns {boolean} Returns `true` or `false`
 */

function inArray(val, arr){
    return arr.indexOf(val) > -1;
}