const express = require('express');
const users = require('./app/routes/users');
const teachers = require('./app/routes/teachers');

const app = express();

app.use(express.urlencoded({
    extended: false
}));

//User.create({ name: 'João', email: 'joao@maxmeio.com', password: '123456'});

app.get('/', (req, res) => {
    res.send('Teste 1');
});

app.use('/', users);
app.use('/', teachers);

app.listen(3000);