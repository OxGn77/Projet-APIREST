const database = require('./../config/database.js');
const {associate} = require ('./../config/association.js')
const User = require ('./../model/user.model.js');
const Pub = require('./../model/pub.model.js');
const Com = require ('./../model/com.model.js');

async function sync() {
    await associate();
    await database.sync();
}

sync();