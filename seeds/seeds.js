const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .catch((error) => handleError(error));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63751a898dc1f895886ba0c4",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste temporibus facere quaerat! Hic, ducimus mollitia saepe modi veritatis et unde neque inventore consequatur at nobis nemo natus officia qui perspiciatis.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dssa7pnqj/image/upload/v1668735562/YelpCamp/cu0l13loz69zqbmecfmk.jpg",
          filename: "YelpCamp/cu0l13loz69zqbmecfmk",
        },
        {
          url: "https://res.cloudinary.com/dssa7pnqj/image/upload/v1668735562/YelpCamp/g1pv5hdfcgnvhmyz14s2.jpg",
          filename: "YelpCamp/g1pv5hdfcgnvhmyz14s2",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
