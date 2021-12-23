const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const credential_routes = require('./routes/credentials');
const swapi_routes = require('./routes/swapi');
const special_routes = require('./routes/special');

const port = config.get('port');
const conString = config.get('db_connection_string');

const restrictRouting = require('./middleware/isAuth');
const asyncAutoCatch = require('./middleware/asyncAutoCatch');
/*
mongoose.connect('mongodb://mongo:27017/nodebase')
    .then(()=>{console.log('Connection established')})
    .catch((err)=>{console.log(`Connection failed: ${err}`)});
*/
///*
mongoose.connect('mongodb://localhost:27017/newDb')
    .then(()=>{console.log('Connection established')})
    .catch((err)=>{console.log(`Connection failed: ${err}`)});
//*/
const app = express();
app.use(express.json());
app.use('/users',credential_routes);
app.use(restrictRouting);
app.use('/swapi',swapi_routes);
app.use('/special',special_routes);

app.listen(port, () => { console.log(`listening on port ${port}`)});
