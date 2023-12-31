
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked Submit!");
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType); // NOTE!! -  Eventho this code is higher in order of code, the "runGame(gameType)" is a function declared below. This is called hoisting!.
            }
        });
    }
    runGame("addition");
});

/** The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) { 

    // Creates 2 random numbers from 1 to 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

function checkAnswer() {


}

/** Gets the operands (the numbers) adn the operator (plus, minus etc)
 * directly from the DOM, and returns the correct answer.
*/

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText); // parseInt is used here because by default when getting data from the DOM, JS returns it as a string
    let operand2 = parseInt(document.getElementById("operand2").innerText); // using parseInt will return is as an Interger(Whole number)
    let operator = document.getElementById("operator").innerText;
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}