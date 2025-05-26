// Import of mongoose
const mongoose = require("mongoose");

// Creation of the Schema
const healthJournalSchema = mongoose.Schema({
    name: String,
    age: Number,
    dateOfBirth: String,
    race: String,
    sexe: String,
    weight: String,
    identification: Number
    
});

// Initialization of the model
const HealthJournal = mongoose.model("pets", healthJournalSchema);

// Export of the module
module.exports = HealthJournal;