const express = require('express');
const router = express.Router();
const billController = require('../Controller/bill.controller')

router.get('/', billController.showAll)
router.get('/:id', billController.show)
router.post('/store', billController.store)
router.put('/:id', billController.update)
router.delete('/:id', billController.delete)

module.exports = router