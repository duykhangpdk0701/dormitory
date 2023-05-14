const express = require("express");
const router = express.Router();
const taskController = require("../Controller/task.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", taskController.showAll);
router.get("/:id", taskController.show);
router.post("/store", verifyRoleAdmin, taskController.store);
router.put("/:id/start", verifyRoleStaff, taskController.start);
router.put("/:id/done", verifyRoleStaff, taskController.done);
router.put("/:id/cancel", verifyRoleStaff, taskController.cancel);
router.put("/:id", verifyRoleStaff, taskController.update);
router.delete("/:id", verifyRoleAdmin, taskController.delete);

module.exports = router;
