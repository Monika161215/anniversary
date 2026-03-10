// ===== FLOATING HEARTS =====
(function createFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const hearts = ['❤', '♥', '💕', '💗'];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('span');
    el.className = 'float-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (14 + Math.random() * 18) + 'px';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(el);
  }
})();

// Footer hearts
(function createFooterHearts() {
  const container = document.getElementById('footerHearts');
  if (!container) return;
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('span');
    el.className = 'float-heart';
    el.textContent = '❤';
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (10 + Math.random() * 12) + 'px';
    el.style.animationDuration = (6 + Math.random() * 6) + 's';
    el.style.animationDelay = (Math.random() * 6) + 's';
    container.appendChild(el);
  }
})();

// ===== MUSIC =====
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicMsg = document.getElementById('musicMsg');
let isPlaying = false;

musicBtn.addEventListener('click', function () {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicMsg.classList.add('hidden');
  } else {
    bgMusic.play();
    musicBtn.classList.add('playing');
    musicMsg.classList.remove('hidden');
    setTimeout(() => musicMsg.classList.add('hidden'), 3000);
  }
  isPlaying = !isPlaying;
});

// ===== SMOOTH SCROLL =====
document.getElementById('beginBtn').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(function (el) { revealObserver.observe(el); });

// ===== QUIZ =====
const quizData = [
  { q: "Where did we officially start our relationship?", opts: ["At college", "Urban Nukkad", "A movie theater", "Coffee shop"], ans: 1 },
  { q: "What sweet did Tanya bring first?", opts: ["Chocolate", "Shiro", "Thepla", "Gulab Jamun"], ans: 1 },
  { q: "What is Tanya's special nickname?", opts: ["Sweetheart", "Chocolate Girl", "Angel", "Princess"], ans: 1 },
  { q: "When did we officially start our journey?", opts: ["February 8", "February 10", "February 14", "February 6"], ans: 1 },
  { q: "What special event happened on March 5th?", opts: ["First date", "Surgery", "Get Well Soon Party", "Proposal"], ans: 2 }
];

let quizIdx = 0, quizScore = 0, quizAnswered = false;

function renderQuiz() {
  const box = document.getElementById('quizContainer');
  if (quizIdx >= quizData.length) {
    box.innerHTML =
      '<div class="quiz-result">' +
        '<h3>You scored ' + quizScore + ' / ' + quizData.length + '!</h3>' +
        '<p>❤️ "Our story is only beginning." ❤️</p>' +
        '<button class="quiz-next" onclick="resetQuiz()">Play Again</button>' +
      '</div>';
    return;
  }
  const d = quizData[quizIdx];
  let dots = '<div class="quiz-progress">';
  for (let i = 0; i < quizData.length; i++) {
    dots += '<div class="quiz-dot' + (i === quizIdx ? ' active' : i < quizIdx ? ' done' : '') + '"></div>';
  }
  dots += '</div>';

  let opts = '<div class="quiz-options">';
  d.opts.forEach(function (o, i) {
    opts += '<button class="quiz-opt" data-idx="' + i + '" onclick="pickAnswer(' + i + ')">' + o + '</button>';
  });
  opts += '</div>';

  box.innerHTML = dots +
    '<div class="quiz-question">' + d.q + '</div>' +
    opts +
    '<button class="quiz-next hidden" id="quizNext" onclick="nextQuiz()">Next →</button>';
  quizAnswered = false;
}

function pickAnswer(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const correct = quizData[quizIdx].ans;
  if (idx === correct) quizScore++;
  const btns = document.querySelectorAll('.quiz-opt');
  btns.forEach(function (b, i) {
    b.classList.add('disabled');
    if (i === correct) b.classList.add('correct');
    else if (i === idx) b.classList.add('wrong');
  });
  document.getElementById('quizNext').classList.remove('hidden');
}

function nextQuiz() {
  quizIdx++;
  renderQuiz();
}

function resetQuiz() {
  quizIdx = 0; quizScore = 0;
  renderQuiz();
}

renderQuiz();

// ===== GALLERY LIGHTBOX =====
function openLightbox(src){

const lightbox = document.getElementById("lightbox");
const inner = document.getElementById("lightboxInner");

inner.innerHTML = `<img src="${src}" style="max-width:90vw; max-height:80vh; border-radius:16px;">`;

lightbox.classList.remove("hidden");

}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

// ===== SURPRISE =====
function triggerSurprise() {
  document.getElementById('surpriseMsg').classList.remove('hidden');
  document.getElementById('surpriseBtn').style.display = 'none';
  launchConfetti();
  burstHearts();
}

// Confetti
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#e8556d', '#d4a853', '#f5e6c8', '#ff6b8a', '#ffd700', '#ff4081'];
  const pieces = [];
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 3,
      rot: Math.random() * 360,
      rv: (Math.random() - 0.5) * 8
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(function (p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.rv;
    });
    frame++;
    if (frame < 180) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// Heart burst
function burstHearts() {
  for (let i = 0; i < 30; i++) {
    const h = document.createElement('span');
    h.textContent = '❤';
    h.style.cssText =
      'position:fixed;z-index:160;font-size:' + (16 + Math.random() * 24) + 'px;' +
      'left:' + (Math.random() * 100) + 'vw;top:' + (Math.random() * 100) + 'vh;' +
      'pointer-events:none;opacity:1;transition:all 1.5s ease;color:#e8556d;';
    document.body.appendChild(h);
    requestAnimationFrame(function () {
      h.style.transform = 'translateY(-' + (100 + Math.random() * 200) + 'px) scale(' + (1 + Math.random()) + ')';
      h.style.opacity = '0';
    });
    setTimeout(function () { h.remove(); }, 2000);
  }
}
