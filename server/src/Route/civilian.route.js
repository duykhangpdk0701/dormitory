const express = require("express");
const router = express.Router();
const civilianController = require("../Controller/civilian.controller");

router.get("/", civilianController.showAll);
router.get("/:id", civilianController.show);
router.post("/store", civilianController.store);
router.put("/:id", civilianController.update);
router.delete("/:id", civilianController.delete);

module.exports = router;
