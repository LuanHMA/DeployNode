import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categorias",
        required:true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    content:{
        type: String,
        required: true
    }

});

export const PostsModel = model("Postagens", PostSchema);