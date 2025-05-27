// Better button clicking on mobile
document.addEventListener('touchstart', () => {}, true);
/**
 * Prints 
 * @param {} button 
 * @returns 
 */
function printButton(button) {
    const newFormula = formula + button.textContent;
    printFormula(newFormula);
    isOverflowing = screen.scrollWidth > screen.clientWidth;
    if (isOverflowing) {  
        printFormula(formula);
        return;
    }
    formula = newFormula;
}

function clearScreen() {
    formula = "";
    printFormula(formula);
}

function clearEntry() {
    formula = formula.substring(0, formula.length - 1);
    printFormula(formula);
}

function evaluateEquation() {
    console.log(typeof(formula));
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
    // Empty String added to keep formula as a string.
    formula = numbers[0] + "";
    screen.textContent = formula;
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

buttons.forEach((button) => {
    button.addEventListener("click", () => printButton(button));
})
allClearButton.addEventListener("click", clearScreen);
clearEntryButton.addEventListener("click", clearEntry);
equalsButton.addEventListener("click", evaluateEquation);