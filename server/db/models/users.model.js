const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }
});

UserSchema.methods.comparePasswords = function comparePasswords(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre("save", function(next) {
    let user = this;
    if (!user.isModified("password")) return next();

    return bcrypt.genSalt(process.env.SALT_FACTOR, function(err, salt) {
        if (err) return next(err);
        return bcrypt.hash(user.password, salt, null, function(hashError, hash) {
            if (hashError) return next(hashError);
            user.password = hash;
            return next();
        });
    });
});

UserSchema.plugin(uniqueValidator);

mongoose.model("User", UserSchema);
