var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({ Given, And,  When, Then}){

    var tituloNovoCadastro = undefined;
    var titutoAlteradoCadastro = undefined;
    var idExclusao = undefined;

    Given('that I am in the registration page {stringInDoubleQuotes}', function (url, callback) {
        this.driver.sleep(800);
        this.driver.get(url);
        callback();
    });

    Given('click on the new button', function (callback) {
        this.driver.sleep(800);
        this.driver.findElement({css:'#novo-registro'}).then(function(element){
            element.click();
            callback(); //serve para dizer que acabou a operação node.js
        });
    });     

    Given('fill in the field {stringInDoubleQuotes} with {stringInDoubleQuotes}', function (campo, valor, callback) {
        //this.driver.sleep(800);
        if (campo === "nome" ){
            tituloNovoCadastro = valor + " - " + new Date().toString();
            valor = tituloNovoCadastro;
        }
        //this.driver.findElement({css:'#' + campo }).sendKeys(valor);
        this.driver.findElement({css:'input[name="' + campo + '"]'}).sendKeys(valor);
        this.driver.sleep(400);
        callback();
    });

    Given('click the save button', function (callback) {
        this.driver.sleep(800);
        this.driver.findElement({css:'input[type="submit"]'}).then(function(element){
            element.click();
            callback(); //serve para dizer que acabou a operação node.js
        });
    });

    Then('I must see the new register', function(callback){
        this.driver.findElement({css:'tr:last-child td:nth-child(2)'}).then(function(element){
            //this.driver.sleep(800);
            element.getText().then(function(textValue){
                if (tituloNovoCadastro !== textValue){
                    throw "regsiter not found, register should be = ("+ tituloNovoCadastro + "), and return = (" + textValue + ")";
                }
                callback();
            });
        });
    });

    Given('select a user', function (callback) {
        this.driver.sleep(800);
        this.driver.findElement({css:'tr:nth-child(2) td:nth-child(6) input'}).then(function(element){
            element.click();
            callback(); 
        });
    }); 

    Given('change in the field {stringIndoubleQuotes} with {stringIndoubleQuotes}', function (campo, valor, callback) {
        if(campo === "nome"){
            titutoAlteradoCadastro = valor + " - " + new Date().toString();
            valor = titutoAlteradoCadastro;
        }
        var cucumber = this;
        cucumber.driver.findElement({css:'input[name="' + campo + '"]'}).clear().then(function(){
            this.driver.sleep(800);
            cucumber.driver.findElement({css:'input[name="' + campo + '"]'}).sendKeys(valor);
            callback(); 
        });
    }); 

    Then('I must see the user changes', function(callback){
        //this.driver.sleep(800);
        this.driver.findElement({css:'tr:nth-child(2) td:nth-child(2)'}).then(function(element){
            element.getText().then(function(textValue){
                if (titutoAlteradoCadastro !== textValue){
                    throw "regsiter not found on change scenario, register should be = ("+ titutoAlteradoCadastro + "), and return = (" + textValue + ")";
                }
                callback();
            });
        });
    });


    // Given('select a user and click the Delete button', function (callback) {
    //     this.driver.sleep(800);
    //     var cucumber = this;
    //     this.driver.findElement({css:'tr:last-child td:nth-child(1)'}).then(function(element){
    //         element.getText().then(function(textValue){
    //             idExclusao = textValue;
    //             cucumber.driver.findElement({css: 'tr:last-child td:nth-child(7) input'}).then(function(){
    //                 element.click();
    //                 cucumber.driver.switchTo().alert().then(function(alert){
    //                     alert.accept();
    //                     callback();
    //                 });                    
    //             });                
    //         });
    //     }); 
    // });

    // Then('I don-t have seen him anymore', function(callback){
    //     this.driver.findElement({css:'tr:last-child td:nth-child(1)'}).then(function(element){
    //         element.getText().then(function(textValue){
    //             if (idExclusao === textValue){
    //                 throw "Register with ID = ("+ idExclusao + ") should be = (" + textValue + ")";
    //             }
    //             callback();
    //         });
    //     });
    // });



   
});

 