const questions = [
    {
        question: "Kapan Indonesia merdeka?",
        options: ["17 Agustus 1945", "17 Agustus 1944", "17 Agustus 1946", "18 Agustus 1945"],
        correct: 0
    },
    {
        question: "Siapakah proklamator kemerdekaan Indonesia?",
        options: ["Soekarno-Hatta", "Tan Malaka", "Soeharto", "Bung Tomo"],
        correct: 0
    },
    {
        question: "Dimana lokasi Konferensi Asia Afrika pertama kali diadakan?",
        options: ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"],
        correct: 1
    },
    {
        question: "Apa nama peristiwa yang terjadi pada 30 September 1965?",
        options: ["Supersemar", "G30S/PKI", "Rengasdengklok", "Proklamasi"],
        correct: 1
    },
    {
        question: "Kerajaan Hindu-Buddha pertama di Indonesia adalah...",
        options: ["Majapahit", "Sriwijaya", "Kutai", "Mataram"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startQuiz() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
    startTimer();
}

function startTimer() {
    timeLeft = 30;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeLeft;
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    clearInterval(timer);
    startTimer();

    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('result').textContent = '';
    document.getElementById('score').textContent = score;
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = questions[currentQuestion].correct;
    const resultDiv = document.getElementById('result');
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correct) {
            btn.classList.add('correct');
        } else if (index === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });

    if (selected === correct) {
        score += 100;
        score += timeLeft; // Bonus points for remaining time
        resultDiv.textContent = 'Benar!';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.textContent = 'Salah! Jawaban yang benar adalah: ' + 
            questions[currentQuestion].options[correct];
        resultDiv.style.color = 'red';
    }

    document.getElementById('score').textContent = score;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showResult() {
    clearInterval(timer);
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h2>Kuis Selesai!</h2>
        <p>Skor Akhir Anda: ${score}</p>
        <button class="btn-main" onclick="location.reload()">Main Lagi</button>
    `;
}