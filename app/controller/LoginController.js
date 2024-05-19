const { render } = require("ejs");
const User = require("../models/user");



//end point para rota raiz
const get = async (req,res)=>{
    try {
    return res.status(200).json({message: "seja bem vindo"});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//end point para ir para o form de login
const showLoginForm = async (req,res) => {
    try {
        return res.render("Login");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    get,
    showLoginForm
}