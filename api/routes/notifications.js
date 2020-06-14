const express = require("express");
const router = express.Router();
const notificationController = require('../controllers/notifications');
const authenticate = require('../middlewares/authenticate');

router.get("/all", authenticate(['admin']), notificationController.getAll);

router.get("/", authenticate(['admin', 'applicant', 'gradschool', 'department']), notificationController.getMyAll);

router.post("/", authenticate(['admin', 'gradschool', 'department']), notificationController.send);

router.get("/seen/:notificationId", authenticate(['admin', 'applicant', 'gradschool', 'department']), notificationController.seen);

router.get("/:notificationId", authenticate(['admin', 'applicant', 'gradschool', 'department']), notificationController.getById);

router.delete("/:notificationId", authenticate(['admin', 'applicant', 'gradschool', 'department']), notificationController.delete);

module.exports = router;