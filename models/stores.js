const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
  zipCode: String, //en string et non number car pour certain pays + memoire
  geo: {
    lat: Number,
    lon: Number,
  }
});

const storeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, //ref au schema users
  specialization: String,
  occupation: String,
  price: Number,
  isSelectedUrgence: Boolean,
  isSelectedVisio: Boolean,
  isSelectedDom: Boolean,
  address: addressSchema,
});

const Store = mongoose.model("stores", storeSchema);

module.exports = Store;
