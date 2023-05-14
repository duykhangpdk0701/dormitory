const express = require('express');
const router = express.Router();
const electronicWaterController = require('../Controller/electronicWater.controller');
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get('/', electronicWaterController.showAll)
router.get('/:id', electronicWaterController.show)
router.post('/store', verifyRoleStaff, electronicWaterController.store)
router.put('/:id', verifyRoleStaff, electronicWaterController.update)
router.delete('/:id', verifyRoleStaff, electronicWaterController.delete)

module.exports = router 