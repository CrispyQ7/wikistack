const express = require("express");
const morgan = require("morgan");
const main = require("./views/main");
const { db } = require('./models');
// const routes = require('./routes/posts');

const app = express();

app.use(express.urlencoded({ extended: false }));

db.authenticate().
then(() => {
  console.log('connected to the database');
})



app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
// app.use('/posts', routes);

app.get("/", (req, res) => {
  res.send(main(''));
})

const PORT = 3000;

const init = async () => {
  await db.sync({force: true})
  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
}

init();