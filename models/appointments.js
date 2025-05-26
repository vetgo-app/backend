// Import of mongoose
const mongoose = require("mongoose");

// Creation of the Schema
const appointmentsSchema = mongoose.Schema({
    userName: String,
    reason: String,
    appointmentsDate: Date,
});

// Initialization of the model
const Appointnements = mongoose.model("appointments", appointmentsSchema);

// Export of the module
module.exports = Appointnements;