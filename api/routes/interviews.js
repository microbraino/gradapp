const express = require("express");
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

const InterviewController = require('../controllers/interviews');


// get all interviews
router.get("/all", authenticate(['admin', 'department']), InterviewController.getAll);

// get interview of authenticated applicant
router.get("/", authenticate(['applicant']), InterviewController.getForApplicant);

// get all interviews in announcement format(hide sensitive informations like applicant id)
router.get("/list", InterviewController.getList);

// get an interview by its id
router.get("/:interviewId", authenticate(['admin', 'department']), InterviewController.getById);

// set an interview
router.post("/", authenticate(['department']), InterviewController.set);

// update interview
router.put("/:interviewId", authenticate(['admin', 'department']), InterviewController.update);

// delete interview
router.delete("/:interviewId", authenticate(['admin', 'department']), InterviewController.delete);

module.exports = router;