const express = require("express");
const router = express.Router();
const serviceController = require("../Controller/service.controller");
const { verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", serviceController.showAll);
router.get("/:id", serviceController.show);
router.post("/store", verifyRoleAdmin, serviceController.store);
router.put("/:id", verifyRoleAdmin, serviceController.update);
router.delete("/:id", verifyRoleAdmin, serviceController.delete);

module.exports = router;
