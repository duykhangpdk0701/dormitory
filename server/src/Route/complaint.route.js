const express = require("express");
const router = express.Router();
const complaintController = require("../Controller/complaint.controller");

router.get("/", complaintController.showAll);
router.get("/:id", complaintController.show);
router.post("/store", complaintController.store);
router.put("/:id", complaintController.update);
router.delete("/:id", complaintController.delete);

module.exports = router;
