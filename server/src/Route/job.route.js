const express = require("express");
const router = express.Router();
const jobController = require("../Controller/job.controller");
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", jobController.showAll);
router.get("/:id", jobController.show);
router.post("/store", verifyRoleAdmin, jobController.store);
router.put("/:id", verifyRoleAdmin, jobController.update);
router.delete("/:id", verifyRoleAdmin, jobController.delete);

module.exports = router;
