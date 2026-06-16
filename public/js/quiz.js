let questions = [];
let currentQuestion = 0;
let score = 0;

let timeLeft = 30;
let timer;

const subject = localStorage.getItem("selectedSubject");

// LOGIN CHECK
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

// SUBJECT TITLE
document.getElementById("subjectTitle").textContent =
subject || "Quiz";

// LOAD QUESTIONS
fetch("public/question.json")
.then(response => response.json())
.then(data => {

    questions = data[subject] || [];

    // Shuffle questions
    questions.sort(() => Math.random() - 0.5);

    if (questions.length === 0) {
        alert("No questions found for this subject.");
        window.location.href = "index.html";
        return;
    }

    loadQuestion();

})
.catch(error => {
    console.error(error);
    alert("Unable to load questions.");
});

// TOTAL QUIZ TIME (5 minutes)
let timeLeft = 300;
let timer;

function startTimer() {

    clearInterval(timer);

    timer = setInterval(() => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        document.getElementById("timer").textContent =
            `${minutes}:${seconds.toString().padStart(2, "0")}`;

        timeLeft--;

        if (timeLeft < 0) {

            clearInterval(timer);

            // Auto-submit quiz
            localStorage.setItem("quizScore", score);
            localStorage.setItem("totalQuestions", questions.length);

            window.location.href = "result.html";
        }

    }, 1000);
}

// LOAD QUESTION
function loadQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("questionCounter").textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("questionText").textContent = q.question;

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    document.getElementById("feedback").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

    // Shuffle options
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {

        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;

        btn.onclick = () => checkAnswer(option, q.answer, q.explanation);

        optionsContainer.appendChild(btn);
    });

    updateProgress();
    startTimer();
}

// CHECK ANSWER
function checkAnswer(selected, correct, explanation) {

    clearInterval(timer);

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === correct) {
            btn.classList.add("correct");
        }
    });

    const feedback = document.getElementById("feedback");

    if (selected === correct) {

        score++;

        feedback.innerHTML = `
            <div class="correct-msg">
                ✅ Correct
                <p>${explanation}</p>
            </div>
        `;

    } else {

        buttons.forEach(btn => {
            if (btn.textContent === selected) {
                btn.classList.add("wrong");
            }
        });

        feedback.innerHTML = `
            <div class="wrong-msg">
                ❌ Incorrect
                <p>Correct Answer: <strong>${correct}</strong></p>
                <p>${explanation}</p>
            </div>
        `;
    }

    document.getElementById("nextBtn").style.display = "block";
}

// NEXT QUESTION + SAVE RESULT
document.getElementById("nextBtn").addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {

        // SAVE BASIC DATA
        localStorage.setItem("quizScore", score);
        localStorage.setItem("totalQuestions", questions.length);
        localStorage.setItem(subject + "_completed", "true");

        // BEST SCORE
        const previousBest =
            Number(localStorage.getItem(subject + "_best")) || 0;

        if (score > previousBest) {
            localStorage.setItem(subject + "_best", score);
        }

        // SAVE TO LEADERBOARD
        const username = localStorage.getItem("username") || "Guest";

        const percentage = Math.round((score / questions.length) * 100);

        let leaderboard =
            JSON.parse(localStorage.getItem("leaderboard")) || [];

        leaderboard.push({
            name: username,
            subject: subject,
            score: score,
            total: questions.length,
            percentage: percentage,
            date: new Date().toLocaleDateString()
        });

        leaderboard.sort((a, b) => b.percentage - a.percentage);

        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        window.location.href = "result.html";
    }
});
document.getElementById("submitBtn").addEventListener("click", () => {

    // SAVE BASIC DATA
    localStorage.setItem("quizScore", score);
    localStorage.setItem("totalQuestions", questions.length);
    localStorage.setItem(subject + "_completed", "true");

    // BEST SCORE
    const previousBest =
        Number(localStorage.getItem(subject + "_best")) || 0;

    if (score > previousBest) {
        localStorage.setItem(subject + "_best", score);
    }

    // SAVE TO LEADERBOARD
    const username = localStorage.getItem("username") || "Guest";

    const percentage = Math.round((score / questions.length) * 100);

    let leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({
        name: username,
        subject: subject,
        score: score,
        total: questions.length,
        percentage: percentage,
        date: new Date().toLocaleDateString()
    });

    leaderboard.sort((a, b) => b.percentage - a.percentage);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // GO TO RESULT PAGE
    window.location.href = "result.html";
});

// PROGRESS BAR
function updateProgress() {

    const percent =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        percent + "%";
}