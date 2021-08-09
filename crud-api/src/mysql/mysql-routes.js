const express = require('express');
const router = express.Router();
const mysqlApp = require('./mysql-employee-controller');

router.get('/', mysqlApp.findAll);
router.get('/:id', mysqlApp.findById);
router.post('/', mysqlApp.addEmployee);
router.patch('/:id', mysqlApp.updateById);
router.delete('/:id', mysqlApp.deleteById);

module.exports = router;