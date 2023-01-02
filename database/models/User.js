import { Schema, model } from 'mongoose';

const UserSchemma = new Schema({
    name: { 
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hasAdmin:{
        type: Boolean,
        default: false,
    }
});

export const UserModel = model("Users", UserSchemma);