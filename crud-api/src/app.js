const express = require('express');
const Emp = require('./db/employee');

const app = express();

app.use(express.json());


//Create
app.post('/employees', (req, res) => {
    let emp = new Emp(req.body);
    emp.save().then(() => {
        res.send(emp);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//Retrieve
app.get('/employees', (req, res) => {
    Emp.find({}).then((employees) => {
        res.send(employees);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

//RetriveByID
app.get('/employees/:id', (req, res) => {
    Emp.findById(req.params.id).then((emp) => {
        if (!emp) {
            return res.status(404).send();
        }
        res.send(emp);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

//Update
app.patch('/employees/:id', async(req, res) => {
    try {
        const emp = await Emp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!emp) {
            return res.status(404).send();
        }
        res.send(emp);
    } catch (e) {
        res.status(400).send(e);
    }

    // Emp.findByIdAndUpdate(req.params.id).then((emp) => {
    //     if (!emp) {
    //         return res.status(404).send();
    //     }
    //     res.send(emp);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
});

//Delete
app.delete('/employees/:id', (req, res) => {
    // Emp.findByIdAndDelete(req.params.id, (err, data) => {
    //     if (err) {
    //         return res.status(404).send(err)
    //     }
    //     res.status(400).send(data)
    // })
    Emp.findByIdAndDelete(req.params.id).then((emp) => {
        if (!emp) {
            return res.status(404).send();
        }
        res.send(emp);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

app.listen(5000, () => {
    console.log('server is listening...');
});