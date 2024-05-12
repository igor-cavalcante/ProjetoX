const routes = require('express').Router();
const TaskController = require('../controller/TaskController');

//rota base do projeto 
routes.get("/app/task", TaskController.getALLTask);// Rota para mostrar todas as Task's
routes.get("/app/task/create", TaskController.showCreateForm); // Rota para exibir o formulário de criação
routes.post("/app/task/create", TaskController.createTask); // Rota para ativar o end poitn de criar task
routes.get("/app/getByID/:id", TaskController.getTaskById); // obs : sempre que um parametro é mandado pela rota ele vem em formato de string
routes.post("/app/updateTask/:id", TaskController.updateOneTask); // Rota para atualizar task

module.exports = routes;