const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
  zipCode: String, //en string et non number car pour certain pays + memoire
});

const storeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  specialization: String,
  occupation: String,
  price: Number,
  emergency: Boolean,
  visio: Boolean,
  homeConsultation: Boolean,
  address: addressSchema,
});

const Store = mongoose.model("stores", storeSchema);

module.exports = Store;
