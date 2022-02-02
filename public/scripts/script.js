/*
const fs = require('fs');


// fs.writeFileSync("Raj.txt", JSON.stringify(Raj), function(err) {
//     if (err) {
//         console.log(err);
//     }
// });

fs.readFile('Raj.txt', 'utf-8', (err, data) => {
    if(err) {
        throw err;
    }

    console.log(JSON.parse(data));
})
*/

// https://blood-donation-helpsite.vercel.app/

form.addEventListener('submit', (e) => {
    const formData = new FormData(document.querySelector('#register-form'));

    const data = Object.fromEntries(formData.entries());

    //prevent form submitting like default
    e.preventDefault();

    fetch('http://localhost:3000/new-donor', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        //do something with data
        console.log(data);
    })
})