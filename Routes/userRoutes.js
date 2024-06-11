const express = require("express");
const router = express.Router();
const { signup, login, getUser } = require("../Controllers/AuthControllers");
const {
  registerValidation,
  loginValidation,
  verifyToken,
} = require("../Utils/validation");

router.get("/", verifyToken, getUser);

router.post("/register", registerValidation, signup);

router.post("/login", loginValidation, login);

module.exports = router;

