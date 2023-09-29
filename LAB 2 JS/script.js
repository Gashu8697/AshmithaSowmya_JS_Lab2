
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

function Question(text, options, answer) {
    this.questionText = text;
    this.options = options;
    this.answer = answer;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (ans) {
    if (this.getQuestionByIndex().answer == ans) {
        this.score++;
    }
    this.questionIndex++;

}
Quiz.prototype.isEnded = function () {
    return this.questionIndex == this.questions.length;
}


let questions = [
     new Question('What will be the output of the below code-  console.log(typeof(NaN));',
     ["Object", "Number", "String", "Null"], 'Number'),

    
     
     new Question(' The "function" and " var" are known as:', 
     ['Keywords', 'Data types', 'Declaration statements', 'Prototypes '], 'Declaration statements'),



     new Question('Which is not a JavaScript Framework', 
     ['Python', 'JQuery', 'Django', 'NodeJS'], 'Django'),



     new Question('How can a datatype be declared to be a constant type?', 
     ['const', 'var', 'let', 'constant'], 'const'),


     
     new Question('JavaScript is a', 
     ['Language', 'Programming Language', 'Development', 'ALL'], 'Programming Language')
];

let quiz = new Quiz(questions);

/* Load Questions on HTML */

function displayQuestions() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionByIndex().questionText;
        let choices = quiz.getQuestionByIndex().options;
        for (let i = 0; i < choices.length; i++) {
            var elem = document.getElementById("choice" + i);
            elem.innerText = choices[i];
            handleClickOnButton("btn" + i, choices[i]);
        }

    }


}
/**based on clicking the choice verifying answer, updating the score accordingly
 * update the question index
 * check quiz is ended, if not go to next question
 * show the result
 */
function handleClickOnButton(id, choice) {
    let buttonElement = document.getElementById(id)
    buttonElement.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        displayQuestions();
    }


    /**
     * showing the progress of questions as we navigating through the questions
     */
    showProgres();

}
displayQuestions();

function showProgres() {
    let currentIndex = quiz.questionIndex + 1;
    let questionProgressElement = document.getElementById("progress");
    questionProgressElement.innerText = `Question ${currentIndex} of ${quiz.questions.length}`;
}

/**
 * Calculating the score and percentage
 * navigating to the result page after last question 
 * resultpage consists of score and percentage
 */

function showScores() {
    let result = `<h1>RESULT</h1><h2 id="score">Your Score ${quiz.score}.<br><br>Marks Percetage is ${(quiz.score / questions.length) * 100}%</h2>`;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = result;

}