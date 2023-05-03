const express = require("express");
const router = express.Router();
const roomController = require("../Controller/room.controller");
const upload = require('../Middleware/uploadImg');

router.get("/", roomController.showAll);
router.get("/:id", roomController.show);
router.post("/store", upload.array('images',10), roomController.store);
router.put("/:id", upload.array('images',10), roomController.update);
router.delete("/:id", roomController.delete);

module.exports = router;
