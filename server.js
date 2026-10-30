require('dotenv').config();

const app = require('./app.js');
const { associate } = require('./config/association.js');

const port = process.env.PORT 

async function start() {
    await associate();
    app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    });
}

start();