const mongoose = require("mongoose"); //Getting Mongoose
const Review = require("./review");
const Schema = mongoose.Schema; // Making a short variable rather than typing whole thing

const opts={toJSON:{virtuals:true}};
const campgroundSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
},opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function(){
  return `<strong><a href='/campgrounds/${this._id}'>${this.title}</a><strong>
  <p>${this.description.substring(0,50)}...</p>`
})

campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});



module.exports = mongoose.model("Campground", campgroundSchema);
