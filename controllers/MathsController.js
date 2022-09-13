// Laboratoire 1 - Samy Tetrault 
const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        get() {
            if (this.HttpContext.path.queryString == '?'){
                // Send help page
                let helpPagePath = path.join(process.cwd(),"wwwroot/helpPages/mathsServicesHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html",content);
            }else if(!this.HttpContext.path.params.op){
                this.HttpContext.path.params.error = "parameter 'op' is missing";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
            }else if(Object.keys(this.HttpContext.path.params).length > 3){
                this.HttpContext.path.params.error = "The ammount of parameters received exceed the ammount required";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
            }
            switch(this.HttpContext.path.params.op){
                case ' ':
                    this.checkIfParamsXAndYExist()
                    this.HttpContext.path.params.answer = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                case '-':
                    this.checkIfParamsXAndYExist()
                    this.HttpContext.path.params.answer = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                case '*':
                    this.checkIfParamsXAndYExist()
                    this.HttpContext.path.params.answer = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                case '/':
                    this.checkIfParamsXAndYExist()
                    this.HttpContext.path.params.answer = parseInt(this.HttpContext.path.params.x) / parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                case '%':
                    this.checkIfParamsXAndYExist()
                    this.HttpContext.path.params.answer = parseInt(this.HttpContext.path.params.x) % parseInt(this.HttpContext.path.params.y);
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                case '!':
                    this.checkIfParamsNExist()
                    this.HttpContext.path.params.answer = factorial(parseInt(this.HttpContext.path.params.n));
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                case 'p':
                    this.checkIfParamsNExist()
                    this.HttpContext.path.params.answer = isPrime(parseInt(this.HttpContext.path.params.n));
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                case 'np':
                    this.checkIfParamsNExist()
                    this.HttpContext.path.params.answer = findPrime(parseInt(this.HttpContext.path.params.n));
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                default :
                    this.HttpContext.path.params.error = "This parameter does not exist";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
            }
        }
        checkIfParamsXAndYExist(){
            if(this.HttpContext.path.params.x && this.HttpContext.path.params.y){
                if(isNaN(parseInt(this.HttpContext.path.params.x))){
                    this.HttpContext.path.params.error = "The parameter 'x' is not a number";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else if(isNaN(parseInt(this.HttpContext.path.params.y))){
                    this.HttpContext.path.params.error = "The parameter 'y' is not a number";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                    return null;
                }
            } else{
                this.HttpContext.path.params.error = "parameter 'x' or 'y' is missing";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
            }
        }
        checkIfParamsNExist(){
            if(this.HttpContext.path.params.n){
                if(isNaN(parseInt(this.HttpContext.path.params.n))){
                    this.HttpContext.path.params.error = "The parameter 'n' is not a number";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                return null;
            } else{
                this.HttpContext.path.params.error = "parameter 'n' is missing";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
            }
        }
        
    }
    
    function factorial(n){
        if(n===0||n===1){
          return 1;
        }
        return n*factorial(n-1);
    }
    function isPrime(value) {
        for(var i = 2; i < value; i++) {
            if(value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }
    function findPrime(n){
        let primeNumer = 0;
        for ( let i=0; i < n; i++){
            primeNumer++;
            while (!isPrime(primeNumer)){
                primeNumer++;
            }
        }
        return primeNumer;
    }