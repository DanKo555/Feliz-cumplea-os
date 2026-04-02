// =============================================
// 1. CASCADA MATRIX - SIEMPRE ROSA
// =============================================
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Siempre rosa desde el inicio
function drawMatrix() {
    ctx.fillStyle = 'rgba(26, 0, 16, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff4081';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// =============================================
// 2. TEXTO "FELIZ CUMPLEAÑOS" - MÁQUINA DE ESCRIBIR
// =============================================
const textElement = document.getElementById('typing-text');
const message = "FELIZ CUMPLEAÑOS ISA 🌸";
let charIndex = 0;

// Música de fondo
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let musicPlaying = false;
let musicStarted = false;

function tryPlayMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicStarted = true;
            musicBtn.textContent = '🎵';
            musicBtn.classList.add('playing');
        }).catch(() => {});
    }
}

musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        musicBtn.textContent = '🔇';
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicStarted = true;
            musicBtn.textContent = '🎵';
            musicBtn.classList.add('playing');
        }).catch(() => {});
    }
});

// Intentar reproducir en el primer clic en cualquier parte
document.addEventListener('click', tryPlayMusic, { once: true });

function typeText() {
    if (charIndex < message.length) {
        textElement.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 150);
    } else {
        // Cuando termina, mostrar el sobre
        setTimeout(showEnvelope, 1200);
    }
}

setTimeout(typeText, 2000);


// =============================================
// 3. SOBRE ANIMADO QUE SE PUEDE ABRIR
// =============================================
const envelopeWrapper = document.getElementById('envelope-wrapper');
const envelope = document.getElementById('envelope');
const letterPaper = document.getElementById('letter-paper');
const envelopeHint = document.querySelector('.envelope-hint');

function showEnvelope() {
    envelopeWrapper.classList.remove('hidden');
    envelopeWrapper.classList.add('show');
}

// Click en el sobre → abrirlo y mostrar carta
envelope.addEventListener('click', () => {
    if (envelope.classList.contains('open')) {
        // Si ya está abierto, cerrarlo
        envelope.classList.remove('open');
        letterPaper.classList.remove('open-letter');
        envelopeHint.textContent = 'Toca el sobre para abrirlo 💕';
    } else {
        // Abrir sobre
        envelope.classList.add('open');
        envelopeHint.textContent = 'Toca el sobre para cerrarlo';
        setTimeout(() => {
            letterPaper.classList.add('open-letter');
        }, 400);
    }
});

// Botón "Cerrar" dentro de la carta
const closeLetterBtn = document.getElementById('close-letter-btn');
closeLetterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    envelope.classList.remove('open');
    letterPaper.classList.remove('open-letter');
    envelopeHint.textContent = 'Toca el sobre para abrirlo 💕';
});


// =============================================
// 4. MINI LIBRO DE FOTOS
// =============================================
const showPhotosBtn = document.getElementById('show-photos-btn');
const photoBook = document.getElementById('photo-book');
const bookCover = document.getElementById('book-cover');
const bookPages = document.getElementById('book-pages');
const pages = document.querySelectorAll('.book-page');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageIndicator = document.getElementById('page-indicator');
let currentPage = 0;
const totalPages = pages.length;

// "Ver recuerdos" → ocultar sobre y mostrar mini libro
showPhotosBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Ocultar sobre
    envelopeWrapper.classList.remove('show');
    envelopeWrapper.classList.add('hidden');

    // Mostrar libro
    setTimeout(() => {
        photoBook.classList.remove('hidden');
        photoBook.classList.add('show');
    }, 600);
});

// Click en portada del libro → abrir páginas
bookCover.addEventListener('click', () => {
    bookCover.style.display = 'none';
    bookPages.classList.add('open');
    showPage(0);
});

function showPage(index) {
    pages.forEach(p => p.classList.remove('active'));
    pages[index].classList.add('active');
    pageIndicator.textContent = `${index + 1} / ${totalPages}`;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
    }
});


// =============================================
// 5. CORAZÓN DE FOTOS
// =============================================
const toHeartBtn = document.getElementById('to-heart-btn');
const galleryContainer = document.getElementById('gallery-container');
const finalLetter = document.getElementById('final-letter');
const valentineWrapper = document.getElementById('valentine-wrapper');
const openFinalLetterBtn = document.getElementById('open-final-letter-btn');
const photoCount = 50;
let photos = [];

toHeartBtn.addEventListener('click', () => {
    // Ocultar libro
    photoBook.classList.remove('show');
    photoBook.classList.add('hidden');

    // Mostrar galería y generar fotos
    setTimeout(() => {
        galleryContainer.classList.remove('hidden');
        galleryContainer.classList.add('show');
        generarFotosCorazon();
    }, 600);
});

function generarFotosCorazon() {
    photos = [];

    // Lista de imágenes reales
    const imageList = [
        'imagenes/1761353322501.jpg',
        'imagenes/Headliners_202633123502.jpg',
        'imagenes/IMG-20251024-WA0101.jpg',
        'imagenes/IMG-20260401-WA0007.jpg',
        'imagenes/IMG-20260401-WA0011.jpg',
        'imagenes/IMG-20260401-WA0024.jpg',
        'imagenes/IMG-20260401-WA0026.jpg',
        'imagenes/IMG-20260401-WA0028.jpg',
        'imagenes/IMG-20260401-WA0029.jpg',
        'imagenes/IMG-20260401-WA0032.jpg',
        'imagenes/IMG-20260401-WA0033.jpg',
        'imagenes/IMG_20251026_005416.jpg',
        'imagenes/IMG_20251123_221605.jpg',
        'imagenes/image.png',
        'imagenes/image1.png'
    ];

    // Primero: dispersar las fotos aleatoriamente
    for (let i = 0; i < photoCount; i++) {
        const img = document.createElement('img');
        img.src = imageList[i % imageList.length]; // ciclar si hay más fotos que imágenes
        img.className = 'photo';

        const startX = (window.innerWidth / 2) - 45;
        const startY = (window.innerHeight / 2) - 45;
        img.style.left = `${startX}px`;
        img.style.top = `${startY}px`;
        img.style.transform = `scale(0.1)`;

        galleryContainer.appendChild(img);
        photos.push(img);

        // Dispersar con retraso
        setTimeout(() => {
            const targetX = Math.random() * (window.innerWidth - 90);
            const targetY = Math.random() * (window.innerHeight - 90);
            const rotation = (Math.random() - 0.5) * 60;
            img.style.left = `${targetX}px`;
            img.style.top = `${targetY}px`;
            img.style.transform = `rotate(${rotation}deg) scale(1)`;
        }, 50 + (i * 20));
    }

    // Después de 3.5s, formar el corazón automáticamente
    setTimeout(() => {
        formarCorazon();
    }, 3500 + photoCount * 20);
}

function formarCorazon() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 + 20;
    const scale = Math.min(window.innerWidth, window.innerHeight) / 35;

    photos.forEach((img, index) => {
        let t = (index / photoCount) * 2 * Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        const targetX = centerX + (x * scale) - 45;
        const targetY = centerY + (y * scale) - 45;
        const rotation = (index % 2 === 0) ? -5 : 5;

        img.style.left = `${targetX}px`;
        img.style.top = `${targetY}px`;
        img.style.transform = `rotate(${rotation}deg) scale(1.1)`;
        img.style.zIndex = index;
    });

    // Mostrar el sobre valentín 3 segundos después del corazón
    setTimeout(() => {
        valentineWrapper.classList.remove('hidden');
        valentineWrapper.classList.add('show');
    }, 3000);
}

// Clic en el sobre valentín → tarjeta sube y se queda fija
const valValentine = document.getElementById('val-valentines');
valValentine.addEventListener('click', (e) => {
    // No procesar si el clic fue en el botón
    if (e.target.id === 'open-final-letter-btn') return;
    valValentine.classList.toggle('opened');
    // Actualizar hint
    const hint = document.querySelector('.val-hint');
    if (valValentine.classList.contains('opened')) {
        hint.textContent = 'Haz clic en "Leer carta" para continuar 💕';
    } else {
        hint.textContent = 'Toca el sobre para abrirlo 💕';
    }
});

// Botón "Leer carta" → muestra carta final sobre valentín → muestra carta final
openFinalLetterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Ocultar sobre
    valentineWrapper.classList.remove('show');
    valentineWrapper.classList.add('hidden');
    // Mostrar carta final
    setTimeout(() => {
        finalLetter.classList.remove('hidden');
        finalLetter.classList.add('show');
    }, 600);
});
