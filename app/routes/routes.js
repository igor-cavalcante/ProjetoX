const routes = require('express').Router();
const TaskController = require('../controller/TaskController');


routes.get("/app/task", TaskController.getALLTask);//rota base do projeto para mostrar todas as Task's
// routes.get("/app/task/create/:method", TaskController.showCreateForm); // Rota para exibir o formulário de criação
routes.post("/app/task/create", TaskController.createTask); // Rota para ativar o end poitn de criar task
routes.get("/app/getByID/:id/:method", TaskController.getTaskById); // obs : sempre que um parametro é mandado pela rota ele vem em formato de string
routes.post("/app/updateTask/:id", TaskController.updateOneTask); // Rota para atualizar task
routes.get("/app/deleteTask/:id", TaskController.deleteOneTask); //rota para reletar a task

module.exports = routes;