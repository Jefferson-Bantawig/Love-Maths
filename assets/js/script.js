
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

    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    runGame("addition");
});

/** The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus(); // This will line will allow the cursor to be in the answerbox as soon as rungame() is called. This means user wont have to click the answer box everytime they want to type an answer.

    // Creates 2 random numbers from 1 to 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
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
        incrementScore();
    } else {
        alert(`Awww.... You answered ${userAnswer}, The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
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
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unemplemented operator ${operator}`);
        throw `Unemplemented operator ${operator}. Aborting!`;
    }
}
/**
 * Gets the current score from the DOM and increments it by 1
 */

function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").textContent);
    document.getElementById("score").innerText = ++oldScore;

}
/**
  * Gets the tally of incorrect answers from the DOM and increments it by 1
  */

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").textContent);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

/** 
 * The below uses a ternary operator which is a shorter version of if statements.
 * operand1 > operand2 ? ---> this line is asking is operand1 bigger than operand2? 
 * operand1 : operand2 ---> this line is saying. If operand1 bigger than operand2 then return operand1, if not(":") return operand2
 */
function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2; // i.e (2,1) since 2>1 it will display (2), if (1,2) it will display (2 -this is returning the operand2)
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1; // same as the above line, (2,1) since 2>1 it will display operand2 which is "1", if (1,2) it will swap and return operand1 which is "1"
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}