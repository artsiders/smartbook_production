const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    emp_firstname: { type: String, required: true },
    emp_lastname: { type: String, required: true },
    emp_sex: { type: String, required: true },
    emp_phone: { type: Number, required: true },
    emp_email: { type: String, required: true },
    emp_post: { type: String, required: true },
    emp_address: { type: String, required: true },
    salaire_base: { type: Number, required: true },
    idhotel: { type: String, required: true },
});
module.exports = mongoose.model('Employees', employeeSchema);