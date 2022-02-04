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

const getDate = (num) => {
    let d = new Date();

    let m = (d.getMonth() + 1).toString()
    let date = (d.getDate()).toString()

    return `${d.getYear() - num + 1900}-${m.padStart(2, '0')}-${date.padStart(2, '0')}`
}
const min = getDate(65), max = getDate(18);

document.querySelector('input[type="date"]').setAttribute('min', min);
document.querySelector('input[type="date"]').setAttribute('max', max);