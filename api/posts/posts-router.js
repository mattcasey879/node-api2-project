// implement your posts router here
const express = require("express");
const posts = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
  posts
    .find()
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  posts
    .findById(id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: "The post information could not be recieved" })
    );
  router.post("/", (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      posts
        .insert(post)
        .then((newPost) => res.status(201).json(newPost))
        .catch(() =>
          res.status(500).json({
            message: "There was an error while saving the post to the database",
          })
        );
    }
  });
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.title || !changes.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    }
    posts
      .update(id, changes)
      .then((post) => {
        post
          ? res.status(200).json(post)
          : res.status(404).json({
              message: "The post with the specified ID does not exist",
            });
      })
      .catch(() =>
        res
          .status(500)
          .json({ message: "The post information could not be modified" })
      );
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    posts
      .remove(id)
      .then((post) => {
        post
          ? res.status(200).json(post)
          : res.status(404).json({
              message: "The post with the specified ID does not exist",
            });
      })
      .catch(() =>
        res.status(500).json({ message: "The post could not be removed" })
      );
  });

  router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    posts
      .findPostComments(id)
      .then((post) => {
        post
          ? res.status(200).json(post)
          : res.status(404).json({
              message: "The post with the specified ID does not exist",
            });
      })
      .catch(() =>
        res
          .status(500)
          .json({ message: "The comments information could not be retrieved" })
      );
  });
});

module.exports = router;
