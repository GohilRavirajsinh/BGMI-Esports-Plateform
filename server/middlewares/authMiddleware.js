const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('BGMI')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({
        message: "Not Authorized, no token"
    });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Token failed"
        });
    }
}

exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            message: "Admin Access Denied"
        });
    }
};