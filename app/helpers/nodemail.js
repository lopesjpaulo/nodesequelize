const nodemailer = require('nodemailer');
require('dotenv-safe').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendMail = (email, code) => {
    
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

const validEmail = (email, code) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Validação de email',
        text: 'Segue o código para validação do email',
        html: `<h1>Código:</h1><p>${code}</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

module.exports = { sendMail, validEmail };
