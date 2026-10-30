const express = require('express');
const app = express();
const exampleRoute = require('./route/exampleRoute.js');

app.use(express.json());
app.use('/api', exampleRoute);
app.use('/auth', require('./route/auth.route.js'));


module.exports = app;