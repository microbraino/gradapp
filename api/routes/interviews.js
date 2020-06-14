const express = require("express");
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

const InterviewController = require('../controllers/interviews');


// get interview of authenticated applicant
router.get("/", authenticate(['applicant']), InterviewController.getForApplicant);

// set an interview
router.post("/", authenticate(['department']), InterviewController.set);

// get all interviews
router.get("/all", authenticate(['admin', 'gradschool', 'department']), InterviewController.getAll);

// get all interviews in announcement format(hide sensitive informations like applicant id)
router.get("/list", InterviewController.getList);

// get an interview by its id
router.get("/:interviewId", authenticate(['admin', 'gradschool', 'department']), InterviewController.getById);

// update interview
router.put("/:interviewId", authenticate(['admin', 'department']), InterviewController.update);

// delete interview
router.delete("/:interviewId", authenticate(['admin', 'department']), InterviewController.delete);

module.exports = router;