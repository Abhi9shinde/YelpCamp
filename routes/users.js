const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const funcUser = require("../controllers/users");
const { func } = require("joi");

router.get("/register", funcUser.renderReviewRegister);

router.post("/register", catchAsync(funcUser.register));

router.get("/login", funcUser.renderLoginForm);

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  funcUser.login
);

router.get("/logout", funcUser.logout);

module.exports = router;
