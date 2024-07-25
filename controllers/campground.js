const Campground = require("../models/campground"); //get schema
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;
const joi = require("joi");
const ExpressError = require("../utils/ExpressError"); //Error Handling

module.exports.index = async (req, res) => {
  //Route to the all the campgrounds page
  const campground = await Campground.find({});
  res.render("campgrounds/index", { campground });
};

module.exports.renderForm = (req, res) => {
  //Route to add new Campgrounds
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
  // if (!req.body.campground)
  //   throw new ExpressError("Invalid Campground Data", 400);
  const campgroundSchema = joi.object({
    campground: joi
      .object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        // image: joi.string().required(),
        location: joi.string().required(),
        description: joi.string().required(),
      })
      .required(),
  });
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  const geoData = await maptilerClient.geocoding.forward(
    req.body.campground.location,
    { limit: 1 }
  ); //map
  const new_camp = new Campground(req.body.campground);
  new_camp.geometry = geoData.features[0].geometry; //map
  new_camp.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  new_camp.author = req.user._id;
  await new_camp.save();
  console.log(new_camp);
  req.flash("success", "Successfully made new Campground");
  res.redirect(`/campgrounds/${new_camp._id}`);
};

module.exports.show = async (req, res) => {
  //Route for the individual campground detail
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  console.log(campground);
  if (!campground) {
    req.flash("error", "Cannot find campground");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.editCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find campground");
    return res.redirect("/campgrounds");
  }
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You dont have permission to do this");
    return res.redirect(`/campgrounds/${id}`);
  }
  // res.render("campgrounds/show", { campground });
  res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You dont have permission to do this");
    return res.redirect(`/campgrounds/${id}`);
  }
  const camp = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const geoData = await maptilerClient.geocoding.forward(
    req.body.campground.location,
    { limit: 1 }
  );
  camp.geometry = geoData.features[0].geometry;
  req.flash("success", "Successfully Updated");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You dont have permission to do this");
    return res.redirect(`/campgrounds/${id}`);
  }
  const camp = await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground ");
  res.redirect("/campgrounds");
};
