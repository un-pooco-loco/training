const express = require('express');
const routes = require('./mysql-routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome Employees!");
});

app.use('/api/employees', routes);

app.listen(3000, () => {
    console.log('Server is listening to port 3000...')
});