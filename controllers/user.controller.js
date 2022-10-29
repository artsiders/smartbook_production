const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.user_pass, 10)
        .then(hash => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                user_phone: req.body.user_phone,
                user_email: req.body.user_email,
                user_login: req.body.user_login,
                role: req.body.role,
                user_pass: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => {
                    res.status(400).json({ error })
                });
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
};


exports.login = (req, res, next) => {
    User.findOne({ user_login: req.body.user_login })
        .then(user => {
            console.log(user.user_pass, req.body.user_pass);
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.user_pass, user.user_pass)
                .then(valid => {
                    if (!valid) {
                        return res.status(201).json({
                            message: 'Mot de passe incorrect !'
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'ART_SIDER_TOKEN',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(201).json({
                    error: error,
                    message: "mot de passe incorrect"
                }));
        })
        .catch(error => res.status(201).json({
            error: error,
            message: "mauvais login"
        }));
};