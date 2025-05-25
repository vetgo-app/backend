const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    file: String,
    type: String,
    date: Date,
});

const petSchema = mongoose.Schema({
    name: String,
    type: String,
    breed: String,
    age: Number,
    weight: Number,
    photo: String,
    documents: documentSchema,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
})

const Pet = mongoose.model('pets', petSchema);
module.exports = Pet;