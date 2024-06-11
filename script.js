document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.getElementById('audio-player');
    var answerDiv = document.getElementById('answer');
    var userInput = document.getElementById('user-answer');
    var submitButton = document.getElementById('submit-answer');
    var playAgainButton = document.getElementById('play-again');
    var homeButton = document.querySelector('.home-btn');

    var speakingQuestions = [
        { audioPath: 'Sound 01.mp3', answer: '1', asked: false },
        { audioPath: 'Sound 02.mp3', answer: '2', asked: false },
        { audioPath: 'Sound 04.mp3', answer: '4', asked: false },
        { audioPath: 'Sound 05.mp3', answer: '5', asked: false },
        { audioPath: 'Sound 06.mp3', answer: '6', asked: false },
        { audioPath: 'Sound 07.mp3', answer: '7', asked: false },
    ];

    var writingQuestions = [
        { question: 'Leo núi', answer: '등산하다', asked: false },
        { question: 'Xem phim', answer: '영화를 보다', asked: false },
        { question: 'Tập thể dục', answer: '운동하다', asked: false },
        // Thêm các câu hỏi khác ở đây
    ];

    document.querySelector('.check-speak-btn').addEventListener('click', function() {
        askQuestion(speakingQuestions);
    });

    document.querySelector('.check-write-btn').addEventListener('click', function() {
        askQuestion(writingQuestions);
    });

    homeButton.addEventListener('click', function() {
        location.reload(); // Reload lại trang web để reset
    });

    function askQuestion(questions) {
        var availableQuestions = questions.filter(q => !q.asked);

        if (availableQuestions.length === 0) {
            answerDiv.innerText = 'Chúc mừng! Bạn đã hoàn thành tất cả câu hỏi.';
            userInput.style.display = 'none';
            submitButton.style.display = 'none';
            playAgainButton.style.display = 'none';
            return;
        }

        var randomIndex = Math.floor(Math.random() * availableQuestions.length);
        var question = availableQuestions[randomIndex];

        if (questions === speakingQuestions) {
            audioPlayer.src = question.audioPath;
            audioPlayer.play();
            answerDiv.innerText = 'Câu hỏi: ' + question.audioPath;
        } else if (questions === writingQuestions) {
            answerDiv.innerText = 'Câu hỏi: ' + question.question;
        }

        answerDiv.style.display = 'block';
        userInput.style.display = 'block';
        submitButton.style.display = 'block';
        playAgainButton.style.display = 'block';

        question.asked = true;
    }

    submitButton.addEventListener('click', function() {
        var userAnswer = userInput.value;
        var currentQuestion;

        if (answerDiv.innerText.includes('.mp3')) {
            currentQuestion = speakingQuestions.find(q => q.audioPath === answerDiv.innerText.split(':')[1].trim());
        } else {
            currentQuestion = writingQuestions.find(q => q.question === answerDiv.innerText.split(':')[1].trim());
        }

        if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            alert('Chính xác!');
            userInput.value = '';

            // Chuyển sang câu hỏi tiếp theo
            if (answerDiv.innerText.includes('.mp3')) {
                askQuestion(speakingQuestions);
            } else {
                askQuestion(writingQuestions);
            }
        } else {
            alert('Sai! Vui lòng nhập lại.');
        }
    });

    playAgainButton.addEventListener('click', function() {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    });
});
