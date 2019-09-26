const express = require('express');
const router = express.Router();
const { main, addPage, editPage } = require("../views");
const { Page } = require('../models');

const slugify = title => title.replace(/\s+/g, '_').replace(/\W/g, '');

router.get("/", (req, res) => {
  res.send(main());
})

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get("/add", (req, res) => {
  res.send(addPage());
})

module.exports = router;
