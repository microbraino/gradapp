const express = require("express");
const router = express.Router();
const programController = require('../controllers/programs');
const authenticate = require('../middlewares/authenticate')

router.get("/", programController.getAll);// public

router.post("/", authenticate, programController.addNew);

router.post("/apply/:programId", authenticate, programController.apply);

router.get("/:programId", programController.getById);//public

router.patch("/:programId", authenticate, programController.update);

router.delete("/:programId", authenticate, programController.delete);

module.exports = router;