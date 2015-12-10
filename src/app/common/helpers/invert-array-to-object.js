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

var invertArrayToObject = function(obj){
    var inverted = {};

    Object.keys(obj).map(function(value, index){
        for (var i = 0, len = obj[value].length; i < len; i++){
            inverted[obj[value][i]] = value;
        }
    });
    return inverted;
}