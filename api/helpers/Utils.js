/**
 * Created by phuct on 4/10/2017.
 */
const async = require('async');
function getStringErrors(errors, done) {
    async.waterfall(
        [
            function (callback) {
                var messageArray = [];
                for (var key in errors) {
                    messageArray.push(errors[key].message);
                }
                callback(null, messageArray);
            },
            function (messageArray, callback) {
                var message = messageArray.join("\n");
                callback(null, message);
            }
        ],
        function (err, result) {
            if (err)
                return done(err);
            else
                return done(null, result);
        }
    );
}

module.exports = {
    getStringErrors: getStringErrors,
}