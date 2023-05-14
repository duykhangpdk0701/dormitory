const express = require("express");
const router = express.Router();
const priorityController = require("../Controller/priority.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", priorityController.showAll);
router.get("/:id", priorityController.show);
router.post("/store", verifyRoleAdmin, priorityController.store);
router.put("/:id", verifyRoleAdmin, priorityController.update);
router.delete("/:id", verifyRoleAdmin, priorityController.delete);

module.exports = router;
