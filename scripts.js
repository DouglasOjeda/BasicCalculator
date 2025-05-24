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
    console.log(screen.textContent.length);
    console.log(formula.length);
    let solvedEquation = NaN;
    let i = 0;
    while (formula.charAt(i) )
    for (let i = 0; i < formula.length; i++) {
        
    }
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