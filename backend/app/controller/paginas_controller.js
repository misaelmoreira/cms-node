const { Pagina } = require("../models/index.js");
const { Token } = require("../models/index.js");
var Guid = require('guid');
var ValidarPagina = require("../services/validarPagina.js");

class PaginasController {
    async head(req, res, next){
        var id = Guid.raw();
        var tokenCriado = await Token.create({ token: id });
        if(!tokenCriado){
            return res.status(404).json({mensagem: "Token not created"})
        }
        res.header('auth_token', tokenCriado.token);
        return res.status(204).json("");
    }
    async todos(req, res) {
        const paginas = await Pagina.findAll();
        return res.json(paginas);
    }
    async porId(req, res, next){
        const { id } = req.params

        try{
            const pagina = await Pagina.findByPk(id)
            if(!pagina){
                return res.status(404).json({mensagem: "Pagina nao encontrado"})
            }
            const { nome, conteudo,  createdAt, updatedAt } = pagina
            return res.json({ id, nome, conteudo, createdAt, updatedAt })
        } 
        catch(err){
            return res.status(400).send({ mensagem: err.mensagem})
        }
    }
    async criar(req, res, next){
        var tokenReq = req.headers.auth_token;

        if(tokenReq == undefined){
            return res.status(401).send({
                erro: 'Token inválido, você não tem autorização de acessar esta API'
            });      
        }

        const token = await Token.findAll({
            where: {
              token: tokenReq,
            },
        });

        if (token.length > 0) { 
            //await token[0].destroy();

            var validar = ValidarPagina(req);
            if(validar.erro == true) {
                return res.status(400).json({mensagem: validar.mensagem})         
            }

            const { nome, conteudo } = req.body

            const pagina = await Pagina.create({ nome, conteudo}) 
            if(!pagina){
                return res.status(404).json({mensagem: "Paginas not created"})
            }

            return res.status(201).json({
                nome, 
                conteudo, 
                id: pagina.id, 
                createdAt: pagina.createdAt, 
                updatedAt: pagina.updatedAt
            }); 
        } 
        else {
            return res.status(401).json({
                erro: 'Token inválido, você não tem autorização de acessar esta API'
            });            
        }           
    }
    async atualizar(req, res, next){
        var tokenReq = req.headers.auth_token;

        if(tokenReq == undefined){
            return res.status(401).send({
                erro: 'Token inválido, você não tem autorização de acessar esta API'
            });      
        }

        const token = await Token.findAll({
            where: {
              token: tokenReq,
            },
        });

        if (token.length > 0) { 
            //await token[0].destroy();

            const pagina = await Pagina.findByPk(req.body.id)
            if(!pagina){
                return res.status(404).json({mensagem: "Pagina nao encontrado"})
            }

            const { nome, conteudo } = req.body

            await pagina.update({ nome, conteudo }) 
            if(!pagina){
                return res.status(404).json({mensagem: "Paginas not created"})
            }

            return res.status(200).json({ mensagem: "Pagina atualizado com sucesso"});
        } 
        else {
            return res.status(401).json({
                erro: 'Token inválido, você não tem autorização de acessar esta API'
            });
        }     
    }
    async excluirUsuario(req, res, next){
        var tokenReq = req.headers.auth_token;

        if(tokenReq == undefined){
            return res.status(401).send({
                erro: 'Token inválido, você não tem autorização de acessar esta API'
            });      
        }

        const token = await Token.findAll({
            where: {
              token: tokenReq,
            },
        });

        if (token.length > 0)
        {
            const { id } = req.params

            try{
                const pagina = await Pagina.findByPk(id)
                if(!pagina){
                    return res.status(404).json({mensagem: "Paginas not found"})
                }
                await pagina.destroy();
                return res.status(204).send(); 
            } catch(err){
                return res.status(400).send({ mensagem: err.message})
            }
        }
        else 
        {
            return res.status(401).send({
                erro: 'Token inválido, você não tem autorização de acessar esta API'
            });
        }
    }
    async options(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");        
        res.header("Access-Control-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
        res.header("Access-Control-Allow-Headers", "Content-Type");
        return res.status(204).send(""); 
    } 
};

module.exports = new PaginasController();