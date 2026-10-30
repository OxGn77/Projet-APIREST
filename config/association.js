const User = require('./../model/user.model.js');
const Com = require('./../model/com.model.js');
const Pub = require('./../model/pub.model.js');


exports.associate = async () => {

    User.hasMany(Pub, {foreignKey: 'userId'});
    Pub.belongsTo(User, {foreignKey: 'userId', as: 'author'});

    User.hasMany(Com, {foreignKey: 'userId'});
    Com.belongsTo(User, {foreignKey: 'userId', as: 'author'});

    Pub.hasMany(Com, {foreignKey: 'postId', as: 'comments'});
    Com.belongsTo(Pub, {foreignKey: 'postId'});
    
};