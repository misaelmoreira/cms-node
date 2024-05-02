var Pagina = require("../../../app/models/pagina");

describe("O modelo de pagina", function(){
    describe("com atributos", function(){
        it("id precisa ser valido", function(){
            var pagina = new Pagina();    
            expect(pagina.id).toBe(0);
        });
        it("nome precisa ser valido", function(){
            var pagina = new Pagina();
            expect(pagina.nome).toBe("");
        });
        it("conteudo precisa ser valido", function(){
            var pagina = new Pagina();
            expect(pagina.conteudo).toBe("");
        });
        
    });
    describe("com o metodo salvar", function(){
        it("deve inclur na API", function(done){
            var pagina = new Pagina();
            pagina.nome = "Nova pagina pela interface";
            pagina.conteudo = "pagina interface";            
            pagina.salvar(function(retorno){
                expect(retorno.erro).toBe(false);
                done();
            });            
        });
    });

    describe("com o metodo todos", function(){
        it("deve exibir todos os paginas pela API", function(done){
            Pagina.todos(function(retorno){
                expect(retorno.length >= 0).toBe(true);
                done();
            });           
                     
        });
    });
});