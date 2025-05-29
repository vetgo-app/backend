const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "stores" },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "pets" },
  date: String,
  price: Number,
  reason: String,
  firstRdv: Boolean,
  isMyAnimal: Boolean,
});

const Appointment = mongoose.model("appointments", appointmentSchema);
module.exports = Appointment;
