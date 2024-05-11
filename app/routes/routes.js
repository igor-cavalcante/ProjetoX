const routes = require('express').Router();
const TaskController = require('../controller/TaskController');

//rota base do projeto 
routes.get("/app/task", TaskController.getALLTask);
routes.get("/app/task/create", TaskController.showCreateForm); // Rota para exibir o formulário de criação


routes.post("/app/task/create", TaskController.createTask);

module.exports = routes;