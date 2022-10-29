const mongoose = require('mongoose');

const salaireSchema = mongoose.Schema({
    acompte: { type: Number, required: false },
    sanction: { type: Number, required: false },
    prime: { type: Number, required: false },
    id_emp: { type: String, required: true },
    date: { type: String, required: true },
    mois: { type: Number, required: true },
}, { timestamps: true, });
module.exports = mongoose.model('Salaires', salaireSchema);