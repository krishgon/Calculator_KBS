function clearScreen(){
    console.log('clicked');
    document.getElementById('screen').value = '';
}

function appendToScreen(character){
    console.log(character);
    document.getElementById('screen').value += character;
}

function calculate() {
    try {
        const expression = document.getElementById('screen').value;
        document.getElementById('screen').value = evaluateExpression(expression);
    } catch (error) {
        document.getElementById('screen').value = 'Error';
    }
}


function evaluateExpression(expression){
    const tokens = expression.match(/(\d+\.?\d*|[-+*/])/g);
    if (!tokens) return 'Error';
    
    let numbers = [], operators = [];
    
    for (let token of tokens) {
        if (!isNaN(token)) {
            numbers.push(parseFloat(token));
        } else {
            while (operators.length && precedence(operators[operators.length - 1]) >= precedence(token)) {
                const num2 = numbers.pop();
                const num1 = numbers.pop();
                const op = operators.pop();
                numbers.push(applyOperator(num1, num2, op));
            }
            operators.push(token);
        }
    }
    
    while (operators.length) {
        const num2 = numbers.pop();
        const num1 = numbers.pop();
        const op = operators.pop();
        numbers.push(applyOperator(num1, num2, op));
    }
    
    return numbers[0];

}

function precedence(operator) {
    if (operator === '+' || operator === '-') return 1;
    if (operator === '*' || operator === '/') return 2;
    return 0;
}

function applyOperator(num1, num2, operator) {
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '*') return num1 * num2;
    if (operator === '/') return num2 !== 0 ? num1 / num2 : 'Error';
}