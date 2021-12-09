const express = require('express')
const app = express()

const redis = require('redis');
const publish = redis.createClient();

(async () => {
    await publish.connect();
})();

app.get('/order', async (req, res) => {
    const order = [
        {
            productId: 1,
            price: 5000
        },
        {
            productId: 2,
            price: 10000
        },
    ]

    // Step - payment.js and sendmail
    await publish.publish('o0000000', JSON.stringify(order))

    res.json({
        status: 'success',
        message: 'Thank you'
    })
})

app.listen(3000, () => {
    console.log(`The order running at 3000`)
})