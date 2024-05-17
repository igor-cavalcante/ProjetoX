const { render } = require("ejs");
const Task = require("../models/task");

//end point Get de todas as listas
const getALLTask = async (req, res) => {
  try {
    const TaskList = await Task.find();
    return res.render("index", { TaskList, task: null, taskDelete: null,TaskCreate: null }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
  }catch (error) {
    res.status(500).send(error.message);
  }
};

//end point de getTask por id;
const getTaskById = async (req, res) => {
  try {
    const method = req.params.method; //pegando o metodo que passei na routes da requisição
    const TaskList = await Task.find();
    if (method === "update") {
      const task = await Task.findOne({ _id: req.params.id }); //capturando um id pelo parametro que defino da rota.
      res.render("index", { task, TaskList, taskDelete: null, taskCreate: null }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, TaskList, taskDelete, taskCreate: null }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// // end point para exibir o formulário de criação de tarefa
// const showCreateForm = async (req, res) => {
//   try {
//     const method = req.params.method;
//     const TaskList = await Task.find();
//     if(method === "create"){
//     res.render("index", {task:null, TaskList, taskDelete: null, taskCreate});
//     }else{
//     return res.render("index", { task: null, TaskList, taskDelete: null,taskCreate: null });
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

//end point para atualização de uma Task
const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/app/task");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteOneTask = async(req,res) => {
    try {
      await Task.deleteOne({_id : req.params.id});
      res.redirect("/app/task");
    } catch (error) {
      res.status(500).send({error : error.message});
    }
}  

// //end point para criação de uma task
// const createTask = async (req, res) => {
//   const task = req.body;
//   if (!task.task) {
//     return res.redirect("/app/task");
//   }
//   try {
//     await Task.create(task);
//     return res.redirect("/app/task");
//   } catch (error) {
//     return res.status(500).send(error.mensage);
//   }
// };

const createTask = async (req, res) => {
  const { task, categoria, Date, horas, checkbox, notes } = req.body;

  if (!task || !categoria) {
    return res.redirect("/app/task");
  }

  const taskData = {
    task,
    categoria,
    date: Date,
    time: horas,
    notifications: checkbox ? true : false,
    notes,
    check: false, // Inicialmente, a tarefa não está marcada como concluída
  };

  try {
    await Task.create(taskData);
    return res.redirect("/app/task");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};














module.exports = {
  getALLTask,
  createTask,
  // showCreateForm,
  getTaskById,
  updateOneTask,
  deleteOneTask
};
