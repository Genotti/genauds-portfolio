// Theme toggle - dark mode is standaard
document.documentElement.classList.add('dark');

const toggleThemeBtn = document.getElementById('toggle-theme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
});

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
}

// Modal system voor alle 8 modals
const slideIndexes = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0};

function showSlide(modalId, index) {
  const modal = document.getElementById(`modal${modalId}`);
  if (!modal) return;
  const slides = modal.querySelectorAll('.slide');
  if (index >= slides.length) slideIndexes[modalId] = 0;
  if (index < 0) slideIndexes[modalId] = slides.length - 1;
  slides.forEach((s, i) => s.classList.toggle('active-slide', i === slideIndexes[modalId]));
}

function nextSlide(modalId) {
  slideIndexes[modalId]++;
  showSlide(modalId, slideIndexes[modalId]);
}

function prevSlide(modalId) {
  slideIndexes[modalId]--;
  showSlide(modalId, slideIndexes[modalId]);
}

function openModal(id) {
  const modal = document.getElementById(`modal${id}`);
  if (modal) {
    modal.style.display = 'flex';
    slideIndexes[id] = 0;
    showSlide(id, 0);
  }
}

function closeModal(id) {
  const modal = document.getElementById(`modal${id}`);
  if (modal) modal.style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModalEl = document.querySelector('.modal[style*="display: flex"]');
    if (openModalEl) closeModal(openModalEl.id.replace('modal', ''));
  }
});

// Video player met 3 video's
let currentPlayer = null;
let currentVideoIndex = 1;

function playVideo(index) {
  document.querySelectorAll('.video-frame').forEach(f => f.style.display = 'none');
  const frame = document.getElementById(`video-player-${index}`);
  if (frame) frame.style.display = 'block';

  if (currentPlayer) currentPlayer.destroy();
  currentPlayer = new Vimeo.Player(frame.querySelector('iframe'));
  currentPlayer.play().catch(() => {});
  document.getElementById('playpause-btn').textContent = '▐▐';
  currentVideoIndex = index;
}

const videoButtons = document.querySelectorAll('.video-btn');
const playpauseBtn = document.getElementById('playpause-btn');
const nextBtn = document.getElementById('next-video-btn');

videoButtons.forEach(button => {
  button.addEventListener('click', () => {
    videoButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    playVideo(parseInt(button.getAttribute('data-index')));
  });
});

playpauseBtn.addEventListener('click', () => {
  if (!currentPlayer) { playVideo(1); return; }
  if (playpauseBtn.textContent === '▶') {
    currentPlayer.play();
    playpauseBtn.textContent = '▐▐';
  } else {
    currentPlayer.pause();
    playpauseBtn.textContent = '▶';
  }
});

nextBtn.addEventListener('click', () => {
  if (currentVideoIndex === 1) playVideo(2);
  else if (currentVideoIndex === 2) playVideo(3);
  else playVideo(1);
});

// Back to top + Love button
window.addEventListener("scroll", () => {
  document.querySelector('.back-to-top').classList.toggle('visible', window.scrollY > 300);
});

document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

let isSparkleActive = false;

function triggerSparkleEffect() {
  if (isSparkleActive) return;
  isSparkleActive = true;
  console.log("100% made with love ❤️");
  setTimeout(() => isSparkleActive = false, 3000);
}

document.querySelector('.love-button').addEventListener('click', triggerSparkleEffect);

console.log("✅ Volledige update: PFP rechts, knoppen in lijn, compilatie video, Merkbeeld met alle 10 foto's en mb3 eerst");