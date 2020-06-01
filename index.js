const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/', routes);

app.listen(PORT);
