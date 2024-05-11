const mongoose = require("mongoose");

const ConnectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_NAME}:I09HMPwbPVNAZOwd@projetox.a2ui9up.mongodb.net/?retryWrites=true&w=majority`);
    console.log("Conexão com o banco ocorreu com sucesso!");
  } catch (error) {
    console.error(
      "Ocorreu um erro ao se conectar com o banco de dados:",
      error.message
    );
  }
};

module.exports = ConnectToDataBase;
