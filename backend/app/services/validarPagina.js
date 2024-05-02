var ValidarPagina = function (req){
    resultado = {}   

    if(req.body.nome === undefined){
        return resultado = { 
            mensagem: 'erro ao cadastrar pagina, Nome da pagina obrigatorio',
            erro: true
        };
    }
    
    if(req.body.conteudo === undefined){
        return resultado = { 
            mensagem: 'erro ao cadastrar pagina, Conteudo da página obrigatorio',
            erro: true
        };
    }
    
    return resultado = { 
        mensagem: 'ok',
        erro: false
    };
}

module.exports = ValidarPagina;