const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');

exports.login = async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const valid = await argon2.verify(user.password, req.body.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}

exports.register = async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).json({ message: 'Username already used' });
    }
    const hash = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 5,
    });

     const newUser = await User.create({
        username: req.body.username,
        password: hash
    });
    res.status(201).json(newUser);

}

exports.me = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
}

exports.logout = async (req, res) => {
    res.json({ message: 'Logged out' });
}
