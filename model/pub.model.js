const database = require('./../config/database.js');
const { DataTypes } = require('sequelize');

const Pub = database.define('Pub', {
    content: {
        type: DataTypes.STRING(2000),
        allowNull: false,
    },
}, {
    tableName: "pub",
});

module.exports = Pub;