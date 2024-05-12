const { render } = require("ejs");
const Task = require("../models/task");

//end point Get de todas as listas
const getALLTask = async (req, res) => {
  try {
    const TaskList = await Task.find();
    return res.render("index", { TaskList, task: null }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//end point de getTask por id;
const getTaskById = async (req, res) => {
   try {
    const task = await Task.findOne({ _id: req.params.id }); //capturando um id pelo parametro que defino da rota.
    const TaskList = await Task.find();
    res.render("index",{ task, TaskList }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
   } catch (error) {
    res.status(500).send(error.message);
   }
};

//end point para atualização de uma Task
const updateOneTask = async (req, res) => {
    try {
        const task = req.body;
        await Task.updateOne({ _id : req.params.id}, task);
        res.redirect("/app/task");
    } catch (error) {
        res.status(500).send({error : error.message});
    }
};

// end point para exibir o formulário de criação de tarefa
const showCreateForm = (req, res) => {
  res.render("CreateTask");
};

//end point para criação de uma task
const createTask = async (req, res) => {
  const task = req.body;
  if (!task.task) {
    return res.redirect("/app/task");
  }
  try {
    await Task.create(task);
    return res.redirect("/app/task");
  } catch (error) {
    return res.status(500).send(error.mensage);
  }
};

module.exports = {
  getALLTask,
  createTask,
  showCreateForm,
  getTaskById,
  updateOneTask,
 };
