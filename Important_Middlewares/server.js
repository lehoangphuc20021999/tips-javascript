const express = require('express')
const app = express()
require('dotenv').config()

const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

const createError = require('http-errors')
const logEvents = require('./Helpers/logEvents')

const userRoute = require('./Routes/User.route')
const {v4: uuid} = require('uuid')

app.use(helmet())
app.use(morgan('common'))

const PORT = process.env.PORT || 5000

// mongoose.connect('mongodb://127.0.0.1:27017/test', (err) => {
//     if(err){
//         console.error(`Database connection Failed!`)
//     }else{
//         console.log(`Database connection Success`)
//     }
// })

// Connect to Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/test', {serverSelectionTimeoutMS: 3000})
.then(result => {
    console.log('Database connection Success')
})
.catch(err => console.error('Database connection Failed!', err))

mongoose.connection.on('connected', () => {
    console.log('Mongodb connected to db!');
})

mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongodb connection is disconnected');
})

// Use this to know your system disconnect
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

app.use('/v1/', userRoute)

app.use((req, res, next) => {
    // res.status(404)
    // res.json({
    //     status: 404,
    //     message: 'Not Found!',
    //     links: {
    //         'docs': 'https://doc.com/api'
    //     }
    // })
    next(createError(404, "Not Found!"))
})

app.use((err, req, res, next) => {
    logEvents(`idError --- ${uuid()} --- ${req.url} --- ${req.method} --- ${err.message}`)
    res.status(err.status || 500)
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})
