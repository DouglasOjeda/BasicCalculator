// Better button clicking on mobile
document.addEventListener('touchstart', () => {}, true);

function printButton(button) {
    console.log(button.textContent);
}

const screen = document.getElementById("screen");

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", () => printButton(button));
})
