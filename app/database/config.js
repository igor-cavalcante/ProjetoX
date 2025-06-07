const mongoose = require("mongoose");

const ConnectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:u5sQ05AHU6jCSo2U@cluster0.r8d4sfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conexão com o banco ocorreu com sucesso!");
  } catch (error) {
    console.error(
      "Ocorreu um erro ao se conectar com o banco de dados:",
      error.message
    );
  }
};

module.exports = ConnectToDataBase;
