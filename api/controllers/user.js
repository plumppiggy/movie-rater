const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.userSignIn = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'email exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'user created',
                            user: {
                                id: user._id,
                                email: user.email
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                } 
            });
        }
    })
    
}

exports.userLoginIn = (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1 ) {
            return res.status(401).json({
                message: 'auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                }, 
                )
                return res.status(200).json({
                    message: 'auth sucessful',
                    token: token,
                    userId: user[0]._id
                });
            }
            res.status(401).json({
                message: 'auth failed'
            });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.userDelete = (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'user deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}