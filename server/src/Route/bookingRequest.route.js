const express = require("express");
const router = express.Router();
const bookingRequestController = require("../Controller/bookingRequest.controller");
const upload = require('../Middleware/uploadImg');

router.get("/", bookingRequestController.showAll);
router.get("/:id", bookingRequestController.show);
router.post("/store", upload.array('image',10), bookingRequestController.store);
router.put("/:id", bookingRequestController.update);
router.put("/:id/accepted", bookingRequestController.accepted);
router.put("/:id/cancel", bookingRequestController.cancel);
router.delete("/:id", bookingRequestController.delete);

module.exports = router;
