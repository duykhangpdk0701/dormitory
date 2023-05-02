const express = require("express");
const router = express.Router();
const taskController = require("../Controller/task.controller");

router.get("/", taskController.showAll);
router.get("/:id", taskController.show);
router.post("/store", taskController.store);
router.put("/:id/start", taskController.start);
router.put("/:id/done", taskController.done);
router.put("/:id/cancel", taskController.cancel);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

module.exports = router;
