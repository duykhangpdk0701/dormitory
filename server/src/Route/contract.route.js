const express = require("express");
const router = express.Router();
const contractController = require("../Controller/contract.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/test", contractController.test);
router.get("/", contractController.showAll);
router.get("/:id", contractController.show);
router.post("/store", verifyRoleAdmin, contractController.store);
router.put("/:id", verifyRoleAdmin, contractController.update);
router.delete("/:id", verifyRoleAdmin, contractController.delete);

module.exports = router;
