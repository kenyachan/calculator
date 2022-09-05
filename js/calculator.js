const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let buffer = null;
let register = null;
let opCode = null;

let numberButtons = document.querySelectorAll('.number-button');
let operatorButtons = document.querySelectorAll('.operator-button');
let clearButton = document.querySelector('#c-button');
let allClearButton = document.querySelector('#ac-button');
let evaluateButton = document.querySelector('#evaluate-button')

numberButtons.forEach(button => {
    button.addEventListener('click', appendDigit);
});

operatorButtons.forEach(button => {
    button.addEventListener('click', setOpCode);
});

clearButton.addEventListener('click', clear);
allClearButton.addEventListener('click', clearAll);

evaluateButton.addEventListener('click', evaluate);

function appendDigit(button) {
    if (buffer === null) {
        buffer = button.target.textContent;
    } else {
        buffer = `${buffer}${button.target.textContent}`;
    }

    updateDisplay(buffer);
}

function updateDisplay(output) {
    let display = document.querySelector('#display');
    display.value = output;
}

function clear() {
    buffer = null;

    updateDisplay('0');
}

function clearAll() {
    buffer = null;
    register = null;
    op = null;

    updateDisplay('0');
}

function setOpCode(button) {
    // if (button.target.value === 'equals') {
    //     register = operate(op, register, buffer);
    //     buffer = null;
  
    //     updateDisplay(register);

    //     return;
    // }
    
    op = button.target.value;

    if (register === null) {
        register = buffer;
        buffer = null;
    } else {
        register = operate(op, register, buffer);
        buffer = null;

        updateDisplay(register);
    }

}



function operate(operator, firstNumber, secondNumber) {
    if (!OPERATORS.includes(operator)) {
        throw `Invalid operator: ${operator} is not a valid operator.`;
    }

    switch (operator) {
        case 'add':
            return add(firstNumber, secondNumber);
        case 'subtract':
            return subtract(firstNumber, secondNumber);
        case 'multiply':
            return multiply(firstNumber, secondNumber);
        case 'divide':
            return divide(firstNumber, secondNumber);
    }
}


function add(firstNumber, secondNumber) {
    return parseInt(firstNumber) + parseInt(secondNumber);
}

function subtract(firstNumber, secondNumber) {
    return parseInt(firstNumber) - parseInt(secondNumber);
}

function multiply(firstNumber, secondNumber) {
    return parseInt(firstNumber) * parseInt(secondNumber);
}

function divide(numerator, denominator) {
    return parseInt(numerator) / parseInt(denominator);
}

function evaluate() {
    if (op === null)

    if (register === null) {
        register = buffer;
        buffer = operate(op, buffer, buffer);
    } else {
        // opCodeEvaluate
    }
}
