const devConfig = {
    env: 'development',
    jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
    db: 'mongodb://localhost/swagger-node-api',
    expireTime: 86400 * 15, // expireTime == 15 days
};

module.exports = devConfig;