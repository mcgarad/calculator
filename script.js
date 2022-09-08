const addOperation = function(a, b) {
    return a + b;
};

const subtractOperation = function(a, b) {
    return a - b;
};

const multiplyOperation = function(a, b) {
    return a * b;
};

const divideOperation = function(a, b) {
    return a / b;
};

let result = 0;
const operate = function(operator, a, b) {
    if (operator == '+') {
        result = addOperation(Number(a), Number(b));
    } else if (operator == '-') {
        result = subtractOperation(Number(a), Number(b));
    } else if (operator == '*') {
        result = multiplyOperation(Number(a), Number(b));
    } else if (operator == '/') {
        result = divideOperation(Number(a), Number(b));
    };
    if (String(result).length > 20) {
        return Number(result.toFixed(20));
    } else {
        return result;
    };
};

let operationPressed = false;
let equalsButtonPressed = false;
let readyForNewInput = false;
let operator = "";
let previousDisplay = "0"

let typedDigit = false;

const displayWindow = document.querySelector('#display');
let displayValue = '0';
displayWindow.textContent = displayValue;

const displayAddDigit = function(displayValue, input) {
    if (displayValue === "0" || readyForNewInput) {
        displayValue = String(input);
        displayWindow.textContent = displayValue;
        readyForNewInput = false;
        return displayValue;
    } else {
        displayValue = displayValue + input;
        displayWindow.textContent = displayValue;
        return displayValue;
    };
};

const checkInfinity = function(displayValue) {
    if (displayValue === Infinity) {
        displayValue = "0";
        displayWindow.textContent = "Thanks..you broke math.";
    } else {
        displayWindow.textContent = displayValue;
    }
    return displayValue;
}

const digitButtons = document.querySelectorAll('.digit');

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        displayValue = displayAddDigit(displayValue, button.textContent);
        typedDigit = true;
        numberTyped = displayValue;
    });
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    displayValue = '0';
    displayWindow.textContent = displayValue;
    operationPressed = false;
})

const operatorButtons = document.querySelectorAll('.operation');

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (equalsButtonPressed) {
            operationPressed = false;
            equalsButtonPressed = false;
        }
        if (operationPressed) {
            displayValue = checkInfinity(operate(operator, previousDisplay, numberTyped));
            typedDigit = false;
        };
        previousDisplay =  displayValue;
        operator = button.textContent;
        operationPressed = true;
        readyForNewInput = true;
    });
});

const equalsButton = document.querySelector('#equate');

equalsButton.addEventListener('click', () => {
    if (operationPressed) {
        displayValue = checkInfinity(operate(operator, previousDisplay, numberTyped));
        typedDigit = false;
    };
    previousDisplay =  displayValue;
    operationPressed = true;
    readyForNewInput = true;
    equalsButtonPressed = true;
});

const deleteButton = document.querySelector("#delete");

deleteButton.addEventListener('click', () => {
    if (typedDigit && displayValue.length > 1) {
        displayValue = displayValue.substring(0, displayValue.length - 1);
        numberTyped = displayValue;
        displayWindow.textContent = displayValue;
    } else if (typedDigit && displayValue != "0") {
        displayValue = "0";
        numberTyped = displayValue;
        displayWindow.textContent = displayValue;
        typedDigit = false;
    }
});

const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue = displayValue + '.';
        displayWindow.textContent = displayValue;
    }
});