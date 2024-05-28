const { render } = require("ejs");
const Task = require("../models/task");

//end point Get de todas as listas
const getALLTask = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;

  try {
    const TaskList = await Task.find({ userId });
    return res.render("index", {
      TaskList,
      taskUpdate: null,
      taskDelete: null,
      taskCreate: null,
    }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const searchTask = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;
  const searchQuery = req.query.search || "";
  const categoria = req.query.categoria;

  try {
    let TaskList;
    if (categoria) {
      TaskList = await Task.find({ userId, categoria });
    } else if (searchQuery) {
      TaskList = await Task.find({
        userId,
        task: { $regex: searchQuery, $options: "i" },
      });
    } else {
      res.redirect("/app/task");
    }

    return res.render("index", {
      TaskList,
      taskUpdate: null,
      taskDelete: null,
      taskCreate: null,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const showCreateForm = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }
  const userId = req.user._id;
  try {
    const method = req.params.method;
    const TaskList = await Task.find({ userId });
    if (method === "create") {
      res.render("index", {
        taskUpdate: null,
        TaskList,
        taskDelete: null,
        taskCreate: undefined, //so para declarar a variavel e mostrar o form
      }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//end point para capturar o id de uma task e qual seu metodo(update ou delete);
const getTaskById = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }
  const userId = req.user._id;

  try {
    const method = req.params.method; //pegando o metodo que passei na routes da requisição
    const TaskList = await Task.find({ userId });

    if (method === "update") {
      const taskUpdate = await Task.findOne({ _id: req.params.id }); //capturando um id pelo parametro que defino da rota.
      res.render("index", {
        taskUpdate,
        TaskList,
        taskDelete: null,
        taskCreate: null,
      }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", {
        taskUpdate: null,
        TaskList,
        taskDelete,
        taskCreate: null,
      }); //enviando as variaveis em forma de objedo pra meu ./view/index(podendo assim manipular elas)
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//end point para criação de uma task
const createTask = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const id = req.user.id;

  const { task, categoria, DateTask, horas, checkbox, notes } = req.body;
  if (!task || !categoria || !DateTask) {
    return res.redirect("/app/task");
  }

  // // Combine a data e a hora em um único objeto Date
  // let taskDate = new Date(DateTask);
  // if (horas) {
  //   const [hours, minutes] = horas.split(":");
  //   taskDate.setUTCHours(hours);
  //   taskDate.setUTCMinutes(minutes);
  // } else {
  //   taskDate.setUTCHours(0);
  //   taskDate.setUTCMinutes(0);
  // }

  // Parse apenas a data, sem hora
  const taskDate = new Date(DateTask);
  taskDate.setUTCHours(0, 0, 0, 0); // Setar horas, minutos, segundos e milissegundos para zero

  const taskData = {
    task,
    categoria,
    date: taskDate,
    time: horas,
    notifications: checkbox ? true : false,
    notes,
    check: false, // Inicialmente, a tarefa não está marcada como concluída
    userId: id,
  };

  try {
    await Task.create(taskData);
    return res.redirect("/app/task");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// End point para atualização de uma Task
const updateOneTask = async (req, res) => {
  try {
    const { task, categoria, DateTask, horas, checkbox, notes } = req.body;

    // Parse apenas a data, sem hora
  const taskDate = new Date(DateTask);
  taskDate.setUTCHours(0, 0, 0, 0); // Setar horas, minutos, segundos e milissegundos para zero

    const taskData = {
      task,
      categoria,
      date: taskDate,
      time: horas,
      notifications: checkbox ? true : false,
      notes,
      check: false, // Pode ser ajustado conforme necessário
    };

    // Atualize a tarefa no banco de dados
    await Task.updateOne({ _id: req.params.id }, taskData);
    res.redirect("/app/task");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//end point para deleção de uma task
const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.redirect("/app/task");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const taskCheck = async (req,res) => {

  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  try {
    const task = await Task.findOne({ _id: req.params.id }); //capturando um id pelo parametro que defino da rota.

    if (task.check) {
      task.check = false;
    } else {
      task.check = true;
    }

    await Task.updateOne({_id: req.params.id}, task);
    res.redirect("/app/task");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const showCalculadora = async (req, res) => {
  try {
    return res.render("Calculadora",{
      bmi: null,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  showCalculadora,
  getALLTask,
  createTask,
  showCreateForm,
  getTaskById,
  updateOneTask,
  deleteOneTask,
  searchTask,
  taskCheck
};
