const routes = require("express").Router();
const TaskController = require("../controller/TaskController");
const LoginController = require("../controller/LoginController");
const RegisterController = require("../controller/RegisterController");
const ImcController = require("../controller/ImcController");
const PerfilController = require("../controller/PerfilController");

//rotas da task
routes.get("/", async (req, res) => {
  try {
    res.status(200).send({
      msg: "seja bem vindo",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
routes.get("/app/task", TaskController.getALLTask); //rota base do projeto para mostrar todas as Task's
routes.get("/app/search", TaskController.searchTask); //rota para procurar uma tarefa
routes.get("/app/task/:method", TaskController.showCreateForm); // Rota para exibir o formulário de criação
routes.post("/app/task/create", TaskController.createTask); // Rota para ativar o end poitn de criar task
routes.get("/app/getByID/:id/:method", TaskController.getTaskById); // obs : sempre que um parametro é mandado pela rota ele vem em formato de string
routes.post("/app/updateTask/:id", TaskController.updateOneTask); // Rota para atualizar task
routes.get("/app/deleteTask/:id", TaskController.deleteOneTask); //rota para reletar a task
routes.get("/check/:id", TaskController.taskCheck);

//rotas da calculadora
routes.get("/app/calculadora", TaskController.showCalculadora);
routes.post("/app/calculadora/imc",ImcController.createImc);

//rotas do login e register
routes.get("/login", LoginController.showLoginForm);
routes.post("/login/user", LoginController.loginUser); // Login de usuário
routes.get("/perfil", PerfilController.perfil);
routes.get("/logout");
routes.post("/register", RegisterController.registerUser);

module.exports = routes;
