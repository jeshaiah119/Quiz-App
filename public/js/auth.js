// =========================
// ELEMENTS
// =========================

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// =========================
// AUTO LOGIN CHECK
// =========================

if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
}

// =========================
// SWITCH FORMS
// =========================

if (loginBtn && registerBtn && loginForm && registerForm) {

    loginBtn.addEventListener("click", () => {

        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");

        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");

    });

    registerBtn.addEventListener("click", () => {

        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");

        registerBtn.classList.add("active");
        loginBtn.classList.remove("active");

    });

}

// =========================
// SHOW PASSWORD
// =========================

document.querySelectorAll(".togglePassword").forEach(icon => {

    icon.addEventListener("click", () => {

        const input = icon.previousElementSibling;

        input.type =
            input.type === "password"
                ? "text"
                : "password";

    });

});

// =========================
// REGISTER
// =========================

if (registerForm) {

    registerForm.addEventListener("submit", e => {

        e.preventDefault();

        const username =
            document.getElementById("registerUsername").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirm =
            document.getElementById("confirmPassword").value;

        if (username.length < 4) {
            alert("Username must be at least 4 characters long.");
            return;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        const existingUser =
            JSON.parse(localStorage.getItem("quizUser"));

        if (
            existingUser &&
            existingUser.username === username
        ) {
            alert("Username already exists.");
            return;
        }

        const user = {
            username,
            email,
            password
        };

        localStorage.setItem(
            "quizUser",
            JSON.stringify(user)
        );

        alert("Registration Successful! Please login.");

        registerForm.reset();

        loginBtn.click();

    });

}

// =========================
// LOGIN
// =========================

if (loginForm) {

    loginForm.addEventListener("submit", e => {

        e.preventDefault();

        const username =
            document.getElementById("loginUsername").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const storedUser =
            JSON.parse(localStorage.getItem("quizUser"));

        if (!storedUser) {

            alert(
                "No account found. Please register first."
            );

            return;
        }

        if (
            username === storedUser.username &&
            password === storedUser.password
        ) {

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            localStorage.setItem(
                "currentUser",
                storedUser.username
            );

            alert(
                `Welcome back, ${storedUser.username}!`
            );

            window.location.href = "index.html";

        } else {

            alert(
                "Invalid username or password."
            );

        }

    });

}