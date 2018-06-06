const express = require("express");
const router = express.Router();

const todosController = require("./controllers/todos.controller");
const AuthMiddleware = require("./middlewares/auth.middleware");

router.route("/api/todos")
        .get(AuthMiddleware, todosController.getUserTodos)
        .post(AuthMiddleware, todosController.addNewTodo);

module.exports = router;