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
        { audioPath: '16.mp3', answer: '공책은 싸요. 책은 비싸요', asked: false },
        { audioPath: '17.mp3', answer: '흐엉 씨는 키가 커요', asked: false },
        { audioPath: '18.mp3', answer: '화 씨는 키가 작아요', asked: false },
        { audioPath: '19.mp3', answer: '과일은 맛있어요. 과자는 맛없어요 ', asked: false },
        { audioPath: '20.mp3', answer: '교실에 책상은 있어요. 시계는 없어요 ', asked: false },
        { audioPath: '21.mp3', answer: '아주머니, 이 사과 얼마예요', asked: false },
        { audioPath: '22.mp3', answer: '한 개에 1,000원이에요', asked: false },
        { audioPath: '23.mp3', answer: '생선은 얼마예요', asked: false },
        { audioPath: '24.mp3', answer: '세 마리에 5,000원이에요', asked: false },
        { audioPath: '25.mp3', answer: '사과 두 개하고 생선 세 마리 주세요', asked: false },
        { audioPath: '26.mp3', answer: '어디에 가요', asked: false },
        { audioPath: '27.mp3', answer: '저는 시장에 가요', asked: false },
        { audioPath: '28.mp3', answer: '그래요? 저는 채소를 사고 싶어요', asked: false },
        { audioPath: '29.mp3', answer: '그럼 같이 가요', asked: false },
        { audioPath: '30.mp3', answer: '공책을 사고 싶어요', asked: false },
        { audioPath: '31.mp3', answer: '이 공책은 어때요', asked: false },
        { audioPath: '32.mp3', answer: '좋아요. 필봉은 어디에 있어요', asked: false },
        { audioPath: '33.mp3', answer: '저기 있습니다', asked: false },
        { audioPath: '34.mp3', answer: '저 필통이 예뻐요', asked: false },
        { audioPath: '35.mp3', answer: '공책 세 권하고 필통 한 개 주세요', asked: false },
       
    ];

    var writingQuestions = [
        { question: 'danh từ đơn vị', answer: '단위 명사', asked: false },
        { question: 'cái', answer: '개', asked: false },
        { question: 'người', answer: '명 / 사람', asked: false },
        { question: 'con', answer: '마리', asked: false },
        { question: 'ly,chén', answer: '잔', asked: false },
        { question: 'chiếc', answer: '대', asked: false },
        { question: 'bình', answer: '병', asked: false },
        { question: 'đôi', answer: '켤레', asked: false },
        { question: 'quyển', answer: '권', asked: false },
        { question: 'trang', answer: '장', asked: false },
        { question: 'mua sắm', answer: '물건 사기', asked: false },
        { question: 'hoa quả', answer: '과일', asked: false },
        { question: 'rau', answer: '채소', asked: false },
        { question: 'thức uống', answer: '음료수', asked: false },
        { question: 'quần áo', answer: '옷', asked: false },
        { question: 'quần', answer: '바지', asked: false },
        { question: 'váy', answer: '치마', asked: false },
        { question: 'giày', answer: '구두', asked: false },
        { question: 'mũ', answer: '모자', asked: false },
        { question: 'khách', answer: '손님', asked: false },
        { question: 'chủ cửa hàng', answer: '주인', asked: false },
        { question: 'tiền tệ', answer: '화폐', asked: false },
        { question: 'bánh quy', answer: '과자', asked: false },
        { question: 'quả quýt', answer: '귤', asked: false },
        { question: 'thiết kế', answer: '디자인', asked: false },
        { question: 'siêu thị nhỏ', answer: '마트', asked: false },
        { question: 'xoài', answer: '망고', asked: false },
        { question: 'cửa hàng văn phòng phẩm', answer: '문구점', asked: false },
        { question: 'cá', answer: '생선', asked: false },
        { question: 'hiệu sách', answer: '서점', asked: false },
        { question: 'hạ giá', answer: '세일', asked: false },
        { question: 'sách tiểu thuyết', answer: '소설책', asked: false },
        { question: 'dưa hấu', answer: '수박', asked: false },
        { question: 'khu bán hàng điện tử', answer: '전자상가', asked: false },
        { question: 'sinh tố', answer: '주스', asked: false },
        { question: 'máy ảnh', answer: '카메라', asked: false },
        { question: 'áo sơ mi', answer: '티셔츠', asked: false },
        { question: 'hộp bút', answer: '필통', asked: false },
        { question: 'rẻ', answer: '싸다', asked: false },
        { question: 'đắt', answer: '비싸다', asked: false },
        
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
