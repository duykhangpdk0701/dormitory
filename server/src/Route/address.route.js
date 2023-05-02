const express = require("express");
const router = express.Router();
const addressController = require("../Controller/address.controller");

router.get("/", addressController.showAll);
router.get("/:id", addressController.show);
router.post("/store", addressController.store);
router.put("/:id", addressController.update);
router.delete("/:id", addressController.delete);

module.exports = router;
