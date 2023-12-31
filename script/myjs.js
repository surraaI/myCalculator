let firstNum = '';
let secondNum = '';
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equall')
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('del');
const dotButton = document.getElementById('dot');
const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
dotButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent)))

operatorButtons.forEach((button) => button.addEventListener('click', () => setOperation(button.textContent)))

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
        resetScreen()
    currentOperationScreen.textContent += number
}

function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}

function clear() {
    currentOperationScreen.textContent = ''
    lastOperationScreen.textContent = ''
    firstNum = ''
    secondNum = ''
    currentOperation = null
}

function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
        currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'

}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstNum = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstNum} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!")
        return
    }
    secondNum = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstNum, secondNum)

    )
    lastOperationScreen.textContent = `${firstNum} ${currentOperation} ${secondNum} =`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return substract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}