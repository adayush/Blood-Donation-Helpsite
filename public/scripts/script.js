// City Validation
// Find all inputs on the DOM which are bound to a datalist via their list attribute.
function cityVal(input) {
    // console.log('Invoked', input.value)
    for(const v of input.list.options) {
        if(input.value == v.value) {
            // console.log('Valid city detected');
            input.setCustomValidity('');
            return true;
        }
    }
    input.setCustomValidity('Please input valid city');
    input.reportValidity();
    return false;
}