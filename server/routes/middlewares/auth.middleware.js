const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(" ")[1];
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Invalid token" });
            } else {
                User.findById(decoded.id, (err, user) => {
                    if (err) {
                        res.status(500).json({ message: "Server error... try again shortly" });
                    } else if (!user) {
                        res.status(404).json({ message: "User not found" });
                    } else {
                        req.currentUser = user;
                        next();
                    }
                });
            }
        });
    } else {
        res.status(403).json({ message: "No token provided" });
    }
};

module.exports = authMiddleware;
