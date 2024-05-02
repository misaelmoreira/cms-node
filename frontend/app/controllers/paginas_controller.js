var Pagina = require("../models/pagina");

var PaginasController = {
    index: function(req, res, next) {
        Pagina.todos(function(paginas){
            res.render('paginas/index', { 
                title: 'trazer os dados da API',
                paginas: paginas
            });            
        });
    },

    novo: function(req, res, next) {
        var erro = req.query.erro;
        if(erro === undefined){
            erro = "";
        }
        res.render('paginas/novo', {erro: erro}); 
    },

    cadastrar: function(req, res, next) {
        var pagina = new Pagina();
        pagina.nome = req.body.nome;
        pagina.conteudo = req.body.conteudo;       
        pagina.salvar(function(retorno){
            if(retorno.erro){              
                res.redirect('/paginas/novo?erro=' + retorno.mensagem); 
            }
            else {
                res.redirect('/paginas'); 
            }            
        });         
    },

    editar: function(req, res, next) {
        new Pagina({id:req.params.id}).buscar(function(pagina){                      
            if(pagina.erro !== undefined ){
                res.redirect('/paginas/alterar?erro=' + pagina.mensagem); 
            } 
            else{
                res.render('paginas/alterar', {pagina: pagina });
            }
        });
    },

    preview: function(req, res, next) {
        new Pagina({id:req.params.id}).buscar(function(pagina){                      
            res.send(pagina.conteudo);
        });
    },

    atualizar: function(req, res, next) {
        var pagina = new Pagina();
        pagina.id = req.params.id;
        pagina.nome = req.body.nome;
        pagina.conteudo = req.body.conteudo;        
        pagina.salvar(function(retorno){
            if(retorno.erro){              
                res.redirect('/paginas/novo?erro=' + retorno.mensagem); 
            }
            else {
                res.redirect('/paginas'); 
            }            
        });        
    },

    excluir: function(req, res, next) {
        var pagina = new Pagina();
        pagina.id = req.params.id;
        pagina.excluir(function(retorno){                      
            if(retorno.erro){
                res.redirect('/paginas/novo?erro=' + retorno.mensagem); 
            } 
            else{
                res.redirect('/paginas');
            }
        });
    }


};

module.exports = PaginasController;