const express = require('express');
const users = require('./app/routes/users');

const app = express();

app.use(express.urlencoded({
    extended: false
}));

//User.create({ name: 'João', email: 'joao@maxmeio.com', password: '123456'});

app.get('/', (req, res) => {
    res.send('Teste');
});

app.use('/', users);

app.listen(3000);