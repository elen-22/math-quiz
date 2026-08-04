let questionNum = document.querySelector("#questionNum")
let setUpDiv = document.querySelector("#setUp")
let questionText = document.querySelector(".question")
console.log(questionText.innerHTML)
let userInput = document.querySelector("#questionAnswer")
let scoreElement = document.querySelector("#scoreNum")
let wrongElement = document.querySelector("#wrongNum")
let messageElement = document.querySelector(".message")
let gameElements = document.querySelector(".gameContainer")
let timerElement = document.querySelector("#timer")
let backgroundMusic = document.querySelector("#backgroundMusic")
let gameOverDiv = document.querySelector("#gameOverDiv");
let finalScoreElement = document.querySelector("#finalScore");

let startBtn = document.querySelector("#startBtn")
let submitBtn = document.querySelector("#submitBtn")
// let restartBtn = document.querySelector(".restartBtn")


let number1, number2, operator, correctAnswer;
let score = 0
let wrongAnswers = 0
let totalQuestions = 0
let askedQuestions = 0
let gameOn = false;
questionNum.focus()
let timeLeft;
let countDown;
let operators = ["+", "-", "*", "/"]
// let operators = ["+", "-"]


gameElements.style.display = "none"

//funtion to start the game
startBtn.addEventListener("click", () => {

    totalQuestions = +questionNum.value
    if (totalQuestions <= 0 || totalQuestions > 100) alert("enter a number between 1 and 100")
    else {
        gameOn = true
        askedQuestions = 0
        score = 0
        wrongAnswers = 0
        setUpDiv.style.display = "none";
        gameElements.style.display = "block"
        scoreElement.textContent = 0;
        wrongElement.textContent = "0/5";
        messageElement.textContent = "";
        backgroundMusic.play()
        //when the game starts we would like to see the question
        generateQuestion()
    }

})
//explain with examples
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function startTimer() {
    clearInterval(countDown)
    timeLeft = 10
    timerElement.innerHTML = `time left: ${timeLeft}s`
    countDown = setInterval(() => {
        timeLeft--
        timerElement.innerHTML = `time left: ${timeLeft}s`

        if (timeLeft == 0) {
            clearInterval(countDown)
            messageElement.textContent = "time is up!"
            setTimeout(() => messageElement.innerHTML = "", 500)
            wrongAnswers++
            wrongElement.textContent = `${wrongAnswers}/5`;
            setTimeout(() => {
                generateQuestion();
            }, 500);

        }
    }, 1000)
}

function generateQuestion() {
    userInput.focus()
    if (askedQuestions >= totalQuestions || wrongAnswers >= 5) {
        //we have to end the game(coming) here later
        endGame()
        return
    }

    // number1 = getRandom(1, 20)
    // number2 = getRandom(1, 20)
    number1 = getRandom(1, 10)
    number2 = getRandom(1, 10)
    operator = operators[getRandom(0, operators.length - 1)]
    console.log(number1, number2, operator)

    // making sure that if we do division we would like to get a whole number
    if (operator === "/") {
        number2 = getRandom(1, 10);
        number1 = number2 * getRandom(1, 10);
    }

    // if(operator=="-" && number1<number2){
    //     [number1, number2] = [number2, number1];
    // }

    if (operator === "+") {
        number1 = getRandom(0, 10);
        number2 = getRandom(0, 10 - number1);
        correctAnswer = number1 + number2;
    } else if (operator === "-") {
        correctAnswer = number1 - number2;
    } else if (operator === "*") {
        correctAnswer = number1 * number2;
    } else if (operator === "/") {
        correctAnswer = number1 / number2;
    }
    //this one calculates the correct answer
    questionText.innerHTML = `Question ${askedQuestions + 1}: ${number1} ${operator} ${number2}`
    //when we answer we need another question
    askedQuestions++;

    startTimer()
}

//submit to check
submitBtn.addEventListener("click", function () {
    if (gameOn == false) return
    let userAnswer = +userInput.value
    if (userInput.value === "") {
        alert("please enter a number")
        return
    }
    if (userAnswer === correctAnswer) {
        score++;
        scoreElement.innerHTML = score
        messageElement.innerHTML = "Correct!"
        setTimeout(() => messageElement.innerHTML = "", 500)
        messageElement.style.color = "green"
    }

    else {
        wrongAnswers++
        wrongElement.innerHTML = `${wrongAnswers}/5`;
        messageElement.innerHTML = "Wrong!"
        setTimeout(() => messageElement.innerHTML = "", 500)
        messageElement.style.color = "red"
    }
    userInput.value = "";
    setTimeout(generateQuestion, 500)
})

function endGame() {
    clearInterval(countDown);
    backgroundMusic.pause();
    gameElements.style.display = "none"
    gameOverDiv.style.display = "block";
    finalScoreElement.innerHTML = `Final Score: ${score}/${totalQuestions}`;

}

// document.addEventListener("keydown",(e)=>{
//     if(e.key=="Enter"){
//         if (gameOn == false) return
//         let userAnswer = +userInput.value
//         if (userInput.value === "") {
//             alert("please enter a number")
//             return
//         }
//         if (userAnswer === correctAnswer) {
//             score++;
//             scoreElement.innerHTML = score
//             messageElement.innerHTML = "Correct!"
//             setTimeout(() => messageElement.innerHTML = "", 500)
//             messageElement.style.color = "green"

//         }

//         else {
//             wrongAnswers++
//             wrongElement.innerHTML = `${wrongAnswers}/5`;
//             messageElement.innerHTML = "Wrong!"
//             setTimeout(() => messageElement.innerHTML = "", 500)
//             messageElement.style.color = "red"
//         }
//         userInput.value = "";
//         setTimeout(() => generateQuestion(), 500)
//     }
// })

// restartBtn.addEventListener("click", function(){
//     gameOn = false;
//     document.querySelector("#gameOverDiv").style.display = "none";
//     setupDiv.style.display = "block";
// }) 
