// Better button clicking on mobile
document.addEventListener('touchstart', () => {}, true);

/**
 * Prints the text content from the buttons to the calculator screen.
 * @param {HTMLButtonElement} button - The button whose text content will be used
 */
function printButton(button) {
    const buttonTextContent = button.textContent
    switch (buttonTextContent) {
        case '.':
        case '%':
        case '÷':
        case 'x':
        case '-':
        case '+':
            if (isOperatorDecimalRepeating) {
                clearEntry();
                const newFormula = formula + buttonTextContent;
                printFormula(newFormula);
                return;
            }
            isOperatorDecimalRepeating = true;
            break;
        default:
            isOperatorDecimalRepeating = false;
            break;
    }
    const newFormula = formula + buttonTextContent;
    printFormula(newFormula);
    isOverflowing = screen.scrollWidth > screen.clientWidth;
    if (isOverflowing) {  
        printFormula(formula);
        return;
    }
    formula = newFormula;
}

function clearScreen() {
    isOperatorDecimalRepeating = false;
    formula = "";
    printFormula(formula);
}

function clearEntry() {
    isOperatorDecimalRepeating = false;
    formula = formula.substring(0, formula.length - 1);
    printFormula(formula);
}

function evaluateEquation() {
    formula += "";
    let numbers = [];
    let operands = [];
    let number = "";
    for (let i = 0; i < formula.length; i++) {
        let currentCharacter = formula.charAt(i);
        switch (currentCharacter) {
            case '÷':
            case 'x':
            case '%':
            case '+':
            case '-':
                operands.push(currentCharacter);
                numbers.push(Number.parseFloat(number));
                number = "";
                break;
            default:
                number += currentCharacter;
                break;
        }
    }
    numbers.push(Number.parseFloat(number));
    console.log(numbers);
    for (let i = 0; i < operands.length; i++) {
        switch (operands.at(i)) {
            case '÷':
                numbers[i] = numbers.at(i) / numbers.at(i + 1);
                numbers.splice(i + 1, 1);
                operands.splice(i, 1);
                i--;
                break;
            case 'x':
                numbers[i] = numbers.at(i) * numbers.at(i + 1);
                numbers.splice(i + 1, 1);
                operands.splice(i, 1);
                i--;
                break;
            case '%':
                numbers[i] = numbers.at(i) % numbers.at(i + 1);
                numbers.splice(i + 1, 1);
                operands.splice(i, 1);
                i--;
                break;
            default:
                break;
        }
    }
    for (let i = 0; i < operands.length; i++) {
        switch (operands.at(i)) {
            case '+':
                numbers[i] = numbers.at(i) + numbers.at(i + 1);
                numbers.splice(i + 1, 1);
                operands.splice(i, 1);
                i--;
                break;
            case '-':
                numbers[i] = numbers.at(i) - numbers.at(i + 1);
                numbers.splice(i + 1, 1);
                operands.splice(i, 1);
                i--;
                break;
            default:
                break;
        }
    }
    if (Number.isInteger(numbers[0])) {
        formula = numbers[0] + "";
    }
    else {
        formula = numbers[0].toFixed(2) + "";
    }
    printFormula(formula);
    console.log(numbers);
}

function printFormula(formula) {
    screen.textContent = formula;
}

const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".printable");
const allClearButton = document.getElementById("all-clear");
const clearEntryButton = document.getElementById("clear-entry");
const equalsButton = document.getElementById("equals");
let isOverflowing = false;
let formula = "";
let isOperatorDecimalRepeating = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => printButton(button));
})
allClearButton.addEventListener("click", clearScreen);
clearEntryButton.addEventListener("click", clearEntry);
equalsButton.addEventListener("click", evaluateEquation);