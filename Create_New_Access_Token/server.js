const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/// API
app.get('/api/refreshToken', (req, res) => {
    return res.status(200).json({
        status: 'success',
        elements: {
            token: 'newAccessToken',
            timeExpired: Date.now() + (60 * 1000)
       }
    })
})

app.get('/api/users', (req, res) => {
    return res.status(200).json({
        status: 'success',
        elements: [{
            name: 'anonystick',
        },{
            name: 'tips javascript'
        }]
    })
})

app.get('/api/login', (req, res) => {
   return res.status(200).json({
       status: 'success',
       elements: {
            token: 'accessToken',
            timeExpired: Date.now() + (60 * 1000)
       }
   })
})
/// END API


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})