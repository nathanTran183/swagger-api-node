/**
 * Created by phuct on 4/4/2017.
 */
var mongoose = require('mongoose');

/**
 * User Schema
 */
const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

/**
 * @typedef User
 */
module.exports =  mongoose.model('Account', AccountSchema);
