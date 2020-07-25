const nodemailer = require('nodemailer');
require('dotenv-safe').config();

const sendMail = (email, code) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Recuperação de senha',
        text: 'Segue o código de recuperação da senha',
        html: `<h1>Código:</h1><p>${code}</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

module.exports = { sendMail };
