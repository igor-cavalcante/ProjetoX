const routes = require('express').Router();
const TaskController = require('../controller/TaskController');

//rota base do projeto 
routes.get("/app/task", TaskController.getALL);

module.exports = routes;