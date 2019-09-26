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
    const pageInstance = await page.save();
    //console.log(pageInstance);
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get("/add", (req, res) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try {
  const pageInst = await Page.findOne({
    where: {slug: req.params.slug}
  })
  res.json(pageInst)
} catch (error) { next(error)}
})


module.exports = router;
