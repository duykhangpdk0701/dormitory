const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/booking.controller");

router.get("/", bookingController.showAll);
router.get("/:id", bookingController.show);
router.post("/store", bookingController.store);
router.put("/:id", bookingController.update);
router.put("/:id/deposit", bookingController.deposit);
router.put("/:id/paid", bookingController.paid);
router.put("/:id/cancel", bookingController.cancel);
router.delete("/:id", bookingController.delete);

module.exports = router;
