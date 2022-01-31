const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('fs').promises;
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// To serve static files. Put all static files in public folder
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

/*
app.get('/', (request, response) => {
    readFile('./index.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500).send('couldnt fetch html');
        }
        response.send(html);
    })
}); */

// Using promises. Benefitial if having multiple async ops to handle in single request
app.get('/', async (request, response) => {

    response.send( await readFile('./index.html', 'utf8') );

});

app.post('/new-donor', (request, response) => {
    console.log(request.body);
    response.send(request.body);
});

app.listen(process.env.PORT, () => console.log(`App available on http://localhost:${process.env.PORT}`));