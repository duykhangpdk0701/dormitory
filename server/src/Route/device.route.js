const express = require("express");
const router = express.Router();
const deviceController = require("../Controller/device.controller");
const upload = require('../Middleware/uploadImg');
const { verifyRoleStaff, verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", deviceController.showAll);
router.get("/:id", deviceController.show);
router.post("/store", verifyRoleAdmin, upload.array('images',10), deviceController.store);
router.put("/:id", verifyRoleAdmin, upload.array('images',10), deviceController.update);
router.delete("/:id", verifyRoleAdmin, deviceController.delete);

module.exports = router;
