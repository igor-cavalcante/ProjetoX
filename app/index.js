const express = require("express"); //importando o modulo express para criar o servidor local
const path = require("path"); //importando modulo path do node
const routes = require("./routes/routes"); //importando as rotas gerais
const routes_exercicios = require("./routes/routes_exercicios");
const ConnectToDataBase = require("./database/config"); //importando base de dados
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const MongoStore = require('connect-mongo'); // importar connect-mongo

require("./controller/Auth")(passport);


const cron = require('node-cron');
const push = require('./controller/push'); //importando controler de push notifications
const routes_push = require('./routes/routes_push');

//inicializando conexão com banco de dados
const dotenv = require("dotenv"); //importando arquivo de configuração
dotenv.config(); //aquivo de configuração de usuario e senha do BD
ConnectToDataBase(); //se conectando a base de dados.

const app = express();
const port = 8080;

app.set("view engine", "ejs"); //setando a engine ejs

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // setando os arquivos estaticos

//sessão
//sessão
app.use(session({
  secret:'seu-segredo',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://user:I09HMPwbPVNAZOwd@projetox.a2ui9up.mongodb.net/?retryWrites=true&w=majority`, // URL do seu MongoDB Atlas
    ttl: 10 * 60, // 5 minutos em segundos
    autoRemove: 'native' // remove sessões automaticamente
  })
}));

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
app.use(express.json()); // Para analisar corpos JSON

app.use(routes);
app.use(routes_exercicios);
app.use(routes_push);

// Agendamento de tarefas
cron.schedule('* * * * *', push.checkAndSendNotifications);

app.listen(port, () =>
  console.log(`Rodando server express http://localhost:${port}`)
);
