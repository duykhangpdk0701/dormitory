const express = require("express");
const router = express.Router();
const permissionController = require("../Controller/permission.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", permissionController.showAll);
router.get("/:id", permissionController.show);
router.post("/store", verifyRoleAdmin, permissionController.store);
router.put("/:id", verifyRoleAdmin, permissionController.update);
router.delete("/:id", verifyRoleAdmin, permissionController.delete);

module.exports = router;
