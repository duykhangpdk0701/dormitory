const express = require("express");
const router = express.Router();
const roomTypeController = require("../Controller/roomType.controller");
const upload = require('../Middleware/uploadImg');

router.get("/", roomTypeController.showAll);
router.get("/:id", roomTypeController.show);
router.post("/store", upload.array('images',10), roomTypeController.store);
router.put("/:id", upload.array('images',10), roomTypeController.update);
router.delete("/:id", roomTypeController.delete);

module.exports = router;
