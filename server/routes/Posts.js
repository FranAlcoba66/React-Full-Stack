const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching posts",
      details: error.message,
    });
  }
});

// Get post by id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching post",
      details: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
