const leaderboard =
JSON.parse(localStorage.getItem("leaderboard")) || [];

const container =
document.getElementById("leaderboardList");

if (leaderboard.length === 0) {
    container.innerHTML = "<p>No scores yet</p>";
} else {
    container.innerHTML = leaderboard.map((item, index) => {
        return `
            <div style="
                padding:15px;
                margin:10px 0;
                background:#f1f5f9;
                border-radius:12px;
                text-align:left;
            ">
                <strong>#${index + 1} ${item.name}</strong><br>
                Subject: ${item.subject}<br>
                Score: ${item.score}/${item.total}<br>
                Percentage: ${item.percentage}%<br>
                Date: ${item.date}
            </div>
        `;
    }).join("");
}