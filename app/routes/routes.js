const routes = require("express").Router();
const TaskController = require("../controller/TaskController");
const LoginController = require("../controller/LoginController");
const RegisterController = require("../controller/RegisterController");
const passport = require("passport");

//rotas da task
routes.get("/app/task", TaskController.getALLTask); //rota base do projeto para mostrar todas as Task's
routes.get("/app/task/:method", TaskController.showCreateForm); // Rota para exibir o formulário de criação
routes.post("/app/task/create", TaskController.createTask); // Rota para ativar o end poitn de criar task
routes.get("/app/getByID/:id/:method", TaskController.getTaskById); // obs : sempre que um parametro é mandado pela rota ele vem em formato de string
routes.post("/app/updateTask/:id", TaskController.updateOneTask); // Rota para atualizar task
routes.get("/app/deleteTask/:id", TaskController.deleteOneTask); //rota para reletar a task

//rotas da calculadora
routes.get("/app/calculadora", TaskController.showCalculadora);

//rotas do login e register
routes.get("/login", LoginController.showLoginForm);
routes.post('/login/user', LoginController.loginUser);// Login de usuário
routes.get("/perfil", LoginController.perfil);
routes.get("/logout", LoginController.logoutUser);
routes.post("/register", RegisterController.registerUser);

module.exports = routes;
