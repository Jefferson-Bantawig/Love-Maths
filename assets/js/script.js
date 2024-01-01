
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
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

/** 
 * Checks the answer against the first element in 
 * the returned calculatedCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value); // .value is used and not .textContent because the "#answer-box" is and INPUT element.
    let calculatedAnswer = calculateCorrectAnswer(); // This returns an array(the function is declared below) --> [correct answer, "addition] 
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect === true) {
        alert("YAAASSS! You got right! :D");
    } else {
        alert(`Awww.... You answered ${userAnswer}, The correct answer was ${calculatedAnswer[0]}`);
    }

    runGame(calculatedAnswer[1]); //The second value is the calculateCorrectAnswer is used here to run the same "addition" game.

}

/** Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the DOM, and returns the correct answer.
*/

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText); // parseInt is used here because by default when getting data from the DOM, JS returns it as a string
    let operand2 = parseInt(document.getElementById("operand2").innerText); // using parseInt will return is as an Interger(Whole number)
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`Unemplemented operator ${operator}`);
        throw `Unemplemented operator ${operator}. Aborting!`;
    }
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