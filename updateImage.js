const mongoose = require("mongoose");
const Campground = require("./models/campground");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp");
  console.log("MONGO CONNECTION ESTABLISHED");

  const campgrounds = await Campground.find({});
  for (let campground of campgrounds) {
    campground.image = `https://picsum.photos/350/300?random=${Math.random()}`;
    await campground.save();
  }

  console.log("ALL CAMPGROUNDS UPDATED");
  mongoose.connection.close();
}
