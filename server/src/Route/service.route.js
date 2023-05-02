const express = require("express");
const router = express.Router();
const serviceController = require("../Controller/service.controller");

router.get("/", serviceController.showAll);
router.get("/:id", serviceController.show);
router.post("/store", serviceController.store);
router.put("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);

module.exports = router;
