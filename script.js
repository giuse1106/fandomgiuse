// scripts.js

// Funzione per navigare tra le sezioni
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const pagesGroups = document.querySelectorAll('.pages-group');
const dots = document.querySelectorAll('.dot');

let currentSection = 0; // Indice della sezione attuale

// Funzione per mostrare la sezione attuale
function showSection(index) {
    pagesGroups.forEach((group, i) => {
        group.style.transform = `translateX(-${index * 100}%)`; // Sposta i gruppi in orizzontale
    });
    dots.forEach((dot, i) => {
        dot.style.backgroundColor = (i === index) ? '#fff' : '#4a90e2'; // Cambia il colore dei puntini
    });
}

// Gestione click sui pulsanti delle frecce
nextButton.addEventListener('click', () => {
    if (currentSection < pagesGroups.length - 1) {
        currentSection++;
        showSection(currentSection);
    }
});

prevButton.addEventListener('click', () => {
    if (currentSection > 0) {
        currentSection--;
        showSection(currentSection);
    }
});

// Gestione click sui puntini
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSection = index;
        showSection(currentSection);
    });
});

// Inizializza la visualizzazione
showSection(currentSection);

document.addEventListener("DOMContentLoaded", function() {
    const userDisplay = document.getElementById("userDisplay");
    const loginDisplay = document.getElementById("loginDisplay");
    const logoutDisplay = document.getElementById("logoutDisplay");

    let loggedUser = localStorage.getItem("loggedUser") || sessionStorage.getItem("loggedUser");

    if (loggedUser) {
        userDisplay.innerHTML = `<a href="#">👤 ${loggedUser}</a>`;
        loginDisplay.style.display = "none";
        userDisplay.style.display = "inline";
        logoutDisplay.style.display = "inline";
    } else {
        userDisplay.innerHTML = `<a href="register.html">Registrati</a>`;
        loginDisplay.style.display = "inline";
        logoutDisplay.style.display = "none";
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
