import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type:String,
        required: true
    },
    slug: {
        type: String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})

export const CategorysModel = model("Categorias", categorySchema);