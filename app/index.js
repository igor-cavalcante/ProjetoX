const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hellou word");
});

const port = 8080;
app.listen(port, () => console.log(`Rodando server express na port : ${port}`));
