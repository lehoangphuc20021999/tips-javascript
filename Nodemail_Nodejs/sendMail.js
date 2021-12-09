const {google} = require('googleapis')
const nodemailer = require("nodemailer");
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID 
const CLIENT_SECRET = process.env.CLIENT_SECRET 
const REDIRECT_URI = process.env.REDIRECT_URI 
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const sendMail = async () =>{
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'leminhson14021971@gmail.com', // Email gửi đi
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <leminhson14021971@gmail.com>', // sender address
            to: "lehoangphuc20021999@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?123", // plain text body
            html: "<b>Hello world?456</b>", // html body
        });

        console.log(info);
    } catch (error) {
        console.error(error)
    }
}

sendMail()
