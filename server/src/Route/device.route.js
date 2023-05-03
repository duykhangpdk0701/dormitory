const express = require("express");
const router = express.Router();
const deviceController = require("../Controller/device.controller");
const upload = require('../Middleware/uploadImg');

router.get("/", deviceController.showAll);
router.get("/:id", deviceController.show);
router.post("/store", upload.array('images',10), deviceController.store);
router.put("/:id", upload.array('images',10), deviceController.update);
router.delete("/:id", deviceController.delete);

module.exports = router;
