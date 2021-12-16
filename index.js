//External modules
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

//Routing
const credential_routes = require('./routes/credentials');
const swapi_routes = require('./routes/swapi');

const port = config.get('port');
const conString = config.get('db_connection_string');

mongoose.connect(conString)
    .then(()=>{console.log('Connection established')})
    .catch((err)=>{console.log(`Connection failed: ${err}`)});

const app = express();

app.use(express.json());
app.use('/users',credential_routes);
app.use('/swapi',swapi_routes);

app.listen(port, () => { console.log(`listening on port ${port}`)});
