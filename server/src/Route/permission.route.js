const express = require("express");
const router = express.Router();
const permissionController = require("../Controller/permission.controller");

router.get("/", permissionController.showAll);
router.get("/:id", permissionController.show);
router.post("/store", permissionController.store);
router.put("/:id", permissionController.update);
router.delete("/:id", permissionController.delete);

module.exports = router;
