import { Post } from "../models/post.model.js";
import Joi from "joi";

// Joi Schema
const postSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    age: Joi.number().integer().min(16).max(6000).required()
});

// Create Post

const createPost = async (req, res) => {

    try {

        const { error, value } = postSchema.validate(req.body);

        if (error) {

            return res.status(400).json({ message: error.details[0].message });

        }

        const { name, description, age } = value;

        const post = await Post.create({ name, description, age });

        return res.status(201).json({ message: "Post created successfully", data: post });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

}


// Find All Posts


const getPost = async (req, res) => {

    try {

        const posts = await Post.find();

        return res.status(200).json({ message: "Posts fetched successfully", count: posts.length, data: posts });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

// Find One Post


const getOnePost = async (req, res) => {

    try {

        const { name } = req.body;

        if (!name) return res.status(400).json({ message: "Name is required" });

        const post = await Post.findOne({ name });

        if (!post) return res.status(404).json({ message: "post not found" });

        return res.status(200).json({ message: "post found successfully", data: post });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

// Update a Post 

const updatePost = async (req, res) => {

    try {

        const { error, value } = postSchema.validate(req.body);

        if (error) return res.status(400).json({ message: error.details[0].message })

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });

        if (!post) return res.status(404).json({ message: "post not found" });

        return res.status(200).json({ message: "post updated successfully", data: post });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

// Delete a post

const deletePost = async (req, res) => {
    try {

        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) return res.status(404).json({ message: "Post not found" });

        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

export { createPost, getPost, getOnePost, updatePost, deletePost };