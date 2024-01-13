const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  title: String,
  imageURL: [String],
  price: Number,
  rating: Number,
  description: String,
  artistname: String,
  artdescription: String,

});


module.exports = mongoose.model("products", ProductSchema);
