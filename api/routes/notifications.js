const express = require("express");
const router = express.Router();
const notificationController = require('../controllers/notifications');

router.get("/", notificationController.getNotifications);

router.post("/", notificationController.postNotification);

router.get("/:programId", notificationController.getNotificationById);

router.delete("/:programId", notificationController.deleteNotification);

module.exports = router;