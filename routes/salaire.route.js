const express = require('express');
const router = express.Router();
const Salaires = require('../models/salaire.model');
const Emp = require('../models/employee.model');
const { text } = require('body-parser');

router.post('/', (req, res, next) => {
    const recette = new Salaires({
        acompte: req.body.acompte,
        sanction: req.body.sanction,
        prime: req.body.prime,
        id_emp: req.body.id_emp,
        date: req.body.date,
        mois: req.body.mois,
    });
    recette.save().then(() => {
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
    Salaires.findOne({
        _id: req.params.id
    }).then(
        (recette) => {
            res.status(200).json(recette);
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
    const recette = new Salaires({
        _id: req.params.id,
        acompte: req.body.acompte,
        sanction: req.body.sanction,
        prime: req.body.prime,
        id_emp: req.body.id_emp,
        date: req.body.date,
        mois: req.body.mois,
    });
    Salaires.updateOne({ _id: req.params.id }, recette).then(
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
    Salaires.deleteOne({ _id: req.params.id }).then(
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
    Salaires.find().then(
        (salaires) => {
            res.status(200).json(salaires);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
// router.get('/' + '', (req, res, next) => {
//     let test = {}
//     Salaires.find().then(
//         (salaires) => {
//             salaires.map(salaire => Emp.findOne({ _id: salaire.id_emp }).then(
//                 (data) => {
//                     text.push(data)
//                 }
//             ))
//             res.status(200).json(test);
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// });
module.exports = router;
