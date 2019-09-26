const express = require('express');
const router = express.Router();
const { main, addPage, editPage, wikiPage } = require("../views");
const { Page } = require('../models');

router.get("/", async (req, res) => {
  const allPages = await Page.findAll();
  res.send(main(allPages));
})

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const pageInstance = await page.save();
    res.redirect(pageInstance.slug);
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
  res.send(wikiPage(pageInst))
} catch (error) { next(error)}
})


module.exports = router;
