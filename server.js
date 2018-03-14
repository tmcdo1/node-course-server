const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware
app.use((req, res, next) => {                                   // Logging
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});
// app.use((req, res, next) => {                                   // Maitenance
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

//Helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//Routing
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "My Site",
        welcomeText: "Welcome to the best site ever!"
    });
});

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs',{
        pageTitle: "About Page"
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
        pageTitle: "Portfolio Page"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

//Run server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});