const express = require("express");
const router = express.Router();
const deviceController = require("../Controller/device.controller");

router.get("/", deviceController.showAll);
router.get("/:id", deviceController.show);
router.post("/store", deviceController.store);
router.put("/:id", deviceController.update);
router.delete("/:id", deviceController.delete);

module.exports = router;
