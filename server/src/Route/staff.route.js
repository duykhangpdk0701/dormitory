const express = require("express");
const router = express.Router();
const staffController = require("../Controller/staff.controller");
const { verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", staffController.showAll);
router.get("/:id", staffController.show);
router.post("/store", verifyRoleAdmin, staffController.store);
router.put("/:id", staffController.update);
router.delete("/:id", verifyRoleAdmin, staffController.delete);

module.exports = router;
