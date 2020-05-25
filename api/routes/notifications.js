const express = require("express");
const router = express.Router();
const notificationController = require('../controllers/notifications');
const authenticate = require('../middlewares/authenticate');

router.get("/", authenticate, notificationController.getAll);

router.post("/", authenticate, notificationController.send);

router.get("/:notificationId", authenticate, notificationController.getById);

router.delete("/:notificationId", authenticate, notificationController.delete);

module.exports = router;