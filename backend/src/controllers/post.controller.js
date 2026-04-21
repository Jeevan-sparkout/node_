import { Post } from "../models/post.model.js";

// Create Post

const createPost = async (req, res) => {

    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {

            return res.status(400).json({ message: "All fields required" });
        }

        const post = await Post.create({ name, description, age });

        res.status(201).json({ message: " Post created successfully" });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

}


// Find All Posts


const getPost = async (req, res) => {

    try {

        const posts = await Post.find()

        res.status(200).json({ message: "Post fetched Successfully", data: posts });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

    // Find One POst


    const getOnePost = async(req , res) =>{

        try {
            const {name} = req.body;

            if(!name) res.status(400).json({message:"Nmae is required"});

            const post = await Post.findOne({name});

            if(!post) res.status(400).json({message:"post not found"});

            res.status(200).json({message:"post foun successfully" , data:post});


        } catch (error) {
            
            return res.status(500).json({message:error.message});
        }
    }


    // Update a Post 

const updatePost = async(req , res) =>{

    try {

        const post = await Post.findByIdAndUpdate(req.params.id , req.body, {new:true});

        if(!post) res.status(400).json({message:"post not found"});

        res.status(200).json({message:"post updated successfully" , data:post});
        
    } catch (error) {
        
        return res.status(500).json({message:error.message});
    }
}

    // Delete a post

const deletePost = async (req,res) => {

    try {
        
        const _delete = await Post.findByIdAndDelete(req.params.id);

        if(!_delete) res.status(400).json({message:"Post not found"});

        res.status(200).json({message:"Post deleted successfully"})

        
    } catch (error) {

        return res.status(500).json({message:error.message});
        
    }
}

export { createPost, getPost , getOnePost , updatePost , deletePost};