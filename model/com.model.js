const database = require('./../config/database.js');
const { DataTypes } = require('sequelize');

const Comment = database.define('Comment', {
    content: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: "comment"
});

module.exports = Comment;