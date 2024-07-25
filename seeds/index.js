const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp");
  console.log("MONGO CONNECTION ESTABLISHED");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  //Writing functions
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000 + 1); // Get random 50 names from seeds
    const price = Math.floor(Math.random() * 20 + 10); //Get random price of each camp
    const camp = new Campground({
      author: "669a0f67b2997359d9e6e290",
      location: `${cities[random].city},${cities[random].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://picsum.photos/seed/picsum/200/300random=${Math.random()}",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur distinctio alias temporibus dolorum cum minima ipsum? Eaque voluptatem nemo a natus corrupti. Suscipit nemo aliquam incidunt ullam asperiores, earum commodi?",
      price,
      geometry: {
        type: "Point",
        coordinates: [ 
          cities[random].longitude,
          cities[random].latitude
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/ds51awnkj/image/upload/v1721479827/YelpCamp/rzqtmkzrcjdm1zajwiay.jpg",
          filename: "YelpCamp/rzqtmkzrcjdm1zajwiay",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
