
//Declare all element to be used

//Introduction of the game
const intro = document.getElementById('intro');

//Start button and timer element
const startBtn = document.getElementById('btn-start');
const timerElement = document.getElementById('timer');

// Quiz element
const quizEl = document.getElementById('quiz-container');
const quWrapEl = document.getElementById('quiz-wrapper');
const questionEl = document.getElementById('question');

// Score element
const highscore = document.getElementById('highscore');
const finalScoreEl = document.getElementById('finalscore');
const timeEl = document.getElementById('timeElement');

// Reselt element to dispaly if corrent or wrong
const result = document.getElementById('result');

// Initial and score details input area
const inputText = document.getElementById('input-text');
const intialSection = document.getElementById('form-initial');
const intitialInput = document.getElementById('initial');
const submitBtn = document.querySelector('#btn-initial');

// Quiz choice elements
const choiceA = document.getElementById('choiceA');
const choiceB = document.getElementById('choiceB');
const choiceC = document.getElementById('choiceC');
const choiceD = document.getElementById('choiceD');

// Back button
const btnBack = document.querySelector('.goback-btn');


// Declaration of an array of Object questions and answers
let questions = [
    {
        question: 'What does HTML stands for?', 
        choiceA: 'Hypertext Markup Language', choiceB: 'Hypertext Main Language', choiceC: 'Hyperlink Markup Language', choiceD: 'All the above',
        correct: 'A'
    },

    {
        question: 'Question: What does CSS stands for?',
        choiceA: 'Customer Service Salaries', choiceB: 'Cascading Style Sheets', choiceC: 'Cascade Style Sheets', choiceD: 'Cascading Sheets Style',
        correct: 'B'
    },

    {
        question: 'Which one is not a CSS margin properties',
        choiceA: 'margin-top', choiceB: 'margin', choiceC: 'margin-right', choiceD: 'margin.left',
        correct: 'D'
    },

    {
        question: 'JavaScript strings are used for ____',
        choiceA: 'arrays', choiceB: 'storing and manipulating text',choiceC: 'sorting data', choiceD: 'HTML elements',
        correct: 'B'
    },

    {
        question: 'Math.random() returns a random number between',
        choiceA: '0 and 1', choiceB: '0 and 10', choiceC: '3 and 5', choiceD: '100 and 1000',
        correct: 'A'
    },

    {
        question: 'Which CSS property defines the background color for an HTML element?',
        choiceA: 'backgroundColor', choiceB: 'foreground-color', choiceC: 'color', choiceD: 'background-color',
        correct: 'D'
    },

    {
        question: 'How do you write "Hello World" in an alert box?',
        choiceA: 'alertBox("Alert!")', choiceB: 'msgBox("Alert!")', choiceC: 'alert("Alert!")', choiceD: 'println("Alert!")',
        correct: 'C'
    },

    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        choiceA: 'Math.rnd(7.25)', choiceB: 'round(7.25)', choiceC: 'rnd(7.25)', choiceD: 'Math.round(7.25)',
        correct: 'D'
    },

    {
        question: 'Which of the following is correct?',
        choiceA: 'jQuery is a Java library', choiceB: 'jQuery is a C# library', choiceC: 'jQuery is a JavaScript library', choiceD: 'jQuery is a Python library',
        correct: 'C'
    }

];

// The starting point of Questions array
let currentQuestion = 0;

// Score count
let score = 0;

/*Start button. When clicked, intro, start button, score are set to none
  Quiz are diplayed and timer starts
*/
startBtn.addEventListener('click', function(){
    startBtn.style.display = "none";
    highscore.style.display= "none";
    intro.style.display = "none";
    quizEl.style.display = "flex";
    timeEl.style.display = "flex";

    showQuestion();
    startTimer();
});

//setting an style attribute for question
question.setAttribute("style", "font-size:20px; font-weight: 700");

// Show questions and choices
function showQuestion(){
    question.textContent = questions[currentQuestion].question;
    choiceA.textContent= questions[currentQuestion].choiceA;
    choiceB.textContent= questions[currentQuestion].choiceB;
    choiceC.textContent= questions[currentQuestion].choiceC;
    choiceD.textContent= questions[currentQuestion].choiceD;
}

// function for each choices to be applied to a click event
function optionA(){checkAnswer('A')}
function optionB(){checkAnswer('B')}
function optionC(){checkAnswer('C')}
function optionD(){checkAnswer('D')}

// Click even on each choices
choiceA.addEventListener('click', optionA);
choiceB.addEventListener('click', optionB);
choiceC.addEventListener('click', optionC);
choiceD.addEventListener('click', optionD);

// function to check for the correct answers
function checkAnswer(correct){
    if(questions[currentQuestion].correct == correct){
        score++;
       isCorrect();
       finalScoreEl.textContent = `${score} out of ${questions.length} questions`;
    }else {
        isWrong();
    }

    currentQuestion ++;

    if (currentQuestion < questions.length){    
        showQuestion();
    }
    else{
        clearInterval(timer);
    }
}

// function if answer is correct to be displayed
function isCorrect(){
    result.textContent ="Answer is correct!";
    result.setAttribute('style', 'color:lightgreen; font-weight: bold;')
    //console.log(a);
}

// function if answer is wrong to be dispalyed
function isWrong(){
    result.textContent = "Answer is not correct!"
    let wrong = result;
    wrong.setAttribute('style', 'color:red; font-weight:bold;')
    timerCount -= 5;
    
    if (timerCount <= 0){
       clearInterval(timer);
       timerCount = 0;
    }
}

// Set timer to 60 seconds
let timerCount = 60;

// function to start timer
function startTimer() {
  // Sets timer
    let timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount + 's';

    // Tests if time has run out
    if (timerCount <= 0 || currentQuestion == questions.length) {
      // Clears interval
        clearInterval(timer);
        quizEl.style.display = "none";
        highscore.style.display= "flex";
        btnBack.style.display = "block";
        intialSection.style.display = "flex";
        inputText.style.display = "none";
    }
    
  }, 1000);
}

//function to record user initial and score to be displayed
function showInitial(event){
    event.preventDefault();

    let textInput = intitialInput.value;
    
    // if no input from user, an alert is displayed
    if(!textInput || textInput === ''){
        alert('Please enter an initial before continuing');
    }else{

    let message = `${textInput.toUpperCase()} has scored ${score} out of ${questions.length} questions`;

    inputText.value = message;

    inputText.style.display = "block";
    intitialInput.style.display = "none";
    submitBtn.style.display = "none";
    highscore.style.display = "none";
    timeEl.style.display = "none";
    timerElement.style.display = "none";
    }
}

// Submit button after user initial is entered
submitBtn.addEventListener('click', showInitial);

// function when game is over
function gameover(){
    if(timerCount == 0){
        quizEl.style.display = "none";
        highscore.style.display= "flex";
        btnBack.style.display = "block";
        intialSection.style.display = "flex";
    }
}

// function to reset game
function resetTimer(){
    timerElement.innerHTML = 0;
    quizEl.style.display = "none";
    highscore.style.display= "flex";
}

// back button function to return to landing page
btnBack.addEventListener('click', function(){

    window.location.reload();
});
    
