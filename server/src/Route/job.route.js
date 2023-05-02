const express = require("express");
const router = express.Router();
const jobController = require("../Controller/job.controller");

router.get("/", jobController.showAll);
router.get("/:id", jobController.show);
router.post("/store", jobController.store);
router.put("/:id", jobController.update);
router.delete("/:id", jobController.delete);

module.exports = router;
