const express = require("express");
const router = express.Router();
const occupancyController = require("../Controller/occupancy.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", occupancyController.showAll);
router.get("/:id", occupancyController.show);
router.post("/store", verifyRoleAdmin, occupancyController.store);
router.put("/:id", verifyRoleAdmin, occupancyController.update);
router.delete("/:id", verifyRoleAdmin, occupancyController.delete);

module.exports = router;
