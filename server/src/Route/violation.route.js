const express = require("express");
const router = express.Router();
const violationController = require("../Controller/violation.controller");

router.get("/", violationController.showAll);
router.get("/:id", violationController.show);
router.post("/store", violationController.store);
router.put("/:id", violationController.update);
router.delete("/:id", violationController.delete);

module.exports = router;
