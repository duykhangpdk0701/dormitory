const express = require("express");
const router = express.Router();
const roomController = require("../Controller/room.controller");

router.get("/", roomController.showAll);
router.get("/:id", roomController.show);
router.post("/store", roomController.store);
router.put("/:id", roomController.update);
router.delete("/:id", roomController.delete);

module.exports = router;
