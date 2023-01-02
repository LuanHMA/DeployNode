import Express, { urlencoded, json } from "express";
import { engine } from "express-handlebars";
import { adminRouter } from "./routes/admin.js";
import { homeRouter } from "./routes/home.js";
import path, { dirname } from 'path';
import session from "express-session";
import flash from "connect-flash";
import "./database/db.js";
import { userRouter } from "./routes/user.js";

//Global Variables
    const app = Express();
    const port = process.env.PORT || 3000;

//Configs
    //Session
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true,
    }));
    app.use(flash());

    //Midleware
    app.use((req,res,next)=>{
        res.locals.successMsg = req.flash("Success message");
        res.locals.errorMsg = req.flash("Error message");
        next();
    })

    //Body Parser
    app.use(urlencoded({extended: true}));
    app.use(json());

    //Handlebars
    app.engine("handlebars", engine({defaultLayout: "main"}));
    app.set("view engine", "handlebars");

    //Public
    app.use(Express.static(path.join(dirname+ "public")));

//Routes
    app.use("/", homeRouter);
    app.use("/admin", adminRouter);
    app.use("/usuarios", userRouter)

//Server Init
    app.listen(port, ()=> console.log("Server is running on port "+ port));