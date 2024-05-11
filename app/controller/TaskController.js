const Task = require("../models/task");


//Get de todas as listas
const getALLTask = async (req, res) => {
try {
    const TaskList = await Task.find();
    return res.render("index", {TaskList});
} catch (error) {
 res.status(500).send(error.message);   
}
};

// Rota para exibir o formulário de criação de tarefa
const showCreateForm = (req, res) => {
    res.render("CreateTask");
};

const createTask = async (req,res)=> {
    const task = req.body;
    if(!task.task){
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

};
