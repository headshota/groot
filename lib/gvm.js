/** 
 * Abstract class: Expression
 * Every expression should be extending this abstract class
 *
 */
var Expression = function(){
    this.reduce = function(){
        throw "Not Implemented"
    }
}

/** 
 * Class: Number
 * Expresses a mathematical number
 *
 */
var Number = function(value){
    var _self = this;

    _self.value = value;
    
    _self.getValue = function(){
        return _self.value;
    }

    _self.is_reducible = function(){
        return false;
    }
}
Number.prototype = new Expression();


/** 
 * Class: Add
 * Expresses addition for two Numbers
 *
 */
var Add = function(left, right){
    var _self = this;

    _self.reducable = true;

    _self.reduce = function() {
        while(left.is_reducible()){
            left = left.reduce();
        }

        while(right.is_reducible()){
            right = right.reduce();
        }

        return new Number(left.getValue() + right.getValue())
    }

    _self.is_reducible = function(){
        return true;
    }
}
Add.prototype = new Expression();


/** 
 * Class GVM
 * Groot Virtual Machine - evaluates expression trees
 *
 */
var GVM = function(){
    var _self = this;

    _self.evaluateExpressionTree = function(expression){
        while(expression.is_reducible()){
            expression = expression.reduce();
        }

        return expression.getValue()
    }
}


//TODO write tests instead of locally checking correctness
var expression = new Add(new Add(new Number(1), new Number(1)), new Add( new Number(2), new Number(3) ));
var gvm = new GVM();
console.log(gvm.evaluateExpressionTree(expression)); // should give 7

