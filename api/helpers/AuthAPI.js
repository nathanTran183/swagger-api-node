/**
 * AuthAPI
 *
 */
const jwt = require('jsonwebtoken');
const config = require('../../config/env');

module.exports = function(req, res, next) {
    var token;
    if (req.headers && req.headers.authorization && req.headers.authorization!== "") {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.status(401).json({message:'Format is Authorization: Bearer [token]'});
        }
    } else if (req.params.token) {
        token = req.params.token;
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        return res.status(401).json({message: 'No Authorization header was found'});
    }
    jwt.verify(token, config.jwtSecret, function (err, payload) {
        if (err) {
            return res.json(err);
        }
        next();
    });
};