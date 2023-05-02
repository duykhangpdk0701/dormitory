const express = require("express");
const router = express.Router();
const serviceUsageController = require("../Controller/serviceUsage.controller");

router.get("/", serviceUsageController.showAll);
router.get("/:id", serviceUsageController.show);
router.post("/store", serviceUsageController.store);
router.put("/:id", serviceUsageController.update);
router.delete("/:id", serviceUsageController.delete);

module.exports = router;
