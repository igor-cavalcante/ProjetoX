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
    failureRedirect: "/Login",
    failureFlash: true,
  })(req, res, next);
};




module.exports = {
  isAuthenticated,
  showLoginForm,
  loginUser,
};
