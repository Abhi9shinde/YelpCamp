const express = require("express");
const joi = require("joi");
const router = express.Router();
const catchAsync = require("../utils/catchAsync"); //Error Handling
const ExpressError = require("../utils/ExpressError"); //Error Handling
const Campground = require("../models/campground"); //get schema
const { isLoggedIn } = require("../middleware");
const funcCampground = require("../controllers/campground");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

/****************new camp******************************** */
router.get("/new", isLoggedIn, funcCampground.renderForm);
/************************creating new campground***************** */
router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  catchAsync(funcCampground.createCampground)
);

/***********INDEX*************************** */
router.get("/", catchAsync(funcCampground.index));

//***************get individual detail*********************** */
router.get("/:id", catchAsync(funcCampground.show));

//*********************edit or update********************* */
router.get("/:id/edit", isLoggedIn, catchAsync(funcCampground.editCampground));

router.put("/:id", isLoggedIn, catchAsync(funcCampground.updateCampground));

/*****************************DELETE***************** */
router.delete("/:id", isLoggedIn, catchAsync(funcCampground.deleteCampground));

module.exports = router;
