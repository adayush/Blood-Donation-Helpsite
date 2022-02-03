const express = require('express');
//var cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const { readFile } = require('fs').promises;
require('dotenv').config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const app = express();
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.set('view engine', 'ejs');

// To serve static files. Put all static files in public folder
var path = require('path');
const req = require('express/lib/request');
const res = require('express/lib/response');

// never used -- to be deleted
// const { response } = require('express');
// const req = require('express/lib/request');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));

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

    // response.send( await readFile('./index.html', 'utf8') );
    response.render('index');

});

app.post('/new-donor', async (request, response) => {

    // Check if user already exists
    let { data: donors, err } = await supabase.from('donors').select("*").eq('mobile', request.body.mobile)

    if(err != null) {
        response.render('blank', {
            status: 'error',
            code: '701'
        });
    }

    if(donors.length == 0) {

        const { data, error } = await supabase.from('donors').insert([
            {
                name: request.body.name,
                mobile: request.body.mobile,
                bloodgroup: bloodMap[request.body.bloodgroup],
                dob: request.body.dob,
                city: request.body.city
            }
        ]);
        console.log([data, error]);

        if(error != null) {
            response.render('blank', {
                status: 'error',
                code: '702'
            });
        }

        response.render('blank', {
            status: 'success',
            name: request.body.name,
            mobile: request.body.mobile
        });

    } else {
        response.render('blank', {
            status: 'exists',
            name: donors[0].name,
            mobile: donors[0].mobile
        });
    }
});

app.post('/find-donor', async (request, response) => {

    let { data: donors, error } = await supabase.from('donors').select("*").eq('city', request.body.city).eq('bloodgroup', bloodMap[request.body.bloodgroup])

    console.log(donors);

    console.log(request.body, donors);
    response.render('results', {
        donors: donors
    });
});

const bloodMap = {
    Opos: 'O+',
    Oneg: 'O-',
    Apos: 'A+',
    Aneg: 'A-',
    Bpos: 'B+',
    Bneg: 'B-',
    ABpos: 'AB+',
    ABneg: 'AB-'
}
function age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}


app.listen(process.env.PORT, () => console.log(`App available on http://localhost:${process.env.PORT}`));