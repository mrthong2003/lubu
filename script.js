document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.getElementById('audio-player');
    var answerDiv = document.getElementById('answer');
    var userInput = document.getElementById('user-answer');
    var submitButton = document.getElementById('submit-answer');
    var playAgainButton = document.getElementById('play-again');
    var homeButton = document.querySelector('.home-btn');

    var speakingQuestions = [
        { audioPath: '1.mp3', answer: '생선 두 마리 주세요', asked: false },
        { audioPath: '2.mp3', answer: '아주머니, 주스 한 병 주세요', asked: false },
        { audioPath: '3.mp3', answer: '이 책 세 권주세요', asked: false },
        { audioPath: '4.mp3', answer: '바지를 사고 싶어요', asked: false },
        { audioPath: '5.mp3', answer: '이 바지는 어때요', asked: false },
        { audioPath: '6.mp3', answer: '이 장미 어때요', asked: false },
        { audioPath: '7.mp3', answer: '아, 예뻐요', asked: false },
        { audioPath: '8.mp3', answer: '이 책 한 권주세요', asked: false },
        { audioPath: '9.mp3', answer: '네, 여기 있습니다', asked: false },
        { audioPath: '10.mp3', answer: '아주머니, 이 사과 얼마예요', asked: false },
        { audioPath: '11.mp3', answer: '한 개에 1,000원이에요', asked: false },
        { audioPath: '12.mp3', answer: '배는 얼마예요', asked: false },
        { audioPath: '13.mp3', answer: '한 개에 1,000원이에요', asked: false },
        { audioPath: '14.mp3', answer: '사과 두 개하고 배 한 개 주세요', asked: false },
        { audioPath: '15.mp3', answer: '네, 여기 있습니다', asked: false },
        { audioPath: '16.mp3', answer: '공책은 싸요', asked: false },
        { audioPath: '17.mp3', answer: '책은 비싸요', asked: false },
        { audioPath: '18.mp3', answer: '흐엉 씨는 키가 커요', asked: false },
        { audioPath: '19.mp3', answer: '화 씨는 키가 작아요', asked: false },
        { audioPath: '20.mp3', answer: '과일은 맛있어요', asked: false },
        { audioPath: '21.mp3', answer: '과자는 맛없어요', asked: false },
        { audioPath: '22.mp3', answer: '교실에 책상은 있어요', asked: false },
        { audioPath: '23.mp3', answer: '시계는 없어요', asked: false },
        { audioPath: '24.mp3', answer: '아주머니, 이 사과 얼마예요', asked: false },
        { audioPath: '25.mp3', answer: '한 개에 1,000원이에요', asked: false },
        { audioPath: '26.mp3', answer: '생선은 얼마예요', asked: false },
        { audioPath: '27.mp3', answer: '세 마리에 5,000원이에요', asked: false },
        { audioPath: '28.mp3', answer: '사과 두 개하고 생선 세 마리 주세요', asked: false },
        { audioPath: '29.mp3', answer: '어디에 가요', asked: false },
        { audioPath: '30.mp3', answer: '저는 시장에 가요', asked: false },
        { audioPath: '31.mp3', answer: '그래요? 저는 채소를 사고 싶어요', asked: false },
        { audioPath: '32.mp3', answer: '그럼 같이 가요', asked: false },
        { audioPath: '33.mp3', answer: '공책을 사고 싶어요', asked: false },
        { audioPath: '34.mp3', answer: '이 공책은 어때요', asked: false },
        { audioPath: '35.mp3', answer: '좋아요. 필봉은 어디에 있어요', asked: false },
        { audioPath: '36.mp3', answer: '저기 있습니다', asked: false },
        { audioPath: '37.mp3', answer: '저 필통이 예뻐요', asked: false },
        { audioPath: '38.mp3', answer: '공책 세 권하고 필통 한 개 주세요', asked: false }
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
        { question: '주스', answer: 'sinh tố', asked: false },
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
