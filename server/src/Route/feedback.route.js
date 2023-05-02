const express = require("express");
const router = express.Router();
const feedbackController = require("../Controller/feedback.controller");

router.get("/", feedbackController.showAll);
router.get("/:id", feedbackController.show);
router.post("/store", feedbackController.store);
router.put("/:id", feedbackController.update);
router.delete("/:id", feedbackController.delete);

module.exports = router;
