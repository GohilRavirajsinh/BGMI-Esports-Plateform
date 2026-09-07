const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, bgmiId, email, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        User.create({ name, bgmiId, email, password: hashPassword });
        res.status(201).json({
            message: 'User registered'
        });
    } catch (error) {
        res.status(500).json({
            messgae: (`CreateError: ${error.message}`)
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1d' }) // Create Token
        res.status(200).json({
            token, user: {
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message: `Login Error: ${error.message}`
        });
    }
};