const usersController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);

router.post("/login", usersController.login);

module.exports = router;
