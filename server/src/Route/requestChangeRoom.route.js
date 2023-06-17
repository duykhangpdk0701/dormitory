const express = require('express');
const router = express.Router();
const requestChangeRoomController = require('../Controller/requestChangeRoom.controller')

router.get('/', requestChangeRoomController.showAll)
router.get('/:id', requestChangeRoomController.show)
router.post('/store', requestChangeRoomController.store)
router.put('/:id', requestChangeRoomController.update)
router.put("/:id/accepted", requestChangeRoomController.accepted);
router.put("/:id/denied", requestChangeRoomController.denied);
router.delete('/:id', requestChangeRoomController.delete)

module.exports = router 