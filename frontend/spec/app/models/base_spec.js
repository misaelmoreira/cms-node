var Base = require("../../../app/models/base");

describe("O modelo de base", function(){
    
    describe("com o metodo salvar", function(){
        it("deve inclur na API", function(done){
            var base = new Base();
            expect(base.salvar !== undefined).toBe(true);
            done();                        
        });
    });

    describe("com o metodo buscar", function(){
        it("deve buscar pelo ID", function(done){
            var base = new Base();
            expect(base.buscar !== undefined).toBe(true);
            done();                        
        });
    });

    describe("com o metodo todos", function(){
        it("deve exibir todos os bases pela API", function(done){
            var base = new Base();
            expect(base.todos !== undefined).toBe(true);
            done();            
                     
        });
    });

    describe("com o metodo excluir", function(){
        it("deve excluir pelo ID", function(done){
            var base = new Base();
            base.id = 1;
            expect(base.excluir !== undefined).toBe(true);
            done();                        
        });

        it("deve validar o ID para exclusão", function(done){
            var base = new Base();
            base.excluir(function(retorno){
                if(retorno.erro){
                    expect(retorno.mensagem).toBe("Id para exclusão obrigatorio");
                    done(); 
                }
            });
        });
    });

});