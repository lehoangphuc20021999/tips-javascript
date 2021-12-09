const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('./connections_redis')

require('dotenv').config();

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '1h' // 10m 10s
        }

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }

    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]

    //start verify token
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))
        }

        req.payload = payload
        next()
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
            if (err) return reject(err)

            // Query payload from redis
            let refTokenRedis = await client.get(payload.userId)

            if (refTokenRedis !== refreshToken) {
                return reject(createError.Unauthorized())
            }

            resolve(payload)
        })
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: '10h' // 10m 10s
        }

        JWT.sign(payload, secret, options, async (err, token) => {
            if (err) reject(err)

            // Save in redis
            let refTokenRedis = await client.set(userId.toString(), token, { 'EX': 365 * 24 * 60 * 60 })

            if (refTokenRedis !== 'OK') {
                return reject(createError.InternalServerError())
            }

            resolve(token)
        })
    })
}


module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}