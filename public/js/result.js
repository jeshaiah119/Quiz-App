// ======================
// GET RESULTS
// ======================

const score = Number(localStorage.getItem("quizScore") || 0);
const total = Number(localStorage.getItem("totalQuestions") || 1);
const subject = localStorage.getItem("selectedSubject") || "Quiz";

const percentage = Math.round((score / total) * 100);

// ======================
// DISPLAY RESULT
// ======================

document.getElementById("percentage").textContent = percentage + "%";
document.getElementById("subjectName").textContent = subject;
document.getElementById("scoreText").textContent = `${score} / ${total}`;

// ======================
// SAVE BEST SCORE
// ======================

const bestScoreKey = `best_${subject}`;
const previousBest = Number(localStorage.getItem(bestScoreKey) || 0);

if (percentage > previousBest) {
    localStorage.setItem(bestScoreKey, percentage);
}

// ======================
// UPDATE COMPLETED QUIZZES
// ======================

let completed = Number(localStorage.getItem("completedQuiz") || 0);
completed++;
localStorage.setItem("completedQuiz", completed);

// ======================
// PASS OR FAIL
// ======================

const status = document.getElementById("status");
const message = document.getElementById("message");

if (percentage >= 80) {
    status.textContent = "🌟 Excellent";
    message.textContent = "Outstanding performance! You have mastered this topic.";
} else if (percentage >= 60) {
    status.textContent = "✅ Passed";
    message.textContent = "Good job! Keep practicing to improve further.";
} else {
    status.textContent = "❌ Needs Improvement";
    message.textContent = "Review the explanations and try again.";
}

// ======================
// EXTRA MOTIVATION
// ======================

const motivation = document.getElementById("motivation");

if (motivation) {
    if (percentage >= 90) {
        motivation.textContent = "🏆 You are a QuizSphere Champion!";
    } else if (percentage >= 70) {
        motivation.textContent = "🚀 Great work! Keep aiming higher.";
    } else {
        motivation.textContent = "📚 Practice makes perfect. Try again!";
    }
}

// ======================
// RETRY BUTTON
// ======================

document.getElementById("retryBtn")?.addEventListener("click", () => {
    window.location.href = "quiz.html";
});

// ======================
// DASHBOARD BUTTON
// ======================

document.getElementById("dashboardBtn")?.addEventListener("click", () => {
    window.location.href = "index.html";
});

// ======================
// SAVE LEADERBOARD (FIXED + SAFE)
// ======================

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// prevent duplicate save on refresh
const alreadySaved = sessionStorage.getItem("savedResult");

if (!alreadySaved) {

    leaderboard.push({
        name: localStorage.getItem("username") || "Player",
        subject: subject,
        score: score,
        total: total,
        percentage: percentage,
        date: new Date().toLocaleDateString()
    });

    leaderboard.sort((a, b) => b.percentage - a.percentage);
    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    sessionStorage.setItem("savedResult", "true");
}

// ======================
// LEADERBOARD DISPLAY (TOP 5)
// ======================

function loadLeaderboard() {

    const leaderboard =
        JSON.parse(localStorage.getItem("leaderboard")) || [];

    const container = document.getElementById("leaderboardList");

    if (!container) return;

    if (leaderboard.length === 0) {
        container.innerHTML = "<p>No scores yet.</p>";
        return;
    }

    container.innerHTML = leaderboard
        .slice(0, 5)
        .map((item, index) => `
            <div style="
                padding:10px;
                margin:8px 0;
                background:#f1f5f9;
                border-radius:10px;
                font-size:14px;
            ">
                <strong>#${index + 1} ${item.name}</strong><br>
                ${item.subject} - ${item.percentage}% (${item.score}/${item.total})
            </div>
        `)
        .join("");
}

loadLeaderboard();

// ======================
// FULL LEADERBOARD BUTTON
// ======================

document.getElementById("viewLeaderboardBtn")?.addEventListener("click", () => {
    window.location.href = "leaderboard.html";
});