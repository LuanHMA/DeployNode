import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/blogapp")
    .then(()=> console.log("-- Database connected --"))
    .catch((error)=> console.log("Error to connect: "+error))

