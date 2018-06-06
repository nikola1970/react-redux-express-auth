const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

module.exports.register = function(req, res) {
    const newUser = new User(req.body);

    newUser.save(function(err, user) {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            res.status(201).json({ success: true, message: `User ${user.username} created successfully!` });
        }
    });
};

module.exports.login = function(req, res) {
    User.findOne({ username: req.body.username }).exec(function(err, user) {
        if (err) {
            res.json({ success: false, error: "Something is wrong with the server, try again shortly..." });
        } else if (!user) {
            res.json({ success: false, error: "User not found!" });
        } else {
            user.comparePasswords(req.body.password, function(err, isMatch) {
                if (err) {
                    res.json({ success: false, error: "Wrong password" });
                } else if (isMatch) {
                    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: 5 });
                    res.json({ success: true, token, username: user.username });
                } else {
                    res.json({ success: false, error: "Wrong password!" });
                }
            });
        }
    });
};
