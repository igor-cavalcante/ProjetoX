const { render } = require("ejs");
const User = require("../models/user");
const Imc = require("../models/imc");
const Task = require("../models/task");
const moment = require("moment-timezone");



const perfil = async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log("Acesso negado: usuário não autenticado");
    return res.status(401).send("Acesso negado");
  }

  const id = req.user.id;
  // console.log("ID do usuário:", id);

  try {
    const user = await User.findById(id, "-password");
    if (!user) {
      // console.log("Usuário não encontrado:", id);
      return res.status(404).send("Usuário não encontrado!");
    }

    // Buscar o IMC mais recente do usuário
    const recentImc = await Imc.findOne({ userId: id }).sort({ date: -1 });
    // console.log("IMC recente:", recentImc);

    // Parse apenas a data, sem hora
    const taskDate = new Date();
    taskDate.setUTCHours(0, 0, 0, 0); // Setar horas, minutos, segundos e milissegundos para zero
    // console.log("Data atual:", taskDate);

    // Definir o fuso horário desejado
    const timezone = "America/Sao_Paulo"; // Altere para o fuso horário apropriado

    // Obter a data atual no fuso horário definido
    const today = moment().tz(timezone).startOf('day');
    const dayOfWeek = today.day(); // 0 = Domingo, 1 = Segunda-feira, ..., 6 = Sábado
    console.log("Data atual:", today.format());

    // Inicializar o array com valores padrão
    const completedTasksByDay = Array(7).fill({
      completed: 0,
      total: 0,
      percentage: "0.00",
    });

    // Buscar tarefas por dia da semana
    for (let i = 0; i <= dayOfWeek; i++) {
      const startOfDay = today.clone().subtract(dayOfWeek - i, 'days').startOf('day');
      const endOfDay = startOfDay.clone().endOf('day');

      const tasks = await Task.find({
        userId: id,
        date: {
          $gte: startOfDay.toDate(),
          $lt: endOfDay.toDate(),
        },
      });

      // Contar o número de tarefas concluídas e totais
      const completedTasksCount = tasks.filter((task) => task.check).length;
      const totalTasksCount = tasks.length;

      // Calcular a porcentagem de tarefas concluídas em relação ao total de tarefas
      const percentageCompleted =
        totalTasksCount !== 0
          ? (completedTasksCount / totalTasksCount) * 100
          : 0;

      // Atualizar o array com os valores calculados
      completedTasksByDay[i] = {
        completed: completedTasksCount,
        total: totalTasksCount,
        percentage: percentageCompleted.toFixed(2), // Limitar a 2 casas decimais
      };
    }

    // Buscar todas as tarefas do usuário com data igual à data atual
    const allTasks = await Task.find({
      userId: id,
      date: taskDate,
    });
    // console.log("Todas as tarefas do usuário na data atual:", allTasks);

    // Buscar tarefas concluídas da data atual em UTC
    const completedTasks = await Task.countDocuments({
      userId: id,
      check: true,
      date: taskDate,
    });
    // console.log(
    //   "Quantidade de tarefas concluídas na data atual em UTC:",
    //   completedTasks
    // );

    // Calcular o progresso diário
    const objetivoDiario = allTasks.length; // Objetivo diário é o total de tarefas para o dia

    // Extrair as iniciais do nome do usuário
    const nomeCompleto = user.name; // Supondo que você tenha um campo `name` no seu modelo de usuário
    const iniciais = nomeCompleto
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
    // console.log("Iniciais do nome:", iniciais);

    return res.render("perfil", {
      user,
      iniciais,
      imc: recentImc ? recentImc.IMC : 0.0,
      description: recentImc ? recentImc.description : null,
      completedTasks, // Adicione completedTasks ao objeto renderizado
      objetivoDiario,
      completedTasksByDay,
    });
  } catch (error) {
    console.log("Erro ao renderizar o perfil:", error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  perfil,
};
