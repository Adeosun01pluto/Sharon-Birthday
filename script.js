/**
 * PROJECT SHARON — LUXURY EDITORIAL BIRTHDAY EXPERIENCE
 * Vanilla JavaScript Engine
 */

// ==========================================================================
// 1. DATA & STATE MANAGEMENT
// ==========================================================================

const LETTERS_DATA = {
  idris: {
    title: "377 Days & Counting",
    author: "From Idris (With Love & Banter)",
    date: "A Year of Inspiration",
    seal: "IDRIS",
    content: `
      <p>Heyyyyyyyyyy, Gurlllllllllllllllllll – Super Mom! 😝❤️</p>
      <p>We’ve known each other for 377 days, and I must say, I have never regretted for a moment the day we met.</p>
      <p>The way I met you was so inspiring, and I have always perceived you as a go-getter. You are very industrious, and you love being independent, even when you have plenty of opportunities to be dependent (Nepo Baby Privilege 😂). Despite that, you still strive to build and manage a business of your own.</p>
      <p>You are very responsible and supportive. Ever since we met, you have always wanted the best for me, be it academically, economically, socially, or in every other aspect of life. You are always looking out for me and that Big Head (Daniel). 😭</p>
      <p>I want to say a very big thank you for all you have done, all you are doing, and everything you will continue to do in my life in the nearest future. I believe we still have a long way to go together, positively and hopefully.</p>
      <p>May God continue to bless you. As you embark on this new age journey, may God replenish your pocket and cause you to prosper in everything you lay your hands on. May God increase your wisdom, knowledge, and understanding.</p>
      <p>May God grant you all your heart’s desires.</p>
      <p>You’ve gotten yourself a fine car, and may God grant you long life to enjoy driving it to the fullest. Along the way, may God also bless you with the resources to acquire even more luxurious cars.</p>
      <p>You’ve longed for a lovable, caring, and reasonable partner. May God bless you with one soon!</p>
      <p>If you already have one, may God continue to strengthen your bond and lead you both to marriage so I can finally eat party jollof rice! 😹😭🤲🏾</p>
      <p><strong>Happy Birthday, Super Mom! ❤️🥳</strong></p>
    `
  },
  daniel: {
    title: "From Childhood, With Love",
    author: "From Daniel (Your Childhood Blessing)",
    date: "A Lifetime of Memories",
    seal: "DANIEL",
    content: `
      <p>To my girl, my childhood blessing, and one of life’s sweetest gifts to me. Happy birthday, Sharon.</p>
      <p>Watching you grow, evolve, and become the woman you are today has been such a beautiful thing.</p>
      <p>From our childhood memories to all the different seasons of life, you’ve remained one of the most genuine, supportive, and dependable people in my corner.</p>
      <p>Thank you for being a constant, for showing up, for believing in me, and for being such a beautiful part of my story.</p>
      <p>Today, I celebrate not just the gift of you, but also everything you represent: your strength, your courage, your vision, and your determination.</p>
      <p>Seeing you build ShazBeauty, and watching it mark another year, is a reminder that beautiful things take courage, consistency, and a whole lot of faith.</p>
      <p>I’m so proud of you, and how far you’ve come.</p>
      <p>As you step into another year, may life surprise you in the most beautiful ways.</p>
      <p>May your dreams find expression, your efforts yield incredible results, and may everything you lay your hands on flourish beyond your imagination.</p>
      <p>Here’s to more years of friendship, more milestones, bigger wins, and countless reasons to celebrate you.</p>
      <p>Happy birthday, Sharon.</p>
      <p>Keep becoming, keep building, and keep shining.</p>
      <p><strong>The world is yet to see the full extent of what you carry, I love you, always!</strong></p>
    `
  }
};

const CHAPTERS = [
  { num: 1, id: "scene-1", title: "The Invitation" },
  { num: 2, id: "scene-2", title: "The First Reveal" },
  { num: 3, id: "scene-3", title: "The Woman We Know" },
  { num: 4, id: "scene-4", title: "Two Stories, One Sharon" },
  { num: 5, id: "scene-5", title: "The ShazBeauty Chapter" },
  { num: 6, id: "scene-6", title: "The Funny Little Things" },
  { num: 7, id: "scene-7", title: "A Thousand Good Wishes" },
  { num: 8, id: "scene-8", title: "The Secret Vault" },
  { num: 9, id: "scene-9", title: "The Grand Finale" }
];

const state = {
  currentScene: 1,
  highestUnlocked: 1,
  revealedCards: new Set(),
  readLetters: { idris: false, daniel: false },
  revealedWishes: new Set(),
  vaultUnlocked: false,
  vaultAttempts: 0,
  abegCount: 0,
  audioPlaying: true
};

// ==========================================================================
// 2. AUDIO SYNTHESIZER (WEB AUDIO API)
// Provides soothing ambient musical chords and sound effects without external files!
// ==========================================================================
let audioCtx = null;
let ambientInterval = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
}

function playTone(freq, duration = 1.2, type = "sine", gainLevel = 0.08) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn("Audio play tone error:", e);
  }
}

function playChime() {
  initAudio();
  if (!audioCtx) return;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((note, idx) => {
    setTimeout(() => playTone(note, 1.4, "sine", 0.05), idx * 120);
  });
}

function playVaultClick() {
  initAudio();
  playTone(220, 0.08, "triangle", 0.07);
}

function playVaultSuccess() {
  initAudio();
  const chord = [392.00, 493.88, 587.33, 783.99, 987.77];
  chord.forEach((freq, idx) => {
    setTimeout(() => playTone(freq, 2.0, "sine", 0.07), idx * 150);
  });
}

function startAmbientMusic() {
  initAudio();
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  
  state.audioPlaying = true;
  updateAudioButtonUI();

  // Soothing Pentatonic Ambient Chords
  const ambientChords = [
    [261.63, 329.63, 392.00, 523.25], // C maj
    [220.00, 261.63, 329.63, 440.00], // A min
    [174.61, 220.00, 261.63, 349.23], // F maj
    [196.00, 246.94, 293.66, 392.00]  // G maj
  ];
  let chordIndex = 0;

  function playChord() {
    if (!state.audioPlaying) return;
    const notes = ambientChords[chordIndex % ambientChords.length];
    chordIndex++;
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (state.audioPlaying) playTone(freq, 4.5, "sine", 0.035);
      }, i * 400);
    });
  }

  playChord();
  ambientInterval = setInterval(playChord, 5000);
}

function stopAmbientMusic() {
  state.audioPlaying = false;
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
  updateAudioButtonUI();
}

function toggleAudio() {
  if (state.audioPlaying) {
    stopAmbientMusic();
  } else {
    startAmbientMusic();
  }
}

function updateAudioButtonUI() {
  const btn = document.getElementById("audioToggleBtn");
  const label = document.getElementById("audioLabel");
  if (!btn || !label) return;

  if (state.audioPlaying) {
    btn.classList.add("playing");
    label.textContent = "Music: On ♫";
  } else {
    btn.classList.remove("playing");
    label.textContent = "Music: Off";
  }
}

// Ensure audio plays automatically on user's first gesture if blocked by browser policy
function ensureAutoMusic() {
  initAudio();
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  if (!ambientInterval && state.audioPlaying) {
    startAmbientMusic();
  }
}

['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
  window.addEventListener(evt, () => {
    ensureAutoMusic();
  }, { once: true });
});


// ==========================================================================
// 3. AMBIENT PARTICLES CANVAS ENGINE
// ==========================================================================
const canvas = document.getElementById("ambientCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.2 + 0.5;
    this.speedY = Math.random() * 0.4 + 0.1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.color = Math.random() > 0.4 ? "217, 180, 122" : "233, 175, 193"; // Champagne or Rose
    this.pulseSpeed = Math.random() * 0.02 + 0.005;
    this.pulseAngle = Math.random() * Math.PI * 2;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.pulseAngle += this.pulseSpeed;
    this.currentOpacity = this.opacity + Math.sin(this.pulseAngle) * 0.2;

    if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
      this.reset();
      this.y = canvas.height + 10;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.05, this.currentOpacity)})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `rgba(${this.color}, 0.5)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < 45; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();


// ==========================================================================
// 4. CONFETTI BURST ENGINE
// ==========================================================================
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfettiCanvas);
resizeConfettiCanvas();

const CONFETTI_COLORS = ["#D9B47A", "#E9AFC1", "#F6DFE4", "#FAF2EC", "#72E39E", "#FF5E7E"];

class ConfettiPiece {
  constructor(originX, originY, speedMultiplier = 1) {
    this.x = originX !== undefined ? originX : canvas.width / 2;
    this.y = originY !== undefined ? originY : canvas.height / 2;
    this.size = Math.random() * 9 + 6;
    this.speedX = (Math.random() - 0.5) * 18 * speedMultiplier;
    this.speedY = (Math.random() * -16 - 5) * speedMultiplier;
    this.gravity = 0.35;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 12;
    this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    this.opacity = 1;
    this.decay = Math.random() * 0.015 + 0.007;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.rotation += this.rotSpeed;
    this.opacity -= this.decay;
  }
  draw() {
    if (this.opacity <= 0) return;
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate((this.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = this.color;
    confettiCtx.globalAlpha = Math.max(0, this.opacity);
    confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    confettiCtx.restore();
  }
}

function triggerConfettiBurst(count = 90, originX, originY) {
  playChime();
  for (let i = 0; i < count; i++) {
    confettiPieces.push(new ConfettiPiece(originX, originY));
  }
}

function triggerHeavyConfettiBurst() {
  initAudio();
  // Celebratory triumph chords
  const triumphNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  triumphNotes.forEach((n, i) => setTimeout(() => playTone(n, 1.8, "sine", 0.08), i * 90));

  // Pulse effect on body
  document.body.classList.remove("mega-celebration-pulse");
  void document.body.offsetWidth;
  document.body.classList.add("mega-celebration-pulse");

  // Show Toast
  const toast = document.getElementById("megaConfettiToast");
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  // Multi-point massive fountain from bottom left, right, center, and high bursts
  const w = window.innerWidth;
  const h = window.innerHeight;
  const origins = [
    { x: w * 0.1, y: h * 0.95 },
    { x: w * 0.9, y: h * 0.95 },
    { x: w * 0.5, y: h * 0.85 },
    { x: w * 0.25, y: h * 0.6 },
    { x: w * 0.75, y: h * 0.6 }
  ];

  origins.forEach((orig, idx) => {
    setTimeout(() => {
      for (let i = 0; i < 95; i++) {
        confettiPieces.push(new ConfettiPiece(orig.x, orig.y, 1.4));
      }
    }, idx * 100);
  });
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const p = confettiPieces[i];
    p.update();
    p.draw();
    if (p.opacity <= 0 || p.y > confettiCanvas.height + 20) {
      confettiPieces.splice(i, 1);
    }
  }
  requestAnimationFrame(animateConfetti);
}
animateConfetti();


// ==========================================================================
// 5. SCENE PROGRESSION & NAVIGATION
// ==========================================================================
function goToScene(sceneNumber) {
  if (sceneNumber > state.highestUnlocked) {
    return; // Cannot skip locked scenes
  }

  // Deactivate all scenes
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  
  // Activate target scene
  const target = document.getElementById(`scene-${sceneNumber}`);
  if (target) {
    target.classList.add("active");
    state.currentScene = sceneNumber;
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update top bar indicators
    updateChapterTrackerUI();

    // Scene-specific hooks
    handleSceneEntry(sceneNumber);
    saveProgress();
  }
}

function unlockNextScene() {
  const next = state.currentScene + 1;
  if (next <= CHAPTERS.length) {
    if (next > state.highestUnlocked) {
      state.highestUnlocked = next;
    }
    goToScene(next);
  }
}

function updateChapterTrackerUI() {
  const currentChapter = CHAPTERS.find(c => c.num === state.currentScene) || CHAPTERS[0];
  document.getElementById("currentChapterNum").textContent = String(currentChapter.num).padStart(2, "0");
  document.getElementById("currentChapterName").textContent = currentChapter.title;
  renderChapterDropdownList();
}

function renderChapterDropdownList() {
  const listEl = document.getElementById("chapterList");
  if (!listEl) return;
  listEl.innerHTML = "";

  CHAPTERS.forEach(ch => {
    const li = document.createElement("li");
    const isUnlocked = ch.num <= state.highestUnlocked;
    const isActive = ch.num === state.currentScene;
    
    li.className = `chapter-item ${isActive ? "active" : ""} ${!isUnlocked ? "locked" : ""}`;
    li.innerHTML = `
      <span>${String(ch.num).padStart(2, "0")}. ${ch.title}</span>
      <span class="lock-icon">${isUnlocked ? "✓" : "🔒"}</span>
    `;

    if (isUnlocked) {
      li.addEventListener("click", () => {
        document.getElementById("chapterDropdown").classList.remove("open");
        goToScene(ch.num);
      });
    }

    listEl.appendChild(li);
  });
}

function handleSceneEntry(sceneNumber) {
  if (sceneNumber === 2) {
    // Cinematic Reveal Sequence
    const s1 = document.getElementById("revealStep1");
    const s2 = document.getElementById("revealStep2");
    const s3 = document.getElementById("revealStep3");
    
    s1.classList.remove("visible");
    s2.classList.remove("visible");
    s3.classList.remove("visible");

    setTimeout(() => { s1.classList.add("visible"); playTone(440, 1.2); }, 300);
    setTimeout(() => { s2.classList.add("visible"); playTone(554.37, 1.2); }, 2200);
    setTimeout(() => { 
      s3.classList.add("visible"); 
      triggerConfettiBurst(50);
    }, 4200);
  } else if (sceneNumber === 9) {
    triggerConfettiBurst(120);
  }
}

// Fresh Experience on Reload (Cache Cleared)
function clearProgressCache() {
  try {
    localStorage.removeItem("sharon_experience_save");
    sessionStorage.clear();
  } catch (e) {}
}

function saveProgress() {
  // Session progression only - reloads restart afresh
}

function loadSavedProgress() {
  clearProgressCache();
  state.currentScene = 1;
  state.highestUnlocked = 1;
}


// ==========================================================================
// 6. SCENE SPECIFIC INTERACTIONS
// ==========================================================================

// SCENE 01: Envelope Opening
const waxSeal = document.getElementById("waxSeal");
const openInvitationBtn = document.getElementById("openInvitationBtn");
const envelope = document.getElementById("envelope");

function handleOpenEnvelope() {
  ensureAutoMusic();
  playTone(330, 0.4, "triangle");
  envelope.classList.add("opening");
  triggerConfettiBurst(30, window.innerWidth / 2, window.innerHeight / 2);
  
  setTimeout(() => {
    unlockNextScene();
  }, 1200);
}

if (waxSeal) waxSeal.addEventListener("click", handleOpenEnvelope);
if (openInvitationBtn) openInvitationBtn.addEventListener("click", handleOpenEnvelope);

// SCENE 02: Reveal Next Button
const btnRevealNext = document.getElementById("btnRevealNext");
if (btnRevealNext) {
  btnRevealNext.addEventListener("click", () => {
    playChime();
    unlockNextScene();
  });
}

// SCENE 03: Personality Cards
const personalityCards = document.querySelectorAll(".personality-card");
const btnPersonalityNext = document.getElementById("btnPersonalityNext");
const cardsUnlockedNote = document.getElementById("cardsUnlockedNote");

personalityCards.forEach(card => {
  card.addEventListener("click", () => {
    const cardId = card.getAttribute("data-card");
    if (!card.classList.contains("revealed")) {
      card.classList.add("revealed");
      playChime();
      state.revealedCards.add(cardId);
      
      const count = state.revealedCards.size;
      cardsUnlockedNote.textContent = `${count} of 4 traits discovered`;
      
      if (count === 4) {
        btnPersonalityNext.classList.remove("disabled");
        cardsUnlockedNote.textContent = "All 4 qualities revealed! Ready to continue.";
        triggerConfettiBurst(25);
      }
    }
  });
});

if (btnPersonalityNext) {
  btnPersonalityNext.addEventListener("click", () => {
    if (state.revealedCards.size >= 4) {
      unlockNextScene();
    }
  });
}

// SCENE 04: Two Letters & Parchment Reader Modal
const letterModal = document.getElementById("letterModal");
const closeLetterModalBtn = document.getElementById("closeLetterModalBtn");
const finishReadingBtn = document.getElementById("finishReadingBtn");
const openIdrisBtn = document.getElementById("openIdrisLetterBtn");
const openDanielBtn = document.getElementById("openDanielLetterBtn");
const btnLettersNext = document.getElementById("btnLettersNext");

function openLetter(key) {
  const data = LETTERS_DATA[key];
  if (!data) return;

  document.getElementById("modalStampSeal").textContent = data.seal;
  document.getElementById("modalLetterDate").textContent = data.date;
  document.getElementById("modalLetterTitle").textContent = data.title;
  document.getElementById("modalLetterAuthor").textContent = data.author;
  document.getElementById("modalLetterContent").innerHTML = data.content;

  // Reset scroll strictly to top so she always reads from the start
  const parchmentSheet = document.querySelector(".parchment-sheet");
  if (parchmentSheet) {
    parchmentSheet.scrollTop = 0;
  }
  letterModal.scrollTop = 0;

  letterModal.classList.remove("hidden");
  playTone(400, 0.4);

  // Mark as read in state
  state.readLetters[key] = true;
  markLetterCardRead(key);
  checkBothLettersRead();
  saveProgress();
}

function markLetterCardRead(key) {
  const statusEl = document.getElementById(key === "idris" ? "statusIdris" : "statusDaniel");
  if (statusEl) {
    statusEl.textContent = "Opened & Cherished ✓";
    statusEl.classList.add("read");
  }
}

function checkBothLettersRead() {
  if (state.readLetters.idris && state.readLetters.daniel) {
    const notice = document.getElementById("lettersCompletionNotice");
    if (notice) notice.classList.add("visible");
  }
}

if (openIdrisBtn) openIdrisBtn.addEventListener("click", () => openLetter("idris"));
if (openDanielBtn) openDanielBtn.addEventListener("click", () => openLetter("daniel"));

function closeLetter() {
  letterModal.classList.add("hidden");
}

if (closeLetterModalBtn) closeLetterModalBtn.addEventListener("click", closeLetter);
if (finishReadingBtn) finishReadingBtn.addEventListener("click", closeLetter);
if (letterModal) {
  letterModal.addEventListener("click", (e) => {
    if (e.target === letterModal) closeLetter();
  });
}

if (btnLettersNext) {
  btnLettersNext.addEventListener("click", () => {
    unlockNextScene();
  });
}

// SCENE 05: ShazBeauty Chapter Next
const btnShazbeautyNext = document.getElementById("btnShazbeautyNext");

if (btnShazbeautyNext) {
  btnShazbeautyNext.addEventListener("click", () => {
    unlockNextScene();
  });
}

// SCENE 06: Funny Cards & "Abeg" Reaction Button
const funnyCardButtons = document.querySelectorAll(".funny-card-btn");
const jokeToast = document.getElementById("jokeToastMessage");
const abegBtn = document.getElementById("abegButton");
const abegCountEl = document.getElementById("abegCount");
const btnFunnyNext = document.getElementById("btnFunnyNext");

const ABEG_QUOTES = [
  "Abeg, leave me alone! 😂",
  "Did you two plan this disrespect?! 💀",
  "Daniel, I will knock that big head! 😭",
  "Idris, you're not getting party jollof again! 😹",
  "I'm calling my lawyer for emotional damages! 💅",
  "Super Mom has logged off! 🚗💨"
];

funnyCardButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const reaction = btn.getAttribute("data-reaction");
    jokeToast.textContent = reaction;
    playTone(600, 0.2, "triangle");
  });
});

if (abegBtn) {
  abegBtn.addEventListener("click", () => {
    state.abegCount++;
    abegCountEl.textContent = state.abegCount;
    const randomQuote = ABEG_QUOTES[state.abegCount % ABEG_QUOTES.length];
    jokeToast.textContent = randomQuote;
    playTone(500 + Math.random() * 200, 0.25, "square", 0.05);
    triggerConfettiBurst(12, abegBtn.getBoundingClientRect().left + 80, abegBtn.getBoundingClientRect().top);
  });
}

if (btnFunnyNext) {
  btnFunnyNext.addEventListener("click", () => {
    unlockNextScene();
  });
}

// SCENE 07: A Thousand Good Wishes
const wishItems = document.querySelectorAll(".wish-item");
const btnWishesNext = document.getElementById("btnWishesNext");

wishItems.forEach(wish => {
  wish.addEventListener("click", () => {
    const wishId = wish.getAttribute("data-wish");
    if (!wish.classList.contains("revealed")) {
      wish.classList.add("revealed");
      playChime();
      state.revealedWishes.add(wishId);
    }
  });
});

if (btnWishesNext) {
  btnWishesNext.addEventListener("click", () => {
    unlockNextScene();
  });
}

// SCENE 08: The Secret Vault Mechanism & Form
const vaultForm = document.getElementById("vaultForm");
const vaultPasswordInput = document.getElementById("vaultPasswordInput");
const vaultFeedback = document.getElementById("vaultFeedback");
const vaultHintContainer = document.getElementById("vaultHintContainer");
const vaultDial = document.getElementById("vaultDial");
const vaultStatusText = document.getElementById("vaultStatusText");
const vaultChamberContent = document.getElementById("vaultChamberContent");
const vaultTerminal = document.getElementById("vaultTerminal");
const btnVaultToFinale = document.getElementById("btnVaultToFinale");

function attemptVaultUnlock() {
  const entered = vaultPasswordInput.value.trim().toLowerCase().replace(/[\s\-_]/g, "");
  // Accepted answers: "supermom", "super-mom", "super mom"
  const validAnswers = ["supermom", "supermom!"];

  playVaultClick();

  if (validAnswers.includes(entered)) {
    // SUCCESS
    state.vaultUnlocked = true;
    vaultFeedback.className = "vault-feedback success";
    vaultFeedback.textContent = "✦ PASSWORD ACCEPTED! UNLOCKING VAULT... ✦";
    vaultStatusText.textContent = "ACCESS GRANTED · DECRYPTING ARCHIVE";
    
    vaultDial.classList.add("spinning");
    playVaultSuccess();
    triggerConfettiBurst(80);

    setTimeout(() => {
      vaultTerminal.classList.add("hidden");
      vaultChamberContent.classList.remove("hidden");
      saveProgress();
    }, 1400);

  } else {
    // WRONG PASSWORD
    state.vaultAttempts++;
    vaultFeedback.className = "vault-feedback error";
    
    if (state.vaultAttempts === 1) {
      vaultFeedback.textContent = "Not quite. Think about what we always call you! 😝";
    } else if (state.vaultAttempts === 2) {
      vaultFeedback.textContent = "Still incorrect. Who's always checking up on Idris & Daniel? 🤍";
    } else {
      vaultFeedback.textContent = "Incorrect password! Clue unlocked below 👇";
      vaultHintContainer.classList.remove("hidden");
    }

    vaultDial.classList.add("spinning");
    setTimeout(() => vaultDial.classList.remove("spinning"), 600);
  }
}

if (vaultForm) {
  vaultForm.addEventListener("submit", (e) => {
    e.preventDefault();
    attemptVaultUnlock();
  });
}

if (btnVaultToFinale) {
  btnVaultToFinale.addEventListener("click", () => {
    unlockNextScene();
  });
}

// SCENE 08 MEDIA GALLERY: Interactive Lightbox & Uploaders
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVideo = document.getElementById("lightboxVideo");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightboxBtn = document.getElementById("closeLightboxBtn");

function openLightbox(src, type, caption) {
  lightboxCaption.textContent = caption || "";
  if (type === "video") {
    lightboxImage.classList.add("hidden");
    lightboxVideo.classList.remove("hidden");
    lightboxVideo.src = src;
    try {
      lightboxVideo.play().catch(() => {});
    } catch(e) {}
  } else {
    try {
      lightboxVideo.pause();
    } catch(e) {}
    lightboxVideo.classList.add("hidden");
    lightboxImage.classList.remove("hidden");
    lightboxImage.src = src;
  }
  lightboxModal.classList.remove("hidden");
}

function closeLightbox() {
  lightboxModal.classList.add("hidden");
  try {
    lightboxVideo.pause();
    lightboxVideo.src = "";
  } catch(e) {}
}

if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
if (lightboxModal) {
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

// Media Grid Cards Click
function attachMediaCardListeners() {
  document.querySelectorAll(".media-card").forEach(card => {
    card.onclick = (e) => {
      const type = card.getAttribute("data-type");
      const caption = card.querySelector(".media-caption")?.textContent || "";
      if (type === "video") {
        const videoEl = card.querySelector("video");
        const src = videoEl ? (videoEl.querySelector("source")?.getAttribute("src") || videoEl.src) : "";
        if (src) openLightbox(src, "video", caption);
      } else {
        const img = card.querySelector("img");
        if (img) openLightbox(img.getAttribute("src"), "image", caption);
      }
    };
  });
}
attachMediaCardListeners();

// Play Video button inside Vault Video Card
const btnPlayVaultVideo = document.getElementById("btnPlayVaultVideo");
if (btnPlayVaultVideo) {
  btnPlayVaultVideo.addEventListener("click", (e) => {
    e.stopPropagation();
    const video = document.getElementById("vaultVideoPlayer");
    const src = video.querySelector("source")?.src || video.src;
    openLightbox(src, "video", "Special Video Tribute For Sharon");
  });
}

function updateMediaCounter() {
  const count = document.querySelectorAll(".media-card").length;
  const mediaCountText = document.getElementById("mediaCountText");
  if (mediaCountText) mediaCountText.textContent = `${count} Memories Stored`;
}

// SCENE 09: Finale Buttons
const btnTriggerConfetti = document.getElementById("btnTriggerConfetti");
const btnReadLettersAgain = document.getElementById("btnReadLettersAgain");
const btnReliveJourney = document.getElementById("btnReliveJourney");

let confettiClickStreak = 0;
let confettiLastClickTime = 0;

if (btnTriggerConfetti) {
  btnTriggerConfetti.addEventListener("click", () => {
    const now = Date.now();
    // If clicked fast (within 1000ms), increment streak
    if (now - confettiLastClickTime < 1000) {
      confettiClickStreak++;
    } else {
      confettiClickStreak = 1;
    }
    confettiLastClickTime = now;

    // Fast 3-clicks unlocks HUGE HEAVY CONFETTI
    if (confettiClickStreak >= 3) {
      triggerHeavyConfettiBurst();
    } else {
      triggerConfettiBurst(120);
    }
  });
}

if (btnReadLettersAgain) {
  btnReadLettersAgain.addEventListener("click", () => {
    goToScene(4);
  });
}

if (btnReliveJourney) {
  btnReliveJourney.addEventListener("click", () => {
    goToScene(1);
  });
}

// Top Bar Dropdown Toggle & Audio
const chapterTracker = document.getElementById("chapterTracker");
const chapterDropdown = document.getElementById("chapterDropdown");
const audioToggleBtn = document.getElementById("audioToggleBtn");

if (chapterTracker && chapterDropdown) {
  chapterTracker.addEventListener("click", (e) => {
    e.stopPropagation();
    chapterDropdown.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!chapterTracker.contains(e.target)) {
      chapterDropdown.classList.remove("open");
    }
  });
}

if (audioToggleBtn) {
  audioToggleBtn.addEventListener("click", toggleAudio);
}

// Prevent accidental mobile double-tap zoom & pinch-to-zoom
let lastTouchEndTime = 0;
document.addEventListener('touchend', (event) => {
  const now = Date.now();
  if (now - lastTouchEndTime <= 300) {
    event.preventDefault();
  }
  lastTouchEndTime = now;
}, { passive: false });

document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('gesturechange', (e) => e.preventDefault());
document.addEventListener('gestureend', (e) => e.preventDefault());

// Keyboard shortcuts (Escape to close modals)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLetter();
    closeLightbox();
  }
});

// INITIALIZE APP
window.addEventListener("DOMContentLoaded", () => {
  loadSavedProgress();
  updateChapterTrackerUI();
  updateMediaCounter();
  updateAudioButtonUI();
  // Attempt immediate auto-play
  try {
    startAmbientMusic();
  } catch (e) {
    console.log("Auto-audio waiting for first gesture", e);
  }
});
