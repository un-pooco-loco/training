const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'maitris',
    password: 'test',
    database: 'node_training'
});



con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to Database");
});

module.exports = con;