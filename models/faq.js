const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    questionFaq: String,
    réponseFaq: String,
});

// Initialization of the model
const Faq = mongoose.model("faqs", faqSchema);

// Export of the module
module.exports = Faq;