const express = require('express');
const { readFile } = require('fs').promises;
require('dotenv').config()
var path = require('path')

const app = express();


// To serve static files. Put all static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (request, response) => {

//     readFile('./index.html', 'utf8', (err, html) => {
//         if (err) {
//             response.status(500).send('couldnt fetch html');
//         }
//         response.send(html);

//     })
// });

// Using promises. Benefitial if having multiple async ops to handle in single request
app.get('/', async (request, response) => {

    response.send( await readFile('./index.html, 'utf8') );

    readFile('./index.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('couldnt fetch html');
        }
        response.send(html);

    })
});


app.listen(process.env.PORT, () => console.log(`App available on ${process.env.PORT}`));