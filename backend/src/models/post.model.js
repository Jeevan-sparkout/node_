import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    age:{
        type:Number,
        required:true,
        min:16,
        max:200
    }
    },

    {
        timestamps:true
    }
)

export const Post = mongoose.model("Post",postSchema);

