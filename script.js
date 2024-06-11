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
        { audioPath: 'Sound 06.mp3', answer: '6', asked: false }
        { audioPath: 'Sound 07.mp3', answer: '7', asked: false }
    ];

    var writingQuestions = [
        { question: 'Leo núi', answer: '등산하다', asked: false },
        { question: 'Xem phim', answer: '영화를 보다', asked: false },
        { question: 'Tập thể dục', answer: '운동하다', asked: false },
        { question: 'Du lịch', answer: '여행하다', asked: false },
        { question: 'Mua sắm', answer: '쇼핑하다', asked: false },
        { question: 'Bơi', answer: '수영하다', asked: false },
        { question: 'Nghỉ', answer: '쉬다', asked: false },
        { question: 'Ăn nhà hàng, ăn ngoài', answer: '외식하다', asked: false },
        { question: 'Gặp bạn', answer: '친구를 만나다', asked: false },
        { question: 'Đi dạo', answer: '산책하다', asked: false },
        { question: 'Đi dã ngoại', answer: '소풍가다', asked: false },
        { question: 'Đọc sách', answer: '책을 읽다', asked: false },
        { question: 'Tỉnh lược', answer: '생략', asked: false },
        { question: 'Gộp lại', answer: '축약', asked: false },
        { question: 'Và (cùng nhau)', answer: '하고', asked: false },
        { question: 'Lại, nữa', answer: '또', asked: false },
        { question: 'Ca sĩ', answer: '가수', asked: false },
        { question: 'Quả dâu', answer: '딸기', asked: false },
        { question: 'Ghét', answer: '싫어하다', asked: false },
        { question: 'Món sườn nướng', answer: '갈비', asked: false },
        { question: 'Mì gói', answer: '라면', asked: false },
        { question: 'Phim hành động', answer: '액션 영화', asked: false },
        { question: 'Con chó', answer: '개', asked: false },
        { question: 'Bóng chày', answer: '야구', asked: false },
        { question: 'Con mèo', answer: '고양이', asked: false },
        { question: 'Biển', answer: '바다', asked: false },
        { question: 'Nấu ăn', answer: '요리하다', asked: false },
        { question: 'Môn đánh gôn', answer: '골프', asked: false },
        { question: 'Sớm', answer: '일찍', asked: false },
        { question: 'Phim kinh dị', answer: '공포 영화', asked: false },
        { question: 'Thuyền, bụng, quả lê', answer: '배', asked: false },
        { question: 'Bóng đá', answer: '축구', asked: false },
        { question: 'Hoa quả', answer: '과일', asked: false },
        { question: 'Bóng chuyền', answer: '배구', asked: false },
        { question: 'Nhảy múa', answer: '춤을 추다', asked: false },
        { question: 'Món kimbap (cơm cuộn lá kim)', answer: '김밥', asked: false },
        { question: 'Trải qua', answer: '보내다', asked: false },
        { question: 'Đánh, chơi (cầu)', answer: '치다', asked: false },
        { question: 'Cây', answer: '나무', asked: false },
        { question: 'Món thịt nướng', answer: '불고기', asked: false },
        { question: 'Câu cá', answer: '낚시', asked: false },
        { question: 'Cơm trộn', answer: '비빔밥', asked: false },
        { question: 'Quần vợt', answer: '테니스', asked: false },
        { question: 'Bóng rổ', answer: '농구', asked: false },
        { question: 'Giặt đồ', answer: '빨래하다', asked: false },
        { question: 'Quả nho', answer: '포도', asked: false },
        { question: 'Động vật', answer: '동물', asked: false },
        { question: 'Chim', answer: '새', asked: false },
        { question: 'Phim truyện, phim truyền hình', answer: '드라마', asked: false },
        { question: 'Quà tặng', answer: '선물', asked: false },
        
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
