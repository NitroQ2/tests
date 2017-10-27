var express = require('express');
app = express();

var logger = (req, res, next) => {
    var url = req.url;
    var time = new Date();
    console.log('Received request for URL ' + url + ' at ' + time);
    next();
};

var nameFinder = (req, res, next) => {
    var name = req.query.name;
    if (name) {
        req.username = name.toUpperCase();
    } else {
        req.username = 'Guest';
    }
    next();
};

var greeter = (req, res, next) => {
    res.status(200).type('html');
    res.write('Hello, ' + req.username);
    next();
};

var adminName = (req, res, next) => {
    req.username = 'Admin';
    next();
};

var commonRoute = express.Router();
commonRoute.use(logger, greeter);

//-----------------------------------------

app.use('/publico', express.static('arquivos_locais'));

app.use('/welcome', nameFinder, commonRoute, 
(req, res) => {res.end();});

app.use('/admin', adminName, greeter, 
(req, res) => {res.end();});

app.use('/', (req, res) => {
    res.status(200);
    res.type('html');
    res.write('Hello World!');
    res.write('<p>');
    res.write('<b>Have a nice day!</b>');
    res.end();
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});