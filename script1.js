document.addEventListener("DOMContentLoaded", function() {
    const userDisplay = document.getElementById("userDisplay");
    const loginDisplay = document.getElementById("loginDisplay");
    const logoutDisplay = document.getElementById("logoutDisplay");

    let loggedUser = localStorage.getItem("loggedUser") || sessionStorage.getItem("loggedUser");

    if (loggedUser) {
        userDisplay.innerHTML = `<a href="#">👤 ${loggedUser}</a>`;
        loginDisplay.style.display = "none";
        logoutDisplay.style.display = "inline";
    }

    // Registrazione
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let humanCheck = document.getElementById("humanCheck").checked;

            if (!humanCheck) {
                alert("Devi confermare di essere un essere umano!");
                return;
            }

            localStorage.setItem("user_" + username, JSON.stringify({ password: password }));
            alert("Registrazione avvenuta con successo! Ora accedi.");
            window.location.href = "login.html";
        });
    }

    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let username = document.getElementById("loginUsername").value;
            let password = document.getElementById("loginPassword").value;
            let rememberMe = document.getElementById("rememberMe").checked;

            let storedUser = localStorage.getItem("user_" + username);

            if (!storedUser) {
                alert("Username non trovato!");
                return;
            }

            let userData = JSON.parse(storedUser);

            if (userData.password !== password) {
                alert("Password errata!");
                return;
            }

            if (rememberMe) {
                localStorage.setItem("loggedUser", username);
            } else {
                sessionStorage.setItem("loggedUser", username);
                setTimeout(() => {
                    sessionStorage.removeItem("loggedUser");
                    window.location.href = "index.html";
                }, 7200000); // Logout automatico dopo 2 ore
            }

            window.location.href = "index.html";
        });
    }
});

// Logout
function logout() {
    localStorage.removeItem("loggedUser");
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}