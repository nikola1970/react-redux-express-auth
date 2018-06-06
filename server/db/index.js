const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_NAME);

mongoose.connection.on("connected", function() {
    console.log("Connected to the database");
});

mongoose.connection.on("error", function(err) {
    console.log("Connection error: " + err);
});

mongoose.connection.on("disconnected", function() {
    console.log("Disconnected from the databse");
});

require("./models/users.model");
require("./models/todos.model");
