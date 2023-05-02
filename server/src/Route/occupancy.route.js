const express = require("express");
const router = express.Router();
const occupancyController = require("../Controller/occupancy.controller");

router.get("/", occupancyController.showAll);
router.get("/:id", occupancyController.show);
router.post("/store", occupancyController.store);
router.put("/:id", occupancyController.update);
router.delete("/:id", occupancyController.delete);

module.exports = router;
