const database = require('./../config/database.js');
const { DataTypes } = require('sequelize');

const Post = database.define('Post', {
    content: {
        type: DataTypes.STRING(2000),
        allowNull: false,
    },
}, {
    tableName: "post",
});

module.exports = Post;