const express = require("express");
const router = express.Router();
const priorityController = require("../Controller/priority.controller");

router.get("/", priorityController.showAll);
router.get("/:id", priorityController.show);
router.post("/store", priorityController.store);
router.put("/:id", priorityController.update);
router.delete("/:id", priorityController.delete);

module.exports = router;
