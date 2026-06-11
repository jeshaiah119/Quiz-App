// ======================
// GET RESULTS
// ======================

const score =
Number(
    localStorage.getItem(
        "quizScore"
    )
);

const total =
Number(
    localStorage.getItem(
        "totalQuestions"
    )
);

const subject =
localStorage.getItem(
    "selectedSubject"
);

const percentage = Math.round(
    (score / total) * 100
);

// ======================
// DISPLAY RESULT
// ======================

document.getElementById(
    "percentage"
).textContent =
percentage + "%";

document.getElementById(
    "subjectName"
).textContent =
subject;

document.getElementById(
    "scoreText"
).textContent =
`${score} / ${total}`;

// ======================
// SAVE BEST SCORE
// ======================

const bestScoreKey =
`best_${subject}`;

const previousBest =
localStorage.getItem(
    bestScoreKey
);

if(
    !previousBest ||
    percentage > Number(previousBest)
){

    localStorage.setItem(
        bestScoreKey,
        percentage
    );

}

// ======================
// UPDATE COMPLETED QUIZZES
// ======================

let completed =
Number(
    localStorage.getItem(
        "completedQuiz"
    ) || 0
);

completed++;

localStorage.setItem(
    "completedQuiz",
    completed
);

// ======================
// PASS OR FAIL
// ======================

const status =
document.getElementById(
    "status"
);

const message =
document.getElementById(
    "message"
);

if(percentage >= 80){

    status.textContent =
    "🌟 Excellent";

    message.textContent =
    "Outstanding performance! You have mastered this topic.";

}
else if(percentage >= 60){

    status.textContent =
    "✅ Passed";

    message.textContent =
    "Good job! Keep practicing to improve further.";

}
else{

    status.textContent =
    "❌ Needs Improvement";

    message.textContent =
    "Review the explanations and try again.";

}

// ======================
// EXTRA MOTIVATION
// ======================

const motivation =
document.getElementById(
    "motivation"
);

if(motivation){

    if(percentage >= 90){

        motivation.textContent =
        "🏆 You are a QuizSphere Champion!";

    }
    else if(percentage >= 70){

        motivation.textContent =
        "🚀 Great work! Keep aiming higher.";

    }
    else{

        motivation.textContent =
        "📚 Practice makes perfect. Try again!";
    }

}

// ======================
// RETRY BUTTON
// ======================

document
.getElementById(
    "retryBtn"
)
.addEventListener(
    "click",
    () => {

        window.location.href =
        "quiz.html";

    }
);

// ======================
// DASHBOARD BUTTON
// ======================

document
.getElementById(
    "dashboardBtn"
)
.addEventListener(
    "click",
    () => {

        window.location.href =
        "index.html";

    }
);