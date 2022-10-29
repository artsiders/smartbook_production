const Depenses = require('../models/depense.model');
const moment = require('moment')


const fillDepenses = (initialDate) => {
    let thisMonth = 1
    let thisDate = moment(initialDate).format('YYYY-MM-DD')
    let defaultData = [{
        bar: 0,
        hebergement: 0,
        restaurant: 0,
        facture: 0,
        maintenence: 0,
        salaire: 0,
        autres: 0,
        tcb: 0,
        date: thisDate,
        mois: thisMonth,
    }]

    for (let i = 0; i < 364; i++) {

        thisMonth = moment(defaultData[i].date).format('DD') === "15" ? thisMonth += 1 : defaultData[i].mois
        thisDate = moment(defaultData[i].date).add(1, 'day').format('YYYY-MM-DD')

        defaultData.push({
            bar: 0,
            hebergement: 0,
            restaurant: 0,
            facture: 0,
            maintenence: 0,
            salaire: 0,
            autres: 0,
            tcb: 0,
            date: thisDate,
            mois: thisMonth,
        })

    }
    Depenses.insertMany(defaultData).then(() => {
        console.log('fillDepenses successfully');
    }).catch((error) => {
        console.log("ERREUR" + error);
    });
}


module.exports.postDatas = (req, res, next) => {
    const depense = new Depenses({
        bar: req.body.bar,
        hebergement: req.body.hebergement,
        restaurant: req.body.restaurant,
        facture: req.body.facture,
        maintenence: req.body.maintenence,
        salaire: req.body.salaire,
        autres: req.body.autres,
        tcb: req.body.tcb,
        date: req.body.date,
        mois: req.body.mois,
    });
    depense.save().then(() => {
        res.status(201).json({
            message: 'successfully'
        });
    }).catch((error) => {
        res.status(400).json({
            error: "ERREUR" + error
        });
    });
}

module.exports.getByMonth = (req, res, next) => {
    Depenses.find({ mois: req.params.id }).sort({ createdAt: 1 }).then(
        (Depenses) => {
            if (Depenses.length === 0) {
                const date = new Date();
                const initialDate = `${date.getFullYear()}-02-16`
                fillDepenses(initialDate)
            }
            res.status(200).json(Depenses);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports.updateDatas = (req, res, next) => {
    const depense = new Depenses({
        _id: req.params.id,
        bar: req.body.bar,
        hebergement: req.body.hebergement,
        restaurant: req.body.restaurant,
        facture: req.body.facture,
        maintenence: req.body.maintenence,
        salaire: req.body.salaire,
        autres: req.body.autres,
        tcb: req.body.tcb,
        date: req.body.date,
        mois: req.body.mois,
    });
    Depenses.updateOne({ _id: req.params.id }, depense).then(
        () => {
            res.status(201).json({
                message: 'updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports.getAll = (req, res, next) => {
    Depenses.find().then(
        (Depenses) => {
            res.status(200).json(Depenses);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}