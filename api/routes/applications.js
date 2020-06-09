const router = require('express').Router();
const applicationController = require('../controllers/applications');
const authenticate = require('../middlewares/authenticate');

// get all applications in database
router.get("/all", authenticate(['admin', 'gradschool', 'department']), applicationController.getAll);

// get application of authenticated applicant
router.get("/", authenticate, applicationController.getByApplicant);

// get application by application Id
router.get("/:applicationId", authenticate(['admin', 'gradschool', 'department']), applicationController.getById);

// update some permited field of application for applicant
router.put("/", authenticate(['applicant']), applicationController.update);

// update some permited field of application by its id
router.put("/:applicationId", authenticate(['admin', 'gradschool', 'department']), applicationController.updateById);

// confirm application belongs to a spesific id
router.get("confirm/:applicationId", authenticate(['gradschool']), applicationController.confirmApplication);

// assess the application after interviev is done.
router.get("/assess/:applicationId", authenticate(['department']), applicationController.assessApplication);

// accept assessment result
router.get("/accept/:applicationId", authenticate(['gradschool']), applicationController.confirmAssessment);

// get all applications results that announced
router.get("/results", authenticate(['gradschool']), applicationController.getResults);//accept assessment grade

// delete an application. ussually used to ban an applicant
router.delete("/:applicationId", authenticate, applicationController.delete);

module.exports = router;