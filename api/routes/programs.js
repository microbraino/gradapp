const express = require("express");
const router = express.Router();
const programController = require('../controllers/programs');
const authenticate = require('../middlewares/authenticate')

// get all programs in database
router.get("/all", programController.getAll);

// create new program
router.post("/", authenticate(['gradschool']), programController.addNew);

// get program by its id
router.get("/:programId", authenticate(['admin', 'gradschool']), programController.getById);

// update program by its id
router.put("/:programId", authenticate(['admin', 'gradschool']), programController.update);

// delete a program by its id
router.delete("/:programId", authenticate(['admin', 'gradschool']), programController.delete);

module.exports = router;