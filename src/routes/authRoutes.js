const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");

const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validators");
const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
