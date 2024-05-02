var ValidarUsuario = function (req){
    resultado = {}

    if(req.body.nome === undefined){
        return resultado = { 
            mensagem: 'erro ao cadastrar usuario, nome de usuário precisa estar preenchido',
            erro: true
        };
    }
    
    if(req.body.login === undefined){
        return resultado = { 
            mensagem: 'erro ao cadastrar usuario, login de usuário precisa estar preenchido',
            erro: true
        };
    }
    
    if(req.body.senha === undefined){           
        return resultado = { 
            mensagem: 'erro ao cadastrar usuario, senha de usuário precisa estar preenchido',
            erro: true
        };
    }
    if(req.body.email === undefined){
        return resultado = { 
            mensagem: 'erro ao cadastrar usuario, email de usuário precisa estar preenchidoo',
            erro: true
        };
    }
    
    return resultado = { 
        mensagem: 'ok',
        erro: false
    };
}

module.exports = ValidarUsuario;