const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/booking.controller");

router.get("/", bookingController.showAll);
router.get("/:id", bookingController.show);
router.post("/store", bookingController.store);
router.put("/:id", bookingController.update);
router.get("/:id/deposit/paypal/done", bookingController.depositPaypalDone);
router.get("/:id/deposit/paypal", bookingController.depositPaypal);
router.put("/:id/deposit", bookingController.deposit);
router.get("/:id/paid/paypal/done", bookingController.paidPaypalDone);
router.get("/:id/paid/paypal", bookingController.paidPaypal);
router.put("/:id/paid", bookingController.paid);
router.put("/:id/cancel", bookingController.cancel);
router.delete("/:id", bookingController.delete);

module.exports = router;
