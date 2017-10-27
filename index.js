var express = require('express');
var app = express();
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