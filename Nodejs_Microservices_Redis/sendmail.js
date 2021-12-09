const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient();
const subscribe = client.duplicate();

(async () => {
    await subscribe.connect();

    // // subscribe channel
    // await subscribe.subscribe('ordersystem', (message, channel) => {
    //     console.log(`The channel for sendmail is ${channel}`)
    //     console.log(`The message for sendmail is `, JSON.parse(message))
    // });

    await subscribe.pSubscribe('o*', (message, channel) => {
        console.log(`The channel for sendmail is ${channel}`)
        console.log(`The message for sendmail is `, JSON.parse(message))
    });
})();

app.listen(3002, () => {
    console.log(`The sendmail running at 3002`)
})