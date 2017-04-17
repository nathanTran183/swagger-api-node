/**
 * Created by phuct on 4/7/2017.
 */
var User = require('../models/User');
var utils = require('../helpers/Utils');
function list(req, res){
    User.find().exec(function(err, users){
        if(err) return res.status(500).json({
            message: 'System error!'
        });
        return res.json({
            message: 'get List user success',
            data: users
        });
    })
}

function create(req, res) {
    var user = new User();
    user.first_name = req.swagger.params.body.value.first_name;
    user.last_name = req.swagger.params.body.value.last_name;
    user.address = req.swagger.params.body.value.address;
    user.date_of_birth = req.swagger.params.body.value.date_of_birth;
    user.mobile_number = req.swagger.params.body.value.mobile_number;
    user.email = req.swagger.params.body.value.email;
    user.create_at = new Date();

    user.save(function(error, savedUser){
        if(error) {
            utils.getStringErrors(error.errors, function (err, message) {
                if (err) {
                    return res.json(err);
                }
                return res.status(500).json({
                    message: message
                });
            });
        } else {
            return res.status(201).json({
                message: 'Create user success',
                data: savedUser
            });
        }
    });
}

function detail(req, res){
    var id = req.swagger.params.id.value;
    User.findById(id).exec(function(err, user){
        if(err) return res.status(500).json({
            message: 'System error'
        });
        if(!user) return res.status(404).json({
            message: 'User with this id not found!'
        });
        return res.json({
            message: 'Find user success!',
            data: user
        });
    });
}

function update(req, res){
    var id = req.swagger.params.id.value;
    User.findById(id).exec(function(err, user){
        if(err) return res.status(500).json({
            message: err.message
        });
        if(!user) return res.status(404).json({
            message: 'User with this id not found!'
        });
        user.first_name = req.swagger.params.body.value.first_name || user.first_name;
        user.last_name = req.swagger.params.body.value.last_name || user.last_name;
        user.address = req.swagger.params.body.value.address || user.address;
        user.date_of_birth = req.swagger.params.body.value.date_of_birth || user.date_of_birth;
        user.mobile_number = req.swagger.params.body.value.mobile_number || user.mobile_number;
        user.email = req.swagger.params.body.value.email || user.email;
        user.updated_at = new Date();

        user.save(function(err, savedUser){
            if(err) return res.status(500).json({
                message: 'System error'
            });
            return res.json({
                message: 'Update user success',
                data: savedUser
            });
        });
    })
}

function delUser(req, res){
    var id = req.swagger.params.id.value;
    User.findById(id).exec(function(err, user){
        if(err) return res.status(500).json({
            message: 'System error'
        });
        if(!user) return res.status(404).json({
            message: 'User with this id not found!'
        });
        user.remove(function(err){
            if(err) return res.status(500).json({
                message: 'System error'
            });
            return res.status(204).json();
        })
    });
}

module.exports = {
    list: list,
    create: create,
    detail: detail,
    update: update,
    delUser: delUser
}

