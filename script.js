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

const operate = function(operator, a, b) {
    if (operator == 'add') {
        return addOperation(a, b);
    } else if (operator == 'subtract') {
        return subtractOperation(a, b);
    } else if (operator == 'multiply') {
        return multiplyOperation(a, b);
    } else if (operator == 'divide') {
        return divideOperation(a, b);
    };
};