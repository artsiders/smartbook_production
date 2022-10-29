const express = require('express');
const router = express.Router();
const Employees = require('../models/employee.model');

router.post('/', (req, res, next) => {
    const employee = new Employees({
        emp_firstname: req.body.emp_firstname,
        emp_lastname: req.body.emp_lastname,
        emp_sex: req.body.emp_sex,
        emp_phone: req.body.emp_phone,
        emp_email: req.body.emp_email,
        emp_address: req.body.emp_address,
        emp_post: req.body.emp_post,
        salaire_base: req.body.salaire_base,
        idhotel: req.body.idhotel,
    });
    employee.save().then(() => {
        res.status(201).json({
            message: 'successfully'
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: "ERREUR" + error
        });
    }
    );
});
router.get('/:id', (req, res, next) => {
    Employees.findOne({
        _id: req.params.id
    }).then(
        (employee) => {
            res.status(200).json(employee);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});
router.put('/:id', (req, res, next) => {
    const employee = new Employees({
        _id: req.params.id,
        emp_firstname: req.body.emp_firstname,
        emp_lastname: req.body.emp_lastname,
        emp_sex: req.body.emp_sex,
        emp_phone: req.body.emp_phone,
        emp_email: req.body.emp_email,
        emp_address: req.body.emp_address,
        emp_post: req.body.emp_post,
        salaire_base: req.body.salaire_base,
        idhotel: req.body.idhotel,
    });
    Employees.updateOne({ _id: req.params.id }, employee).then(
        () => {
            res.status(201).json({
                message: 'updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
router.delete('/:id', (req, res, next) => {
    Employees.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
router.get('/' + '', (req, res, next) => {
    Employees.find().then(
        (employees) => {
            res.status(200).json(employees);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
module.exports = router;
