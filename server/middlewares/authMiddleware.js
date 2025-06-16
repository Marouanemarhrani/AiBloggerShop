const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Protected Routes token base
const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Authorization token missing or malformed",
            });
        }

        const token = authHeader.split(" ")[1]; // Get only the token part
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log("JWT error:", error);
        res.status(401).send({
            success: false,
            message: "Invalid or expired token",
            error: error.message,
        });
    }
};

// Admin access
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "You can't access to this page!",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};
module.exports = {
    requireSignIn,
    isAdmin
};