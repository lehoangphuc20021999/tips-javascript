const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient();
const subscribe = client.duplicate();

(async () => {
    await subscribe.connect();

    // subscribe channel
    await subscribe.subscribe('ordersystem', (message, channel) => {
        console.log(`The channel for payment is ${channel}`)
        console.log(`The message for payment is `, JSON.parse(message))
    });
})();

app.listen(3001, () => {
    console.log(`The payment running at 3001`)
})