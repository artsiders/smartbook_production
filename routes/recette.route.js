const express = require('express');
const router = express.Router();
const recetteController = require('../controllers/recette.controller')

router.post('/', recetteController.postDatas);

router.put('/:id', recetteController.updateDatas);

router.get('/mois/:id', recetteController.getByMonth);

router.get('/depart/:depart/:id', recetteController.getByDepartAndMonth);

router.get('/departstat/:id', recetteController.getDepartState);

module.exports = router;
