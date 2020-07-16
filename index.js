const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paginate = require('express-paginate');

const PORT = 3333;
const HOST = '0.0.0.0';
const MODE = process.env.MODE;
var routes = '';

if(MODE === 'development') {
    routes = require('./app/routes/routesdev');
} else {
    routes = require('./app/routes/routes');
}

const app = express();

app.use(paginate.middleware(10, 50));

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/', routes);

app.listen(PORT);
