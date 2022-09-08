const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let buffer = null;
let register = null;
let opCode = null;

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('#c-button');
const evaluateButton = document.querySelector('#evaluate-button')
const decimalButton = document.querySelector('#decimal-button');
const negateButton = document.querySelector('#negate-button');
const percentageButton = document.querySelector('#percentage-button');

initiateCalc();

function initiateCalc() {
    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendDigit(button.textContent));
        button.addEventListener('click', changeClearButton);
    });
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => setOpCode(button.value))
    });
    clearButton.addEventListener('click', clear);
    evaluateButton.addEventListener('click', evaluate);
    decimalButton.addEventListener('click', addDecimal);
    decimalButton.addEventListener('click', changeClearButton);
    negateButton.addEventListener('click', negate);
    percentageButton.addEventListener('click', percentage);
}

function changeClearButton() {
    clearButton.textContent = 'C';
}

function appendDigit(digit) {
    if (buffer === null) {
        buffer = digit;
    } else {
        buffer += digit;
    }

    updateDisplay(buffer);
}

function addDecimal() {        
    if (buffer !== null && buffer.includes('.')) return;

    buffer = buffer !== null ? buffer += '.' : buffer = '0.';

    updateDisplay(buffer);
}

function updateDisplay(output) {
    let display = document.querySelector('#display');
    display.value = output;
}

function clear() {
    if (buffer === null) {
        register = null;
        opCode = null;
    }

    buffer = null;

    clearButton.textContent = 'AC';
    updateDisplay('0');
}

function setOpCode(code) {
    if (register === null && buffer === null) return;
    if (register !== null && buffer !== null) evaluate();
    if (register === null && buffer !== null) {
        register = buffer;
        buffer = null;
    }

    opCode = code;
}


function operate(operator, firstNumber, secondNumber) {
    if (!OPERATORS.includes(operator))
        throw `Invalid operator: ${operator} is not a valid operator.`;

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
    return Number(firstNumber) + Number(secondNumber);
}

function subtract(firstNumber, secondNumber) {
    return Number(firstNumber) - Number(secondNumber);
}

function multiply(firstNumber, secondNumber) {
    return Number(firstNumber) * Number(secondNumber);
}

function divide(numerator, denominator) {
    return Number(numerator) / Number(denominator);
}

function evaluate() {
    if ((buffer === null && register !== null) ||
        (buffer === null && register === null)) 
            return false;

    if (buffer !== null && register !== null) {
        if (opCode === 'divide' && Number(buffer) === 0) {
            alert("0ops! You tried to divide by 0 you silly billy!");
            buffer = null;
            updateDisplay('0');
            
            return false;
        }

        register = operate(opCode, register, buffer);
    }

    if (buffer !== null && register === null) 
        register = buffer;

    buffer = null;
        
    updateDisplay(register);
    return true;
}

function negate() {
    if (buffer === null) {
        register = Number(register) * -1;
        updateDisplay(register);
    } else {
        buffer = Number(buffer) * -1;
        updateDisplay(buffer);
    }
}

function percentage() {
    if (opCode !== null && buffer !== null) {
        buffer = Number(buffer) * 0.01;
        updateDisplay(buffer);
    } else {
        register = Number(register) * 0.01;
        updateDisplay(register);
    }
    
}