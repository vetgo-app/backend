const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  uid: String,
  file: String,
  docName: String,
  date: Date,
});

const petSchema = mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: String,
  weight: String,
  sexe: String,
  identification: String,
  dateOfBirth: String,
  photo: String,
  documents: [documentSchema],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Pet = mongoose.model("pets", petSchema);
module.exports = Pet;
