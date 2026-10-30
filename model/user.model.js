const database = require ('./../config/database.js');
const {DataTypes} = require ('sequelize');

const User = database.define('User',{
    username:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "user",
});

module.exports = User;