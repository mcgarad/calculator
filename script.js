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
    if (String(result).length > 8) {
        return Number(result.toFixed(8));
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
    if (readyForNewInput) {
        displayValue = "0";
        readyForNewInput = false;
    };
    if (!displayValue.includes('.')) {
        displayValue = displayValue + '.';
        displayWindow.textContent = displayValue;
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === '.') {
        if (readyForNewInput) {
            displayValue = "0";
            readyForNewInput = false;
        };
        if (!displayValue.includes('.')) {
            displayValue = displayValue + '.';
            displayWindow.textContent = displayValue;
        };
    } else if (event.key === 'Backspace') {
        if (typedDigit && displayValue.length > 1) {
            displayValue = displayValue.substring(0, displayValue.length - 1);
            numberTyped = displayValue;
            displayWindow.textContent = displayValue;
        } else if (typedDigit && displayValue != "0") {
            displayValue = "0";
            numberTyped = displayValue;
            displayWindow.textContent = displayValue;
            typedDigit = false;
        };
    } else if (event.key === 'Enter' || event.key === '=') {
        if (operationPressed) {
            displayValue = checkInfinity(operate(operator, previousDisplay, numberTyped));
            typedDigit = false;
        };
        previousDisplay =  displayValue;
        operationPressed = true;
        readyForNewInput = true;
        equalsButtonPressed = true;
    } else if (event.key === '-' || event.key === '/' || event.key === '*' || event.key === '+') {
        if (equalsButtonPressed) {
            operationPressed = false;
            equalsButtonPressed = false;
        }
        if (operationPressed) {
            displayValue = checkInfinity(operate(operator, previousDisplay, numberTyped));
            typedDigit = false;
        };
        previousDisplay =  displayValue;
        operator = event.key;
        operationPressed = true;
        readyForNewInput = true;
    } else if (event.key === '0' || event.key === '1' ||
               event.key === '2' || event.key === '3' ||
               event.key === '4' || event.key === '5' ||
               event.key === '6' || event.key === '7' ||
               event.key === '8' || event.key === '9') {
        displayValue = displayAddDigit(displayValue, event.key);
        typedDigit = true;
        numberTyped = displayValue;
        };
});