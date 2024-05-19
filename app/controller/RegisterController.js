const { render } = require("ejs");
const User = require("../models/user");

//end point para ir para o form de login
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userData = {
    name,
    email,
    password,
  };
  try {
    await User.create(userData);
    return res.render("Login");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  registerUser,
};
