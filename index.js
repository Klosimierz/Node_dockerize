//External modules
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

//Routing
const credential_routes = require('./routes/credentials');
const swapi_routes = require('./routes/swapi');

//Config
const port = config.get('port');
const conString = config.get('db_connection_string');

//Custom middleware
const restrictRouting = require('./middleware/isAuth');
const asyncAutoCatch = require('./middleware/asyncAutoCatch');
/*
mongoose.connect('mongodb://mongo:27017/nodebase')
    .then(()=>{console.log('Connection established')})
    .catch((err)=>{console.log(`Connection failed: ${err}`)});
*/
mongoose.connect('mongodb://localhost:27017/newDb')
    .then(()=>{console.log('Connection established')})
    .catch((err)=>{console.log(`Connection failed: ${err}`)});

const app = express();

app.use(express.json());
app.use('/users',credential_routes);
//FROM THIS POINT, EVERYTHING REQUIRES AUTHORIZATION
app.use(restrictRouting);
app.use('/swapi',swapi_routes);

app.listen(port, () => { console.log(`listening on port ${port}`)});
