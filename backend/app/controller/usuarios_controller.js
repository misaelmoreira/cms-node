const { Usuario } = require("../models");
const { Token } = require("../models");
var Guid = require('guid');
var ValidarUsuario = require("../services/validarUsuario.js");
const { hash, genSalt } = require('bcrypt')

class UsuariosController {
    async head(req, res, next){
        var id = Guid.raw();
        var tokenCriado = await Token.create({ token: id });
        if(!tokenCriado){
            return res.status(404).json({mensagem: "Token not created"})
        }
        return res.header('auth_token', tokenCriado.token).status(204).json("");
    }
    async todos(req, res) {
        const users = await Usuario.findAll();
        return res.json(users);
    }
    async porId(req, res, next){
        const { id } = req.params

        try{
            const user = await Usuario.findByPk(id)
            if(!user){
                return res.status(404).json({mensagem: "Usuário nao encontrado"})
            }
            const { nome, login, email, createdAt, updatedAt } = user
            return res.json({ id, nome, login, email, createdAt, updatedAt })
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

            var validar = ValidarUsuario(req);
            if(validar.erro == true) {
                return res.status(400).json({mensagem: validar.mensagem})         
            }

            const { nome, login, email, senha } = req.body
            const salt = await genSalt(8);
            const password_hash = await hash(senha, salt) 

            const user = await Usuario.create({ nome, login, email, password_hash}) 
            if(!user){
                return res.status(404).json({mensagem: "Usuario not created"})
            }

            return res.status(201).json({
                nome, 
                email, 
                id: user.id, 
                createdAt: user.createdAt, 
                updatedAt: user.updatedAt
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

            const user = await Usuario.findByPk(req.body.id)
            if(!user){
                return res.status(404).json({mensagem: "Usuário nao encontrado"})
            }

            const { nome, login, email, senha } = req.body
            const salt = await genSalt(8);
            const password_hash = await hash(senha, salt) 

            await user.update({ nome, login, email, password_hash}) 
            if(!user){
                return res.status(404).json({mensagem: "Usuario not created"})
            }

            return res.status(200).json({ mensagem: "Usuário atualizado com sucesso"});
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
                const user = await Usuario.findByPk(id)
                if(!user){
                    return res.status(404).json({mensagem: "Usuario not found"})
                }
                await user.destroy();
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

module.exports = new UsuariosController();