const mongoose = require("mongoose");
const Todo = mongoose.model("Todo");

module.exports.getUserTodos = (req, res) => {
    Todo.find({ userId: req.currentUser.id }).exec((err, todos) => {
        if (err) {
            res.json({ success: false, message: "Error getting data from database, try again shortly..." });
        } else {
            res.json({ success: true, todos });
        }
    });
};

module.exports.addNewTodo = (req, res) => {
    const newTodo = new Todo({
        userId: req.currentUser.id,
        name: req.body.name
    });

    newTodo.save((err, savedTodo) => {
        if (err) {
            res.json({ success: false, message: "Error saving todo to the database, please try again shortly..." });
        } else {
            res.json({ success: true, todo: savedTodo });
        }
    });
};
