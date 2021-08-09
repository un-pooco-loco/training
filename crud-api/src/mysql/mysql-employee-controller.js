const Employee = require('./mysql-employee');

exports.addEmployee = (req, res) => {
    console.log(req.body);
    var new_emp = new Employee(req.body);
    console.log(new_emp);
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send(e);
    // }
    Employee.addEmployee(new_emp, (err, emp) => {
        if (err) {
            res.send(err);
        }
        console.log('Employee added: ', emp);
        res.send(emp);
    });
};

exports.findAll = (req, res) => {
    Employee.findAll((err, emp) => {
        if (err) {
            res.send(err);
        }
        console.log('res', emp);
        res.send(emp);
    });
};

exports.findById = (req, res) => {
    Employee.findById(req.params.id, (err, emp) => {
        if (err) {
            res.send(err);
        }
        console.log('res', emp);
        res.send(emp);
    });
};

exports.updateById = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send(e);
    }
    Employee.updateById(req.params.id, new Employee(req.body), (err, emp) => {
        if (err) {
            res.send(err);
        }
        console.log('Employee Updated: ', emp);
        res.send(emp);
    });
};

exports.deleteById = (req, res) => {
    Employee.deleteByID(req.params.id, (err, emp) => {
        if (err) {
            res.send(err);
        }
        console.log('Employee Deleted', emp);
        res.send(emp);
    });
};