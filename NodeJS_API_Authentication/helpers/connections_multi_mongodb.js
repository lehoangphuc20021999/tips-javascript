const mongoose = require('mongoose')
require('dotenv').config()

// In the future, project will be bigger
// Connect multi database
function newConnection(uri) {
    const conn = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    conn.on('connected', function () {
        console.log(`Mongodb::: connected:::${this.name}`)
    })

    conn.on('disconnected', function () {
        console.log(`Mongodb::: disconnected:::${this.name}`)
    })

    conn.on('error', function (error) {
        console.log(`Mongodb::: error:::${JSON.stringify(error)}`)
    })

    return conn
}

// Make connection to DB test
const testConnection = newConnection(process.env.URI_MONGODB_TEST)
const usersConnection = newConnection(process.env.URI_MONGODB_USERS)

module.exports = {
    testConnection,
    usersConnection
}