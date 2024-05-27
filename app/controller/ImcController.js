const { render } = require("ejs");
const Imc = require("../models/imc");

const createImc = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;

  try {
    const { weight, height } = req.body;
    const bmi = (weight / (height * height)).toFixed(2);

    if (!bmi || !userId) {
      return res.status(400).send({ message: "Dados inválidos" });
    }

    let description = null;
    let classe = null;

    switch (true) {
      case bmi < 16:
        description = "Cuidado! Você está muito abaixo do peso!";
        classe = "takecare";
        break;
      case bmi >= 16 && bmi < 18.5:
        description = "Cuidado! Você está abaixo do peso!";
        classe = "attention";
        break;
      case bmi >= 18.5 && bmi <= 25:
        description = "Você está na faixa de peso ideal!";
        classe = "yourefine";
        break;
      case bmi > 25 && bmi <= 30:
        description = "Você está com sobrepeso!";
        classe = "attention";
        break;
      case bmi > 30 && bmi <= 40:
        description = "Cuidado! Você está obeso!";
        classe = "takecare";
        break;
      case bmi > 40:
        description = "Cuidado! Você está com obesidade mórbida!";
        classe = "takecare";
        break;
      default:
        break;
    }

    // Verifica se já existe um IMC registrado para o usuário na data atual
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingImc = await Imc.findOne({
      userId: userId,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (existingImc) {
      return res.status(400).render("Calculadora", {
        bmi,
        classe,
        description,
        message: "IMC já registrado para hoje",
      });
    } else {
      const imcData = {
        IMC: bmi,
        description: description,
        userId: userId,
        date: new Date(),
      };

      await Imc.create(imcData);

      res.status(201).render("Calculadora", {
        bmi,
        classe,
        description,
        message: "IMC salvo com sucesso",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao salvar IMC", error: error.message });
  }
};



module.exports = {
  createImc,
};
