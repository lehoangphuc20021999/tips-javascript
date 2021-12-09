const redis = require('redis');

const client = redis.createClient();

(async () => {
    client.on('connect', () => console.log('Connected'));
    client.on('ready', () => console.log('Redis to ready'));
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
})();

module.exports = client