const routes = require('express').Router();
const TaskController = require('../controller/TaskController');

routes.get("/app/task", TaskController.getALL);

module.exports = routes;