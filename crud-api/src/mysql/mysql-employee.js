var con = require('./mysql-db-config');

var Employee = (emp) => {
    this.Emp_Name = emp.emp_name;
    this.Emp_phNo = emp.emp_phNo;
    this.Emp_Designation = emp.emp_designation;
};


var insert_query = 'INSERT INTO node_training.employee' +
    '(Emp_Name, Emp_phNo, Emp_Designation)' +
    'VALUES (?,?,?)';

var update_query = 'UPDATE employee SET Emp_Name=?, Emp_phNo=?, Emp_Designation=? WHERE Emp_id=?';

Employee.addEmployee = (newEmp, result) => {
    con.query("INSERT INTO employee set ?", newEmp, (err, data) => {
        if (err) {
            console.log("Insert failed: ", err);
            result(err, null);
        } else {
            console.log(data.insertId);
            result(null, data.insertId);
        }
    });
};

Employee.findById = function(id, result) {
    con.query("SELECT * FROM employee WHERE Emp_id = ?", id, (err, data) => {
        if (err) {
            console.log("Retrive failed: ", err);
            result(err, null);
        } else {
            console.log("Employee Found");
            result(null, data);
        }
    });
};

Employee.findAll = function(result) {
    con.query("SELECT * FROM employee", (err, data) => {
        if (err) {
            console.log("Retrive failed: ", err);
            result(err, null);
        } else {
            console.log("Employees: ", data);
            result(null, data);
        }
    });
};

Employee.updateById = function(id, employee, result) {
    con.query(update_query, [employee.Emp_Name, Employee.Emp_phNo, Employee.Emp_Designation, id], (err, data) => {
        if (err) {
            console.log("Update failed: ", err);
            result(err, null);
        } else {
            console.log("Employee details changed");
            result(null, data);
        }
    });
};

Employee.deleteByID = function(id, result) {
    con.query("DELETE FROM employee WHERE Emp_id = ?", id, (err, data) => {
        if (err) {
            console.log("Delete failed: ", err);
            result(err, null);
        } else {
            console.log("Employee Deleted");
            result(null, data);
        }
    });
};

module.exports = Employee;