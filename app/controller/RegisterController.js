const { render } = require("ejs");
const bcrypt = require("bcrypt");//modulo para criptografia de senha 
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//end point para ir para o form de login
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exist
  const userExist = await User.findOne({ email: email }); 
  if (userExist) {
    return res.status(422).send({
      message: "User ja cadastrado, use outro email",
    });
  }

  //create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const userData = {
    name,
    email,
    password: passwordHash,
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
