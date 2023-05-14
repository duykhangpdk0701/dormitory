const express = require("express");
const router = express.Router();
const violationController = require("../Controller/violation.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", violationController.showAll);
router.get("/:id", violationController.show);
router.post("/store", verifyRoleStaff, violationController.store);
router.put("/:id", verifyRoleStaff, violationController.update);
router.delete("/:id", verifyRoleStaff, violationController.delete);

module.exports = router;
