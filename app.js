const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path')
require('dotenv').config()

const employeesRoute = require('./routes/employee.route')
const recettesRoute = require('./routes/recette.route')
const depensesRoute = require('./routes/depense.route')
const salairesRoute = require('./routes/salaire.route')
// const usersRoute = require('./routes/user.route')
const usersRoute = require('./routes/user.route');
const auth = require('./middleware/auth');


const app = express();
// app.use((req, res, next) => {
// res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });
// app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('client/build'))

app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/api/employees', employeesRoute);
app.use('/api/recettes', recettesRoute);
app.use('/api/depenses', depensesRoute);
app.use('/api/salaires', salairesRoute);
app.use('/api/users', usersRoute);

app.get("/api", (_, res) => {
    // res.setHeader("Content-Type", "text/html")
    res.status(200).send({
        msg: "hello worls"
    })
})

app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// mongoose.connect('mongodb+srv://salim:Motdepass1@serverartsider.yxmlj.mongodb.net/smartbook?retryWrites=true&w=majority',
mongoose.connect('mongodb://localhost:27017/smartbook',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


module.exports = app;
