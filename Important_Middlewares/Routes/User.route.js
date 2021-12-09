const express = require('express')
const route = express.Router()
const createError = require('http-errors')

route.get('/', (req, res, next) => {
    next(createError.InternalServerError('This is a Error to Log'))
    // res.send('List users')
})

route.route('/users')
    .get((req, res, next) => {
        console.log('This is a:::', a)
        res.json({
            status: 'success',
            elements: [{}]
        })
    })
    .post((req, res, next) => {
        res.send('Create a Post')
    })

route.route('/users/id')
    .get((req, res, next) => {
        res.send('Get a specific User')
    })
    .delete((req, res, next) => {
        res.send('Delete a User')
    })
    .put((req, res, next) => {
        res.send('Put a User')
    })
    .patch((req, res, next) => {
        res.send('Patch a User')
    })

module.exports = route

