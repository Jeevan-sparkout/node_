import { Router } from "express";
import { createPost, getPost, getOnePost, updatePost, deletePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.route('/read').get(getPost);

// JWS validation used inside routes
router.route('/create').post(verifyJWT, createPost);
router.route('/update/:id').patch(verifyJWT, updatePost);
router.route('/delete/:id').delete(verifyJWT, deletePost);

export default router;