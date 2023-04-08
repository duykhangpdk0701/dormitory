const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/booking.controller");

router.get("/", bookingController.showAll);
router.get("/:id", bookingController.show);
router.post("/store", bookingController.store);
router.put("/:id", bookingController.update);
router.put("/:id/accepted", bookingController.accepted);
router.put("/:id/cancel", bookingController.cancel);
router.delete("/:id", bookingController.delete);

module.exports = router;
