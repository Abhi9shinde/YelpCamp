const Review = require("../models/review"); //schema for review
const Campground = require("../models/campground"); //get schema
const ExpressError = require("../utils/ExpressError"); //Error Handling
const joi = require("joi");
const reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required().min(1).max(5),
      body: joi.string().required(),
    })
    .required(),
});

module.exports.createReview = async (req, res) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "New review added");

  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewID } = req.params;

  // Step 1: Remove review from Campground's reviews array
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });

  await Review.findByIdAndDelete(req.params.reviewID);
  req.flash("success", "Deleted a review");
  res.redirect(`/campgrounds/${id}`);
};
