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

const cadastroEmailAluno = (email) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro na GUIG!',
        text: 'Você agora faz parte da GUIG. Boas aulas.',
        html: `<h1>Parabéns!</h1><p>Você agora faz parte da GUIG. Boas aulas!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const cadastroEmailTutor = (email) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro na GUIG!',
        text: 'Você está quase lá!',
        html: `<h1>Parabéns!</h1><p>Seu cadastro na GUIG está quase pronto. Estamos
        fazendo a avaliação do seu perfil para você poder acesso total a plataforma!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const aprovadoEmail = (email, code) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro aprovado!',
        text: 'Parabéns!',
        html: `<h1>Parabéns!</h1><p>Seu cadastro foi aprovado e você agora faz parte da GUIG. Boas aulas!</p><br>
        <p>Agora você pode também convidar outros professores para a plataforma. Informe o código ${code} para eles efetuarem o cadastro.</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const reprovadoEmail = (email, motivo) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cadastro reprovado',
        text: 'Houve um problema no seu cadastro!',
        html: `<h1>Ops...</h1><p>Parace que houve um problema com seu cadastro! ${motivo}</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const aulaAgendadaProfessorEmail = (email, alunoName, date) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Aula agendada!',
        text: 'Uma aula foi agendada!',
        html: `<p>O aluno ${alunoName} agendou uma aula com você na data: ${date}</p><br>
        <p>Observe as dicas e recomendações da GUIG para uma boa aula!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const aulaAgendadaAlunoEmail = (email, professorName, date) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Aula agendada!',
        text: 'Uma aula foi agendada!',
        html: `<h1>Sua próxima aula está marcada!</h1><p>Você agendou uma aula com o professor ${professorName} na data: ${date}</p><br>
        <p>Observe as dicas e recomendações da GUIG para uma boa aula!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const aulaProximaProfessorEmail = (email, alunoName) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sua aula vai começar!',
        text: 'Sua aula vai começar!',
        html: `<p>Sua aula com o aluno ${alunoName} vai começar daqui a 15 minutos.</p><br>
        <p>Observe as dicas e recomendações da GUIG para uma boa aula!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const aulaProximaAlunoEmail = (email, professorName) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sua aula vai começar!',
        text: 'Sua aula vai começar!',
        html: `<p>Sua aula com o professor ${professorName} vai começar daqui a 15 minutos.</p><br>
        <p>Observe as dicas e recomendações da GUIG para uma boa aula!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const aulaFinalizadaEmail = (email) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sua aula foi concluida!',
        text: 'Obrigado!',
        html: `<p>Sua aula foi finalizada com sucesso.</p><br>
        <p>Lembre-se de fazer uma avaliação da aula. Isso é muito importante para nós!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

const aulaCanceladaEmail = (email, date, professorName) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sua aula foi cancelada!',
        text: 'Cancelamento!',
        html: `<p>Infelizmente sua aula na data ${date} com o professor ${professorName} foi cancelada.</p><br>
        <p>Acesse a plataforma para fazer uma remarcação de aula!</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return false;
        }
    });

    return true;
}

module.exports = { 
    sendMail, 
    validEmail,
    cadastroEmailAluno,
    cadastroEmailTutor,
    aprovadoEmail,
    reprovadoEmail,
    aulaAgendadaProfessorEmail,
    aulaAgendadaAlunoEmail,
    aulaProximaProfessorEmail,
    aulaProximaAlunoEmail,
    aulaFinalizadaEmail,
    aulaCanceladaEmail
};
