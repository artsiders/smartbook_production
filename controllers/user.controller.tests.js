const userModel = require("../models/user.model")
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-user_pass");
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}

module.exports.userInfo = (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    userModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log(`error ID ${err}`);
    }).select('-password')
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        await userModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    user_phone: req.body.user_phone,
                    user_email: req.body.user_email,
                    user_login: req.body.user_login,
                    user_pass: req.body.user_pass,
                    join_date: req.body.join_date,
                    role: req.body.role,
                }
            },
            { new: false, upsert: false, setDefaultOnInsert: false },
            (error, docs) => {
                if (!error) return res.json(docs);
                if (error) return res.status(500).json({ message: "ligne 48" });
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `ligne 52 ${error}` })
    }
}

module.exports.deleteUser = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)

    try {
        await userModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted ." })
    } catch (err) {
        res.status(500).json({ message: err })

    }
}