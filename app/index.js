const express = require("express"); //importando o modulo express para criar o servidor local
const path = require("path"); //importando modulo path do node
const routes = require("./routes/routes"); //importando as rotas
const ConnectToDataBase = require("./database/config"); //importando base de dados
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const RedisStore = require("connect-redis")(session); // Importe o Connect-Redis

require("./controller/Auth")(passport);

//inicializando conexão com banco de dados
const dotenv = require("dotenv"); //importando arquivo de configuração
dotenv.config(); //aquivo de configuração de usuario e senha do BD
ConnectToDataBase(); //se conectando a base de dados.

const app = express();
const port = 8080;

app.set("view engine", "ejs"); //setando a engine ejs

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // setando os arquivos estaticos


// Sessão com Redis como armazenamento
const redisClient = require("redis").createClient({
  // Configure conforme as informações do seu servidor Redis
  host: "localhost",
  port: 6379, // Porta do servidor Redis
  // password: "sua_senha_do_redis", // Se necessário
});
//sessão
app.use(
  session({
    store: new RedisStore({ client: redisClient }), // Use RedisStore
    secret: "AKDANFUWMDAHjadsah155812ad", // Use a mesma secret key do .env
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () =>
  console.log(`Rodando server express http://localhost:${port}/app/task`)
);
