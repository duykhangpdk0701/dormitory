const express = require('express');
const router = express.Router();
const billController = require('../Controller/bill.controller');
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get('/', billController.showAll)
router.get('/sendBill', billController.sendBill)
router.get('/:id', billController.show)
router.post('/store', verifyRoleAdmin, billController.store)
router.put('/:id', verifyRoleAdmin, billController.update)
router.get("/:id/paid/paypal/done", billController.paidPaypalDone);
router.get("/:id/paid/paypal", billController.paidPaypal);
router.put("/:id/paid", billController.paid);
router.delete('/:id', verifyRoleAdmin, billController.delete)

module.exports = router