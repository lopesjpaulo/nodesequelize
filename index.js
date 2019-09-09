const express = require('express');
const routes = require('./app/routes/routes');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.urlencoded({
    extended: true
}));

//User.create({ name: 'João', email: 'joao@maxmeio.com', password: '123456'});
app.use('/', routes);

app.listen(PORT);