const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes');
const paginate = require('express-paginate');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(paginate.middleware(10, 50));

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/', routes);

app.listen(PORT);
