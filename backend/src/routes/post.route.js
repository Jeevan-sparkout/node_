import { Router } from "express";
import {createPost , getPost , getOnePost , updatePost , deletePost} from "../controllers/post.controller.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/read').get(getPost);
router.route('/readOne').get(getOnePost);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);

export default router;