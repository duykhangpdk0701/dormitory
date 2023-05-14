const express = require('express');
const router = express.Router();
const billController = require('../Controller/bill.controller');
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get('/', billController.showAll)
router.get('/:id', billController.show)
router.post('/store', verifyRoleAdmin, billController.store)
router.put('/:id', verifyRoleAdmin, billController.update)
router.delete('/:id', verifyRoleAdmin, billController.delete)

module.exports = router