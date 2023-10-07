function add(a, b) { return Number(a) + Number(b) }

function multiply(a, b) { return Number(a) * b }

function divide(a, b) { return a / b }
console.log(substract(3, 2))

function substract(a, b) { return a - b }
let firstNum;
let secondNum;
let operator;

function operate(firstNum, operator, secondNUm) {
    if (operator === '+') { add(firstNum, secondNUm) } else if (operator === '*') { multiply(firstNum, secondNUm) } else if (operator === '-') { substract(firstNum, secondNUm) } else if (operator === '/') { divide(firstNum, secondNUm) }
}
const disp = document.getElementById('display')
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const fired_button = button.value;
        disp.innerText += fired_button;

        if (fired_button === '=') {
            disp.innerText = operate()

        }




    });
});