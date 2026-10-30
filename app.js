const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/auth', require('./route/auth.route.js'));
//app.use('/api/posts', require('./route/post.route.js'));

module.exports = app;