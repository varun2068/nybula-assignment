const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const {
  validateRegisterData,
  validationCheck,
  validateLoginData,
} = require("../helpers/validation");
const router = express.Router();

router
  .route("/register")
  .post(validateRegisterData, validationCheck, registerUser);
router.route("/login").post(validateLoginData, validationCheck, loginUser);

module.exports = router;
