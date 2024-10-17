let currentInput = '0';
let currentOperator = '';
let previousInput = '';
const display = document.getElementById('display');

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
        currentOperator = op;
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    currentOperator = '';
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

function calculate() {
    if (previousInput !== '' && currentInput !== '' && currentOperator !== '') {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch(currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Tidak bisa membagi dengan nol!');
                    clearAll();
                    return;
                }
                result = prev / current;
                break;
            case '^':
                result = Math.pow(prev, current);
                break;
            case '%':
                result = prev % current;
                break;
        }

        currentInput = result.toString();
        previousInput = '';
        currentOperator = '';
        updateDisplay();
    }
}