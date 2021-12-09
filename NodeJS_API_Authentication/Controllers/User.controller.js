const createError = require('http-errors')
const User = require('../Models/User.model')
const { userValidate } = require('../helpers/validation')
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_service')
const client = require('../helpers/connections_redis')

module.exports = {
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body
            // Check format of password and email
            const { error } = userValidate(req.body)

            if (error) {
                throw createError(error.details[0].message)
            }

            const isExist = await User.findOne({
                email: email
            })

            if (isExist) {
                throw createError.Conflict(`${email} is ready been registered`)
            }

            // method save() support for middleware
            // method create() not support middleware
            const user = new User({
                email,
                password
            })

            const savedUser = await user.save()

            return res.json({
                status: 'Okay',
                elements: savedUser
            })
        } catch (error) {
            next(error)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()

            const { userId } = await verifyRefreshToken(refreshToken)

            const accessToken = await signAccessToken(userId)
            const refToken = await signRefreshToken(userId)

            res.json({
                accessToken,
                refreshToken: refToken
            })
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            // Check format of password and email
            const { error } = userValidate(req.body)

            if (error) {
                throw createError(error.details[0].message)
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                throw createError.NotFound('User not registered')
            }

            const isValid = await user.isCheckPassword(password)

            if (!isValid) {
                throw createError.Unauthorized();
            }

            const accessToken = await signAccessToken(user._id)
            const refreshToken = await signRefreshToken(user._id)

            res.send({ accessToken, refreshToken })
        } catch (error) {
            next(error)
        }
    },
    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()

            const { userId } = await verifyRefreshToken(refreshToken)

            let deletedRefreshToken = await client.del(userId.toString())

            if (deletedRefreshToken !== 1) {
                throw createError.InternalServerError()
            }

            res.json({
                message: 'Logout!'
            })
        } catch (error) {
            next(error)
        }
    },
    getlists: (req, res, next) => {
        const listUsers = [
            {
                email: 'abc@gmail.com'
            },
            {
                email: 'def@gmail.com'
            },
        ]

        res.json({
            listUsers
        })
    }
}