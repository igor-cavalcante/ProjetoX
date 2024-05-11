const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const app = express();
const port = 8080;

app.set("view engine", "ejs"); //setando a engine ejs
app.use(express.static(path.join(__dirname, "public"))); // setando os arquivos estaticos
app.use(routes);


//rota home
// app.get("/app/task", (req, res) => {
//   res.render("index");
// });

app.listen(port, () => console.log(`Rodando server express na port : ${port}`));
