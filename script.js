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
