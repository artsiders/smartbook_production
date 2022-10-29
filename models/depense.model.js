const mongoose = require('mongoose');

const depenseSchema = mongoose.Schema({
    bar: { type: Number, required: false },
    hebergement: { type: Number, required: false },
    restaurant: { type: Number, required: false },
    facture: { type: Number, required: false },
    maintenence: { type: Number, required: false },
    salaire: { type: Number, required: false },
    tcb: { type: Number, required: false },
    autres: { type: Number, required: false },
    date: { type: String, required: true },
    mois: { type: Number, required: true },
}, { timestamps: true, });
module.exports = mongoose.model('Depenses', depenseSchema);