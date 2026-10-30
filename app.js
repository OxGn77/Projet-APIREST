const express = require('express');
const app = express();
const exampleRoute = require('./route/exampleRoute.js');

app.use(express.json());

app.use('/api/auth', require('./route/auth.route.js'));
app.use('/api/posts', require('./route/post.route.js'));

module.exports = app;