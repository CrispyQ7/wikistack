const express = require("express");
const morgan = require("morgan");
// const main = require("./views/main");
// const userRouter = require("./routes/user");
const wikiRouter = require("./routes/wiki");
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
app.use('/wiki', wikiRouter);
// app.use('/user', userRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki")
})

const PORT = 3000;

const init = async () => {
  await db.sync({force: true})
  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
}

init();
