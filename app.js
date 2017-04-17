'use strict';

var SwaggerExpress = require('swagger-express-mw');
const mongoose = require('mongoose');
var expressJwt = require('express-jwt');
var app = require('express')();
var configEnv = require('./config/env');

module.exports = app; // for testing

var jwt = expressJwt({secret: configEnv.jwtSecret});

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
      Bearer: function(req, authOrSecDef, scopesOrApiKey, cb) {
        jwt(req ,req.res, cb);
      }
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }


  // install middleware
  swaggerExpress.register(app);

    mongoose.connect(configEnv.db, { server: { socketOptions: { keepAlive: 1 } } });
    mongoose.connection.on('error', function() {
        throw new Error('unable to connect to database:');
    });

  var port = process.env.PORT || 10010;
  app.listen(port);

/*  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }*/
});
