const express = require('express');
const readFile = require('./readFile');

const app = express();
var message = readFile.message;
// console.log(message);

app.get('/', (req, res) => {
    // res.send(__dirname, '/index.html');
    let name = req.query.name;
    // console.log('Welcome', name);
    if (name === '' || name === undefined) {
        res.send('<h1> Something went wrong! </h1>');
    } else {
        res.send('<h1>' + getMessageWithName(name) + '</h1>');
    }

    //res.sendFile(__dirname + '/index.html');
});

var getMessageWithName = (name) => {
    //return message.substring(0, message.indexOf('{')) + name + message.substring(message.indexOf('}') + 1);
    return message.replace('{name}', name);
}


app.listen(5000, () => {
    // http module code
    console.log('connection to the server is successful...');
})