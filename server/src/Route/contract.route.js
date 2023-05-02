const express = require("express");
const router = express.Router();
const contractController = require("../Controller/contract.controller");

router.get("/", contractController.showAll);
router.get("/:id", contractController.show);
router.post("/store", contractController.store);
router.put("/:id", contractController.update);
router.delete("/:id", contractController.delete);

module.exports = router;
