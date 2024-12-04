import express from "express";

import {
  getPosts,
  getPostsBySearch,
  getPostsByCreator,
  getPost,
  createPost,
  updatePost,
  likePost,
  commentPost,
  deletePost,
  getMostLikedPosts,
} from "../controllers/posts.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/mostLikedPosts", getMostLikedPosts);
router.get("/creator", getPostsByCreator);
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/getAllPosts", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", commentPost);

export default router;
