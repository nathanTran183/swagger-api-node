var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    mobile_number: {
        type: String,
        required: true,
        unique: true,
        match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        uniqueCaseInsensitive: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: false
    }
});
UserSchema.plugin(uniqueValidator,  { message: 'Error: expected {PATH} cannot be duplicated.' });

module.exports = mongoose.model('User', UserSchema);
