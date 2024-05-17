const express = require("express"); //importando o modulo express para criar o servidor local
const path = require("path"); //importando modulo path do node
const routes = require("./routes/routes"); //importando as rotas
const ConnectToDataBase = require("./database/config"); //importando base de dados

//inicializando conexão com banco de dados
const dotenv = require("dotenv"); //importando arquivo de configuração
dotenv.config(); //aquivo de configuração de usuario e senha do BD
ConnectToDataBase(); //se conectando a base de dados.

const app = express();
const port = 8080;

app.set("view engine", "ejs"); //setando a engine ejs
app.use(express.static(path.join(__dirname, "public"))); // setando os arquivos estaticos
app.use(express.urlencoded({ extended: true })); 
app.use(routes);

app.listen(port, () =>
  console.log(`Rodando server express http://localhost:${port}/app/task`)
);
