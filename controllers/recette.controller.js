const Recettes = require('../models/recette.model');
const moment = require('moment')

const fillRecette = (initialDate, departement) => {
    let thisMonth = 1
    let thisDate = moment(initialDate).format('YYYY-MM-DD')
    let defaultData = [{
        vercement: 0,
        credit: 0,
        recouvrement: 0,
        observation: "",
        departement: departement,
        date: thisDate,
        mois: thisMonth,
    }]

    for (let i = 0; i < 364; i++) {

        thisMonth = moment(defaultData[i].date).format('DD') === "15" ? thisMonth += 1 : defaultData[i].mois
        thisDate = moment(defaultData[i].date).add(1, 'day').format('YYYY-MM-DD')

        defaultData.push({
            vercement: 0,
            credit: 0,
            recouvrement: 0,
            observation: "",
            departement: departement,
            date: thisDate,
            mois: thisMonth,
        })

    }
    Recettes.insertMany(defaultData).then(() => {
        console.log('fillRecette successfully');
    }).catch((error) => {
        console.log("ERROR with insertMany" + error);
    });
}


module.exports.postDatas = (req, res, next) => {
    const recette = new Recettes({
        vercement: req.body.vercement,
        credit: req.body.credit,
        recouvrement: req.body.recouvrement,
        observation: req.body.observation,
        departement: req.body.departement,
        date: req.body.date,
        mois: req.body.mois,
    });
    recette.save().then(() => {
        res.status(201).json({
            message: 'successfully'
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: "ERREUR" + error
        });
    }
    );
}

module.exports.updateDatas = (req, res, next) => {
    const recette = new Recettes({
        _id: req.params.id,
        vercement: req.body.vercement,
        credit: req.body.credit,
        recouvrement: req.body.recouvrement,
        observation: req.body.observation,
        departement: req.body.departement,
        date: req.body.date,
        mois: req.body.mois,
    });
    Recettes.updateOne({ _id: req.params.id }, recette).then(
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

module.exports.getByDepartAndMonth = (req, res, next) => {
    Recettes.find({ departement: req.params.depart, mois: req.params.id }).then(
        (Recettes) => {
            res.status(200).json(Recettes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports.getDepartState = (req, res, next) => {
    Recettes.find({ departement: req.params.id }).sort({ $natural: -1 }).then(
        (Recettes) => {
            res.status(200).json(Recettes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports.getByMonth = (req, res, next) => {
    /**
     * @params [O] = id
     * @params [1] = name departement
     */
    const params = req.params.id.split('-')

    Recettes.find({ mois: params[0] }).sort({ createdAt: 1 }).then(
        (Recettes) => {
            const result = Recettes.filter(depart => depart.departement === params[1]);
            if (result.length === 0) {
                const date = new Date();
                const initialDate = `${date.getFullYear()}-02-16`
                fillRecette(initialDate, params[1])
            }
            res.status(200).json(Recettes);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).json({
                error: error
            });
        }
    );
}