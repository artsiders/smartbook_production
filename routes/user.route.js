const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const Users = require('../models/user.model');

// const Users = require('../models/user.model');
// const userController = require('../controllers/user.controller');
// const authController = require('../controllers/auth.controller');

// // user authentification
// router.post("/register", authController.signUp);

// // user BD
// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.userInfo);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);
router.get('/:id', (req, res, next) => {
    Users.findOne({
        _id: req.params.id
    }).then(
        (users) => {
            res.status(200).json(users);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});


router.get('/' + '', (req, res, next) => {
    Users.find().then(
        (users) => {
            res.status(200).json(users);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.delete('/:id', (req, res, next) => {
    Users.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.put('/:id', (req, res, next) => {
    const users = new Users({
        _id: req.params.id,
        user_login: req.body.user_login,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        user_email: req.body.user_email,
    });
    Users.updateOne({ _id: req.params.id }, users).then(
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
});
router.post('/signup', userController.signup);
router.post('/login', userController.login);



module.exports = router;
