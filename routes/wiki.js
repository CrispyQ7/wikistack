const express = require('express');
const router = express.Router();
const { main, addPage, editPage } = require("../views");
const { db } = require('../models');

router.get("/", (req, res) => {
  res.send(main());
})

router.post("/", (req, res) => {
  res.send("");
})

router.get("/add", (req, res) => {
  res.send(addPage());
})

module.exports = router;
