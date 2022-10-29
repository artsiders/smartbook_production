const express = require('express');
const router = express.Router();
const depenseController = require('../controllers/depense.controller');

router.post('/', depenseController.postDatas);

router.get('/mois/:id', depenseController.getByMonth);

router.put('/:id', depenseController.updateDatas);

router.get('/' + '', depenseController.getAll);

module.exports = router;
