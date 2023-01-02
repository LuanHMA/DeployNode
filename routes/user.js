import { Router } from "express";
import { UserModel } from '../database/models/User.js';
import bcryptjs from "bcryptjs";

const router = Router();

router.get("/cadastro", (req,res)=>[
    res.render("users/cadastro")
])

router.post("/cadastro",(req,res)=>{
    const { name,email,password } = req.body;

    UserModel.findOne({email: email})
        .then((user)=>{
            if(user){
                console.log("Já existe um usuário com esse email");
            }
            else{
                const newUser = new UserModel({
                    name: name,
                    email: email,
                    password: password
                })

                bcryptjs.genSalt(10, (error,salt)=> {
                    bcryptjs.hash(newUser.password, salt, (error,hash)=>{
                        if(error){
                            console.log("HASH: Houve um erro ao salvar");
                            res.redirect("/");
                        }
                        else{
                            newUser.password = hash;
                            newUser.save()
                                .then(()=>{
                                    console.log("Usuário criado com sucesso!");
                                    res.redirect("/");
                                })
                                .catch(error=>{
                                    console.log("Erro ao salvar o usuário", error);
                                    res.redirect("/");
                                })
                        }

                    })
                })
            }
        })
        .catch(error=> console.log("Erro ao cadastrar: "+error));
})

router.get("/login", (req,res)=>{
    res.render("users/login")
})

export const userRouter = router;