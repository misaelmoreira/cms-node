var {defineSupportCode} = require('cucumber');

defineSupportCode(function({ Given, When, Then}){

    Given('the initial page', function(callback){
        this.driver.get('http://localhost:3001');
        callback();
    });

    Given('I have the content table in body', function(callback){
        this.driver.findElement({css:'body'});
        callback();
    });

    Then('I should have text {arg1:stringDoubleQuotes} on the page', function(title, callback){
        this.driver.sleep(800);
        this.driver.findElements({css: 'h1'}).then(function(h1){
            h1[0].getAttribute("innerText").then(function(text){
                if(text === title){
                    callback();
                }
                else{
                    callback(new Error( "The title of body is different, body:(" + text + "), test: (" + title + ")"));
                }
            })
        });
    });
});

