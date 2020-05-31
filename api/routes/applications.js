const router = require('express').Router();
const applicationController = require('../controllers/applications');
const authenticate = require('../middlewares/authenticate');

router.get("/all", authenticate, applicationController.getAll);// for admin, gradschool, department usage

router.get("/", authenticate, applicationController.getByAccount);

router.get("/:applicationId", authenticate, applicationController.getById);

//router.patch("/", authenticate, applicationController.update);

router.put("/", authenticate, applicationController.update);// for admin, applicant usage

router.delete("/:applicationId", authenticate, applicationController.delete);// for admin usage

module.exports = router;