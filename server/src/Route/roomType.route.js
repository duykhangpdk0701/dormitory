const express = require("express");
const router = express.Router();
const roomTypeController = require("../Controller/roomType.controller");
const upload = require('../Middleware/uploadImg');
const { verifyRoleAdmin } = require('../Middleware/roleAuth');

router.get("/", roomTypeController.showAll);
router.get("/:id", roomTypeController.show);
router.post("/store", verifyRoleAdmin, upload.array('images',10), roomTypeController.store);
router.put("/:id", verifyRoleAdmin, upload.array('images',10), roomTypeController.update);
router.delete("/:id", verifyRoleAdmin, roomTypeController.delete);

module.exports = router;
