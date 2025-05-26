// Import of mongoose
const mongoose = require('mongoose');

// Creation of the Schema
const faqSchema = mongoose.Schema({
    questionFaq: String,
    réponseFaq: String,
});

// Initialization of the model
const Faq = mongoose.model("faqs", faqSchema);

// Export of the module
module.exports = Faq;