const express = require('express');
let app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

/*app.get('/', (req, res) => {
    res.send("Hello from the web server side...");
})*/

/*app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});*/

app.use(bodyParser.urlencoded({ extended: false }));

const formPath = path.join(__dirname, "formsubmissions.json");

app.post('/contact-form', (req, res) => {
    let formArr = [
        {
            name: req.body.name,
            email: req.body.email
        }
    ];

    fs.writeFileSync(formPath, JSON.stringify(formArr));

    res.send('Thank you for submitting your contact form.')
})

app.get('/formsubmissions', (req, res) => {
    res.sendFile(path.join(__dirname, 'formsubmissions.json'))
});

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);