const express = require('express');
const router = express.Router();
const electronicWaterController = require('../Controller/electronicWater.controller')

router.get('/', electronicWaterController.showAll)
router.get('/:id', electronicWaterController.show)
router.post('/store', electronicWaterController.store)
router.put('/:id', electronicWaterController.update)
router.delete('/:id', electronicWaterController.delete)

module.exports = router 