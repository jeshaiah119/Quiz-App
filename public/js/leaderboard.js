<<<<<<< HEAD
const leaderboard =
JSON.parse(localStorage.getItem("leaderboard")) || [];

const container =
document.getElementById("leaderboardList");

if (leaderboard.length === 0) {

    container.innerHTML =
    "<p>No scores yet.</p>";

}
else {

    container.innerHTML =
    leaderboard
    .map((player, index) => {

        return `
            <div class="leaderboard-item">
                <h3>
                    #${index + 1}
                    ${player.name || "Player"}
                </h3>

                <p>
                    ${player.subject}
                </p>

                <p>
                    ${player.score}/${player.total}
                    (${player.percentage}%)
                </p>

                <p>
                    ${player.date}
                </p>
            </div>
        `;

    })
    .join("");

=======
const leaderboard =
JSON.parse(localStorage.getItem("leaderboard")) || [];

const container =
document.getElementById("leaderboardList");

if (leaderboard.length === 0) {

    container.innerHTML =
    "<p>No scores yet.</p>";

}
else {

    container.innerHTML =
    leaderboard
    .map((player, index) => {

        return `
            <div class="leaderboard-item">
                <h3>
                    #${index + 1}
                    ${player.name || "Player"}
                </h3>

                <p>
                    ${player.subject}
                </p>

                <p>
                    ${player.score}/${player.total}
                    (${player.percentage}%)
                </p>

                <p>
                    ${player.date}
                </p>
            </div>
        `;

    })
    .join("");

>>>>>>> 361493d1bc5bda3177a2ee655f4911fe68f8cfe9
}