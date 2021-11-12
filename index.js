let questionIndex = 0;
let score = 0;

function showQuestion(questionIndex) {
    $('#js-questions').html(`
    <h2 class="question js-question">${STORE.questions[questionIndex].question}</h2>
    <fieldset class="container js-container">
        <input type="radio" name="options" id="ans1" value="0" required>
            <label for="ans1">${STORE.questions[questionIndex].options[0]}</label>
            <br>
        <input type="radio" name="options" id="ans2" value="1">
            <label for="ans2">${STORE.questions[questionIndex].options[1]}</label>
            <br>
        <input type="radio" name="options" id="ans3" value="2">
            <label for="ans3">${STORE.questions[questionIndex].options[2]}</label>
            <br>
        <input type="radio" name="options" id="ans4" value="3">
            <label for="ans4">${STORE.questions[questionIndex].options[3]}</label>
    </fieldset>
    <p class="score">score: <span id="js-score">${score}</span></p>
    <p class="js-validation"></p>
    <div class="button-list">
        <p id="button"><button type="submit" for="js-questions" id="js-submit">Enviar</button></p>
        <p id="js-next-question"><button type="button" id="next-question">Próxima Questão</button></p>
    </div>`)
}

function updateQuestionNumber() {
    $('.js-questionNumber').text(questionIndex + 1);
}


function updateNextQuestion() {
    $('#js-next-question').on('click', '#next-question', function(event) {
        console.log(this);
        questionIndex++;
        console.log(questionIndex);       
        showQuestion(questionIndex);
        updateQuestionNumber();
    })
}

function updateScore() {
    $('#js-score').text(score);
}

function generateAnswerValidation() {
    $('#js-questions').on('submit', function(event) {
        event.preventDefault();
        let answerValidation = STORE.questions[questionIndex];
        let targetOption = $("input[name='options']:checked").val()
        if (answerValidation.answer == targetOption) {
           $('.js-validation').text('Está correto!');
           score++;
        }
        else {
            $('.js-validation').text(`Incorreto. A resposta certa é 
            ${answerValidation.options[answerValidation.answer]}`);
            console.log(answerValidation.options[answerValidation.answer])
        }
        updateNextQuestion();
        renderResults();
    });
}

function showResults() {
    $('body').html(`
    <header>
        <h1>Resultado</h1>
    </header>
    <main>
        <section>
            <h2 id="result-conditional"></h2>
                <p class="final-score">${score}/10</p>
        </section>  
        <button onclick="document.location = 'index.html'">Reiniciar Quiz</button>
        <aside class="final-aside">Com toda a seriedade, POR FAVOR, fique em casa, lave as mãos
        por pelo menos 20 segundos várias vezes ao dia, evite tocar
       seu rosto (mesmo que seja muito difícil), e podemos ser
       capaz de manter nossos entes queridos seguros.
        </aside> 
    </main>`)
}

function resultConditional() {
    $('#result-conditional').html(function() {
        if (score >= 7) {
            return (`Parabéns! Você passou.`)
        }
        else {
            return (`Infelizmente, você não alcançou um bom resultado. Pesquise mais sobre COVID-19 e refaça o teste.`)
        }
    })
}

function renderResults() {
    $('body').on('click', '#next-question', function(event) {
        if (questionIndex === STORE.questions.length) {
            showResults();
            resultConditional();
        }
        else {
            showQuestion();
        }
    });
}

function handleQuiz() {
    updateScore();
    updateQuestionNumber();
    generateAnswerValidation(questionIndex);
    showQuestion(questionIndex);
}

$(handleQuiz);
