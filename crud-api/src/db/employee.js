const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/employee-node-api', {
    useNewUrlParser: true
});

const Employee = mongoose.model('employee', {
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String
    },
    phNo: {
        type: String,
        default: 0,
        minLength: 10,
        maxLength: 10
    },
    designation: {
        type: String
    }
});

module.exports = Employee;