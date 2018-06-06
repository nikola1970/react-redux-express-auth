const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
require("./db");

const AuthRoutes = require("./routes/auth.routes");
const TodoRoutes = require("./routes/todos.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(AuthRoutes);
app.use(TodoRoutes);



app.listen(process.env.PORT, function(){
    console.log("Express is running!");
});