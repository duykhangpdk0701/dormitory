const express = require("express");
const router = express.Router();
const roomTypeController = require("../Controller/roomType.controller");

router.get("/", roomTypeController.showAll);
router.get("/:id", roomTypeController.show);
router.post("/store", roomTypeController.store);
router.put("/:id", roomTypeController.update);
router.delete("/:id", roomTypeController.delete);

module.exports = router;
