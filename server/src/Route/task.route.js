const express = require("express");
const router = express.Router();
const taskController = require("../Controller/task.controller");

router.get("/", taskController.showAll);
router.get("/:id", taskController.show);
router.post("/store", taskController.store);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

module.exports = router;
