const express = require("express");
const router = express.Router();
const civilianController = require("../Controller/civilian.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", civilianController.showAll);
router.get("/:id", civilianController.show);
router.post("/store", verifyRoleAdmin, civilianController.store);
router.put("/:id", civilianController.update);
router.delete("/:id", verifyRoleAdmin, civilianController.delete);

module.exports = router;
