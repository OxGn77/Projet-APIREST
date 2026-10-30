const database = require('./../config/database.js');
const { DataTypes } = require('sequelize');

const Com = database.define('Com', {
    content: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
}, {
    tableName: "com"
});

module.exports = Com;