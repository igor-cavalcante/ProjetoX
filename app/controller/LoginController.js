const { render } = require("ejs");
const User = require("../models/user");
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("Acesso negado");
};

//end point para ir para o form de login
const showLoginForm = async (req, res) => {
  try {
    return res.render("Login");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const loginUser = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/app/task",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const perfil = async (req, res) => {
  if (!req.isAuthenticated()) {
      return res.status(401).send("Acesso negado");
  }

  const id = req.user.id;

  const user = await User.findById(id, '-password');

  if (!user) {
      return res.status(404).send("Usuário não encontrado!");
  }

  try {
      return res.render('perfil', { user });
  } catch (error) {
      res.status(500).send(error.message);
  }
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
      if (err) return next(err);
      req.flash('success_msg', 'Você saiu do sistema');
      res.redirect('/login');
  });
};

module.exports = {
  isAuthenticated,
  perfil,
  showLoginForm,
  loginUser,
  logoutUser,
};
