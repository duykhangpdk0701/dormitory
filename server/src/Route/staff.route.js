const express = require("express");
const router = express.Router();
const staffController = require("../Controller/staff.controller");

router.get("/", staffController.showAll);
router.get("/:id", staffController.show);
router.post("/store", staffController.store);
router.put("/:id", staffController.update);
router.delete("/:id", staffController.delete);

module.exports = router;
