const express = require("express");
const morgan = require("morgan");
const main = require("./views/main");
// const routes = require('./routes/posts');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
// app.use('/posts', routes);

app.get("/", (req, res) => {
  res.send(main(''));
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
