const router = require('express').Router();
const applicationController = require('../controllers/applications');
const authenticate = require('../middlewares/authenticate');

// get application of authenticated applicant
router.get("/", authenticate(['applicant']), applicationController.getByApplicant);

// update some permited field of application for applicant
router.put("/", authenticate(['applicant']), applicationController.update);

// update application status of current logged account
router.patch("/", authenticate(['applicant']), applicationController.setStatus);

// get all applications in database
router.get("/all", authenticate(['admin', 'gradschool', 'department']), applicationController.getAll);

// get all applications results that accepted by gradschool
router.get("/results", applicationController.getResults);

// assess the application after interviev is done.
router.post("/assess/:applicationId", authenticate(['department']), applicationController.assessApplication);

// get application by application Id
router.get("/:applicationId", authenticate(['admin', 'gradschool', 'department']), applicationController.getById);

// update application status by its id
router.patch("/:applicationId", authenticate(['admin', 'gradschool', 'department']), applicationController.setStatusById);

// delete an application. ussually used to ban an applicant
router.delete("/:applicationId", authenticate(['admin', 'gradschool']), applicationController.delete);

module.exports = router;