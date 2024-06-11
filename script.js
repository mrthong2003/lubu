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
        { audioPath: 'Sound 07.mp3', answer: '7', asked: false }
    ];

    var writingQuestions = [
        { question: '단위 명사', answer: 'danh từ đơn vị', asked: false },
        { question: '개', answer: 'cái', asked: false },
        { question: '명 / 사람', answer: 'người', asked: false },
        { question: '마리', answer: 'con', asked: false },
        { question: '잔', answer: 'ly,chén', asked: false },
        { question: '대', answer: 'chiếc', asked: false },
        { question: '병', answer: 'bình', asked: false },
        { question: '켤레', answer: 'đôi', asked: false },
        { question: '권', answer: 'quyển', asked: false },
        { question: '장', answer: 'trang', asked: false },
        { question: '물건 사기', answer: 'mua sắm', asked: false },
        { question: '과일', answer: 'hoa quả', asked: false },
        { question: '채소', answer: 'rau', asked: false },
        { question: '음료수', answer: 'thức uống', asked: false },
        { question: '옷', answer: 'quần áo', asked: false },
        { question: '바지', answer: 'quần', asked: false },
        { question: '치마', answer: 'váy', asked: false },
        { question: '구두', answer: 'giày', asked: false },
        { question: '모자', answer: 'mũ', asked: false },
        { question: '손님', answer: 'khách', asked: false },
        { question: '주인', answer: 'chủ cửa hàng', asked: false },
        { question: '화폐', answer: 'tiền tệ', asked: false },
        { question: '과자', answer: 'bánh quy', asked: false },
        { question: '귤', answer: 'quả quýt', asked: false },
        { question: '디자인', answer: 'thiết kế', asked: false },
        { question: '마트', answer: 'siêu thị nhỏ', asked: false },
        { question: '망고', answer: 'xoài', asked: false },
        { question: '문구점', answer: 'cửa hàng văn phòng phẩm', asked: false },
        { question: '생선', answer: 'cá', asked: false },
        { question: '서점', answer: 'hiệu sách', asked: false },
        { question: '세일', answer: 'hạ giá', asked: false },
        { question: '소설책', answer: 'sách tiểu thuyết', asked: false },
        { question: '수박', answer: 'dưa hấu', asked: false },
        { question: '전자상가', answer: 'khu bán hàng điện tử', asked: false },
        { question: '주스', answer: 'nước hoa quả, sinh tố', asked: false },
        { question: '카메라', answer: 'máy ảnh', asked: false },
        { question: '티셔츠', answer: 'áo sơ mi', asked: false },
        { question: '필통', answer: 'hộp bút', asked: false },
        { question: '싸다', answer: 'rẻ', asked: false },
        { question: '비싸다', answer: 'đắt', asked: false },
        
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
