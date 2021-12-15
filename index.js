//External modules
const express = require('express');
const config = require('config');

//Routing
const credential_routes = require('./routes/credentials');

const app = express();

app.use('/users',credential_routes);

app.listen(3000, () => { console.log("listening on port 3000")});
