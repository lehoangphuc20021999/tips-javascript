const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.get('/user/111', (req, res, next) => {
    res.json({
        status: 'success',
        student: {
            userId: 111,
            name: 'annoystick',
            links: {
                feeds_url: 'http://localhost:5000/feeds/111'
            }
        }
    })
})

app.get('/feeds/111', (req, res, next) => {
    res.json({
        status: 'success',
        feeds: [
            {
                title: 'title 01',
                like: 3,
                links: {
                    likes_url: 'http://localhost:5000/like/1'
                }
            },
            {
                title: 'title 02',
                like: 3,
                links: {
                    likes_url: 'http://localhost:5000/like/2'
                }
            }
        ]
    })
})


app.listen(PORT, () => {
    console.log(`The server running at ${PORT}`)
})