const express = require('express')
const app = express()
const UserRoute = require('./Routes/User.route')
const createError = require('http-errors')

require('dotenv').config()
require('./helpers/connections_mongodb') // Mongodb will automatically run

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Convert all Javascript type to JSON

app.get('/', (req, res, next) => {
    res.send('Home page')
})

app.use('/user', UserRoute)

app.use((req, res, next) => {
    // const error = new Error('Not Found')
    // error.status = 500
    // next(error)
    next(createError.NotFound('This route does not exist'))
})

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})