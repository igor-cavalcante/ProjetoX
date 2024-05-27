const { render } = require("ejs");
const User = require("../models/user");
const Imc = require("../models/imc");


const perfil = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Acesso negado");
    }
  
    const id = req.user.id;
  
    const user = await User.findById(id, '-password');
  
    if (!user) {
        return res.status(404).send("Usuário não encontrado!");
    }

    // Buscar o IMC mais recente do usuário
    const recentImc = await Imc.findOne({ userId: id }).sort({ date: -1 });

    try {
       // Extrair as iniciais do nome do usuário
       const nomeCompleto = user.name; // Supondo que você tenha um campo `nome` no seu modelo de usuário
       const iniciais = nomeCompleto.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        return res.render('perfil', { 
            user,
            iniciais,
            imc: recentImc ? recentImc.IMC : 0.00,
            description: recentImc ? recentImc.description : null
         });
    } catch (error) {
        res.status(500).send(error.message);
    }
  };

  module.exports = {
    perfil,
  }