const routes_exercicios = require("express").Router();

//rota para planos
routes_exercicios.get("/planos", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;

  try {
    res.status(200).render("planos");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//rota para ver os exercicios de alongamento
routes_exercicios.get("/alongamento_preview", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;
  try {
    res.status(200).render("alongamento_preview");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//rota para executar alongamento
routes_exercicios.get("/alongamento_action", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;
  try {
    res.status(200).render("alongamento_action");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//rotas para ver exercicios de condicionamento
routes_exercicios.get("/condicionamento_preview", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;
  try {
    res.status(200).render("condicionamento_preview");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//rota para executar condicionamento
routes_exercicios.get("/condicionamento_action", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Acesso negado");
  }

  const userId = req.user._id;
  try {
    res.status(200).render("condicionamento_action");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = routes_exercicios;
