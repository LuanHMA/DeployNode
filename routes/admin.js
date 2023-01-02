import { Router } from "express";
import { CategorysModel } from "../database/models/Categorys.js";
import { PostsModel } from '../database/models/Posts.js';

const router = Router();

//Home
    router.get("/", (req,res)=>{
        res.render("admin/home");
    })
//Posts
    router.get("/postagens", (req,res)=>{
        PostsModel.find().populate("category").sort({data:'desc'}).lean()
            .then((posts)=> res.render("admin/postagens", { posts: posts }))
            .catch(error=> console.log("Não foi possivel recuperar os posts"))
    })

    //Criar
    router.get("/postagens/criar", (req,res)=>{
        CategorysModel.find().lean()
            .then((categorys)=> res.render("admin/novaPostagem", {categorys: categorys}))
            .catch(error=> {
                console.log("Error ao criar postagem")
                res.redirect("admin/postagens")
            })
    })

    router.post("/postagens/criar", (req,res)=>{
        const { title, slug, description, content, categorys } = req.body;

        new PostsModel({
            title: title,
            slug: slug,
            description: description,
            content: content,
            category: categorys
        }).save()
            .then(()=> {
                console.log("Postagem criada com sucesso!");
                res.redirect("admin/postagens");
            })
            .catch(error=> {
                console.log("Postagem não foi criada! [ERROR]: "+error);
                res.redirect("admin/postagens")
            })
    })

//Listar Categorias
    router.get("/categorias", (req,res)=>{
        CategorysModel.find().lean()
            .then((categorys)=> {
                res.render("admin/categorias", {categorys: categorys});
            })
            .catch(error=>{
                req.flash("errorMsg", "Houve um erro ao listar as categorias");
                rer.redirect("/ admin")
            })
    })
//Criar Categoria
    router.get("/categorias/criar", (req,res)=>{
        res.render("admin/novaCategoria")
    })
    router.post("/categorias/criar", (req,res)=>{
        const errors = [];
        const { name, slug } = req.body;

        if(!name || typeof name == undefined || name == null){
            errors.push({text: "Nome Inválido"});
        }
        if(!slug || typeof slug == undefined || slug == null){
            errors.push({text: "Slug Inválido"});
        }
        if(errors.length > 0) {
            res.render("novaCategoria", {errors: errors});
        }

        else{
            new CategorysModel({
                name: name,
                slug: slug
            }).save()
                .then(()=> {
                    console.log("Category salved with success");
                    req.flash("successMsg", "Categoria criada com sucesso!");
                    res.redirect("/admin/categorias");
                })
                .catch((error)=>{
                    console.log("Error to salve category: "+error);
                    req.flash("errorMsg", "Houve um erro de cadastro, tente novamente");
                });
        }
        
    })
//Editar Categoria
    router.get("/categorias/editar/:id", (req,res)=>{
        const { id } = req.params;
        CategorysModel.findOne({_id: id}).lean()
            .then((category)=>{
                res.render("admin/editarCategoria", {category: category});
            })
            .catch((error)=> {
                res.send("Error: "+error);
            })
    });
    router.post("/categorias/editar", (req,res)=>{
        const { id, name, slug } = req.body;

        CategorysModel.findOne({_id: id})
            .then(category=>{
                category.name = name;
                category.slug = slug;

                category.save()
                    .then(()=> {
                        console.log("Categoria editada com sucesso")
                        res.redirect("/admin/categorias")
                    })
                    .catch((error)=> console.log("Houve um erro ao atualizar os dados: "+error))
            })
            .catch(error=> {
                res.redirect("/admin/categorias")
            })
    })
//Remover Categoria
    router.post("/categorias/remover", (req,res)=>{
        console.log(req.body)
        const { id } = req.body;
        CategorysModel.deleteOne({_id: id}).lean()
            .then(()=>{
                console.log("Categoria removida com sucesso");
                res.redirect("/admin/categorias");
            })
            .catch(error=>{
                console.log("Houve um erro: "+error);
            })
    })
export const adminRouter = router;