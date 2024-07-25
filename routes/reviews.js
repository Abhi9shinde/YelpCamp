const express = require("express");
const joi = require("joi");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground"); //get schema
const Review = require("../models/review"); //schema for review
const catchAsync = require("../utils/catchAsync"); //Error Handling
const ExpressError = require("../utils/ExpressError"); //Error Handling
const { isLoggedIn } = require("../middleware");
const funcReview = require("../controllers/reviews");

/******************************REVIEW Model************* */
router.post("/", isLoggedIn, catchAsync(funcReview.createReview));

router.delete("/:reviewID", isLoggedIn, catchAsync(funcReview.deleteReview));

module.exports = router;
