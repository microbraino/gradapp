const express = require("express");
const router = express.Router();
const programController = require('../controllers/programs');
const authenticate = require('../middlewares/authenticate')

router.get("/", programController.getAll);

router.post("/", programController.addNew);

router.get("/:programId", programController.getById);

router.patch("/:programId", programController.update);

router.delete("/:programId", programController.delete);

module.exports = router;