/**
 * Created by phuct on 3/31/2017.
 */
var jwt = require('jsonwebtoken');
var util = require('util');
var expressJwt = require('express-jwt');
var config = require('../../config/env');
var Account = require('../models/Account');

function login(req, res) {
    var username = req.swagger.params.username.value || '';
    var password = req.swagger.params.password.value || '';
    Account.findOne({username: username}).exec(function (err, user) {
        if (err) return err;
        if (!user) return res.status(400).json({
            message: 'Wrong username!'
        });
        if (password !== user.password) {
            return res.status(400).json({
                message: 'Wrong password!'
            });
        } else {
            const token = jwt.sign({userId: user._id}, config.jwtSecret);
            return res.json({
                token: token,
                message: 'success',
                user: user
            })
        }
    });
}

function createAccount(req, res) {
    var account = new Account();
    account.username = 'admin';
    account.password = '123123';
    account.role = 'admin';
    account.save(function(err, savedAccount){
        if (err) return res.status(404).json(err);
        return res.json({
            message: 'Create success!'
        });
    });
}

function protected(req, res) {
    // this sends back a JSON response which is a single string
    console.log(req.user.userId);
    res.status(200).json({
        message: 'access success!'
    });
}

function updatePassword(req, res) {
    var currentPass = req.swagger.params.currentPass.value || '';
    var newPass = req.swagger.params.newPass.value || '';
    var retypePass = req.swagger.params.retypePass.value || '';
    Account.findById(req.user.userId).exec(function (err, user) {
        if (err) return res.status(404).json(err);
        if (!user) return res.status(404).json({
            message: 'system error'
        });
        if (user.password != currentPass)
            return res.status(400).json({
                message: 'Wrong current password'
            });
        if (newPass !== retypePass)
            return res.status(400).json({
                message: 'New password doesn\'t match retype password'
            });
        user.password = newPass;
        user.save(function (err, savedUser) {
            if (err) return res.status(404).json(err);
            return res.json({
                message: 'Update success!',
                user: user
            });
        });
    });
}


module.exports = {
    login: login,
    createAccount: createAccount,
    updatePassword: updatePassword,
    protected: protected,
};

/*
function mw(middlewares) {
    return function (req, res, next) {
        const stack = [];
        for (var i = middlewares.length; i--; i > 0) {
            const middleware = middlewares[i];
            if (i === 0) {
                middleware(req, res, stack[stack.length - i - 1]);
            } else if (i === middlewares.length - 1) {
                stack.push(
                    function () {
                        middleware(req, res, next);
                    }
                );
            } else {
                stack.push(
                    function () {
                        middleware(req, res, stack[stack.length - i - 1]);
                    }
                );
            }
        }
    }
}*/
