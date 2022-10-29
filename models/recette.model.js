const mongoose = require('mongoose');

const recetteSchema = mongoose.Schema({
    vercement: { type: Number, required: false },
    credit: { type: Number, required: false },
    recouvrement: { type: Number, required: false },
    observation: { type: String, required: false },
    departement: { type: String, required: true },
    date: { type: String, required: true },
    mois: { type: Number, required: true },
}, { timestamps: true, });
module.exports = mongoose.model('Recettes', recetteSchema);