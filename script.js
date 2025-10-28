/**
 * Поздравительный сайт для папы
 * С анимациями, звёздами, конфетти и музыкой
 */

document.addEventListener('DOMContentLoaded', () => {
  // ====================== ЭЛЕМЕНТЫ DOM ======================
  const introScreen   = document.getElementById('intro-screen');
  const cardScreen    = document.getElementById('card-screen');
  const startBtn      = document.getElementById('start-btn');
  const cardInner     = document.querySelector('.card-inner');
  const audio         = document.getElementById('bg-music');
  const musicBtn      = document.getElementById('music-btn');

  let isPlaying = false; // Состояние музыки


  // ====================== СОЗДАНИЕ ЗВЁЗД ======================
  function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    cardScreen.appendChild(starsContainer);

    const starCount = 80;
    const width     = window.innerWidth;
    const height    = window.innerHeight;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Размер звезды (1–3px)
      const size = Math.random() * 2 + 1;
      star.style.width  = `${size}px`;
      star.style.height = `${size}px`;

      // Случайная позиция
      star.style.left = `${Math.random() * width}px`;
      star.style.top  = `${Math.random() * height}px`;

      // Анимация мерцания
      const duration = Math.random() * 3 + 2;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay    = `${Math.random() * 3}s`;

      // Эффект свечения
      star.style.boxShadow = `0 0 ${size * 4}px #fff`;

      starsContainer.appendChild(star);
    }
  }


  // ====================== ЗАПУСК АНИМАЦИИ ======================
  startBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');

    setTimeout(() => {
      cardScreen.classList.add('active');

      // Запуск эффектов
      launchConfetti();
      createStars();

      // Музыка (автостарт)
      setTimeout(() => {
        audio.play()
          .then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
          })
          .catch(() => {
            // Автостарт заблокирован — кнопка остаётся активной
          });
      });

      // Переворот открытки (через 1с)
      setTimeout(() => {
        cardInner.style.transform = 'rotateY(180deg)';
      }, 1000);

    }, 800); // Задержка перед показом открытки
  });


  // ====================== УПРАВЛЕНИЕ МУЗЫКОЙ ======================
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      musicBtn.classList.remove('playing');
    } else {
      audio.play();
      isPlaying = true;
      musicBtn.classList.add('playing');
    }
  });


  // ====================== КОНФЕТТИ ======================
  function launchConfetti() {
    const settings = {
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#4facfe', '#00f2fe', '#667eea', '#764ba2', '#f093fb']
    };

    // Основные залпы
    confetti(Object.assign({}, settings, { startVelocity: 35 }));
    confetti(Object.assign({}, settings, { angle: 60,  startVelocity: 30 }));
    confetti(Object.assign({}, settings, { angle: 120, startVelocity: 30 }));

    // Дополнительные (сбоку)
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 90, spread: 50, origin: { x: 0.3, y: 0.7 } });
      confetti({ particleCount: 60, angle: 90, spread: 50, origin: { x: 0.7, y: 0.7 } });
    }, 400);
  }
});