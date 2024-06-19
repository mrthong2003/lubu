document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.getElementById('audio-player');
    var answerDiv = document.getElementById('answer');
    var userInput = document.getElementById('user-answer');
    var submitButton = document.getElementById('submit-answer');
    var playAgainButton = document.getElementById('play-again');
    var homeButton = document.querySelector('.home-btn');
    var showAnswerButton = document.getElementById('show-answer');
    var chapterSelection = document.getElementById('chapter-selection');
    var chapterButtons = document.getElementById('chapter-buttons');
    var questionContainer = document.getElementById('question-container');

    let currentChapterQuestions = [];

    function loadJSON(file, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', file, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(null);
    }

    function displayChapters(questions) {
        chapterButtons.innerHTML = '';
        questions.forEach(chapter => {
            var button = document.createElement('button');
            button.innerText = 'Chương ' + chapter.chapter;
            button.addEventListener('click', function() {
                currentChapterQuestions = chapter.questions;
                chapterSelection.style.display = 'none';
                questionContainer.style.display = 'block';
                askQuestion(currentChapterQuestions);
            });
            chapterButtons.appendChild(button);
        });
    }

    function displayAdvancedChapters(questions) {
        chapterButtons.innerHTML = '';
        questions.forEach(chapter => {
            var button = document.createElement('button');
            button.innerText = chapter.chapter;
            button.addEventListener('click', function() {
                currentChapterQuestions = chapter.words.map(word => {
                    return {
                        audioPath: word.audioPath,
                        answer: word.word
                    };
                });
                chapterSelection.style.display = 'none';
                questionContainer.style.display = 'block';
                askQuestion(currentChapterQuestions);
            });
            chapterButtons.appendChild(button);
        });
    }

    document.querySelector('.check-speak-btn').addEventListener('click', function() {
        loadJSON('speakingQuestions.json', function(data) {
            displayChapters(data);
            chapterSelection.style.display = 'block';
        });
    });

    document.querySelector('.check-write-btn').addEventListener('click', function() {
        loadJSON('writingQuestions.json', function(data) {
            displayChapters(data);
            chapterSelection.style.display = 'block';
        });
    });

    document.querySelector('.check-speak-advanced-btn').addEventListener('click', function() {
        loadJSON('speakingQuestions2.json', function(data) {
            displayAdvancedChapters(data);
            chapterSelection.style.display = 'block';
        });
    });

    homeButton.addEventListener('click', function() {
        location.reload(); // Reload lại trang web để reset
    });

    showAnswerButton.addEventListener('click', function() {
        var currentQuestion = currentChapterQuestions.find(q => {
            if (answerDiv.innerText.includes('.mp3')) {
                return q.audioPath === answerDiv.innerText.split(':')[1].trim();
            } else {
                return q.question === answerDiv.innerText.split(':')[1].trim();
            }
        });

        if (currentQuestion) {
            alert('Đáp án: ' + currentQuestion.answer);
        }
    });

    function askQuestion(questions) {
        var availableQuestions = questions.filter(q => !q.asked);

        if (availableQuestions.length === 0) {
            answerDiv.innerText = 'Chúc mừng! Bạn đã hoàn thành tất cả câu hỏi.';
            userInput.style.display = 'none';
            submitButton.style.display = 'none';
            playAgainButton.style.display = 'none';
            showAnswerButton.style.display = 'none';
            return;
        }

        var randomIndex = Math.floor(Math.random() * availableQuestions.length);
        var question = availableQuestions[randomIndex];

        if (question.audioPath) {
            audioPlayer.src = question.audioPath;
            audioPlayer.play();
            answerDiv.innerText = 'Câu hỏi: ' + question.audioPath;
        } else if (question.question) {
            answerDiv.innerText = 'Câu hỏi: ' + question.question;
        }

        answerDiv.style.display = 'block';
        userInput.style.display = 'block';
        submitButton.style.display = 'block';
        playAgainButton.style.display = 'block';
        showAnswerButton.style.display = 'block';

        question.asked = true;
    }

    submitButton.addEventListener('click', function() {
        checkAnswer();
    });

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    playAgainButton.addEventListener('click', function() {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });

    function checkAnswer() {
        var userAnswer = userInput.value;
        var currentQuestion = currentChapterQuestions.find(q => {
            if (answerDiv.innerText.includes('.mp3')) {
                return q.audioPath === answerDiv.innerText.split(':')[1].trim();
            } else {
                return q.question === answerDiv.innerText.split(':')[1].trim();
            }
        });

        if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            alert('Chính xác!');
            userInput.value = '';

            // Chuyển sang câu hỏi tiếp theo
            askQuestion(currentChapterQuestions);
        } else {
            alert('Sai! Vui lòng nhập lại.');
        }
    }
});
