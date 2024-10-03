require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    const allowedOrigins = [
        'https://cse341-qczx.onrender.com', 
        'http://localhost:3000'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes')); 

process.on('uncaughtException', (err, origin) => {
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err); 
    } else {
        app.listen(port, () => {
            // run command: 'node server.js'
            console.log(`Server is running and listening on http://localhost:${port}`);  
        });
    }
});