// ============================================
// MOOD SWINGS — Mood-Based YouTube Playlists
// ============================================

const menuBtn = document.getElementById("menuBtn");
const homeBtn = document.getElementById("homeBtn");
const profileBtn = document.getElementById("profileBtn");
const moodCards = document.querySelectorAll(".mood-card");
const moodGrid = document.getElementById("moodGrid");
const sidePanel = document.getElementById("sidePanel");
const sideOverlay = document.getElementById("sideOverlay");
const sidePanelClose = document.getElementById("sidePanelClose");
const profileDropdown = document.getElementById("profileDropdown");
const hero = document.getElementById("hero");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const heroPlayBtn = document.getElementById("heroPlayBtn");

// Sign-in DOM references
const signinModal = document.getElementById("signinModal");
const closeSigninBtn = document.getElementById("closeSigninBtn");
const signinForm = document.getElementById("signinForm");
const signinName = document.getElementById("signinName");
const signinEmail = document.getElementById("signinEmail");
const profileDropdownMain = document.getElementById("profileDropdownMain");
const profileDropdownText = document.getElementById("profileDropdownText");
const logoutBtn = document.getElementById("logoutBtn");

// Quiz DOM references
const quizBtn = document.getElementById("quizBtn");
const quizModal = document.getElementById("quizModal");
const closeQuizBtn = document.getElementById("closeQuizBtn");
const startQuizBtn = document.getElementById("startQuizBtn");
const quizIntro = document.getElementById("quizIntro");
const q1Slide = document.getElementById("q1Slide");
const q2Slide = document.getElementById("q2Slide");
const q3Slide = document.getElementById("q3Slide");
const resultSlide = document.getElementById("resultSlide");
const recommendedMoodBadge = document.getElementById("recommendedMoodBadge");
const recommendedMoodDesc = document.getElementById("recommendedMoodDesc");
const quizPlayBtn = document.getElementById("quizPlayBtn");
const quizRetryBtn = document.getElementById("quizRetryBtn");
const quizOpts = document.querySelectorAll(".quiz-opt");

// ============================================
// Toast notification
// ============================================
function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("toast--visible"), 10);
  setTimeout(() => {
    toast.classList.remove("toast--visible");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================
// Open a mood's YouTube search in a new tab
// ============================================
function loadMood(moodId) {
  const mood = moods[moodId];
  if (!mood) return;

  saveLastMood(moodId);
  updateNowPlaying(moodId);

  // Close previous tab before opening new one
  if (currentYoutubeTab && !currentYoutubeTab.closed) {
    try { currentYoutubeTab.close(); } catch (e) {}
  }

  const searchQuery = encodeURIComponent(`${mood.title} songs playlist`);
  const ytWindow = window.open(
    `https://www.youtube.com/results?search_query=${searchQuery}`,
    "_blank"
  );
  // If popup blocked, show a toast
  if (!ytWindow || ytWindow.closed || typeof ytWindow.closed === "undefined") {
    showToast("Please allow popups to open YouTube playlists");
  } else {
    currentYoutubeTab = ytWindow;
  }
}

// ============================================
// Remember Last Mood (localStorage)
// ============================================
function saveLastMood(moodId) {
  try {
    localStorage.setItem("moodswings_last_mood", moodId);
  } catch (e) {}
}

// ============================================
// Side panel
// ============================================
function openSidePanel() {
  sidePanel.classList.add("side-panel--open");
  sideOverlay.classList.add("side-overlay--visible");
  document.body.style.overflow = "hidden";
}

function closeSidePanel() {
  sidePanel.classList.remove("side-panel--open");
  sideOverlay.classList.remove("side-overlay--visible");
  document.body.style.overflow = "";
}

// ============================================
// Profile dropdown
// ============================================
function toggleProfileDropdown(e) {
  e.stopPropagation();
  profileDropdown.classList.toggle("profile-dropdown--visible");
  closeSidePanel();
}

function closeProfileDropdown() {
  profileDropdown.classList.remove("profile-dropdown--visible");
}

// ============================================
// Reset to home
// ============================================
function resetToHome() {
  moodCards.forEach(c => c.classList.remove("active"));
  closeSidePanel();
  closeProfileDropdown();
}

// ============================================
// Event Listeners
// ============================================

// Mood card clicks
moodCards.forEach((card) => {
  card.addEventListener("click", () => {
    moodCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    loadMood(card.dataset.mood);
  });
});

// Hero play button (defaults to happy)
heroPlayBtn.addEventListener("click", () => {
  moodCards.forEach(c => c.classList.remove("active"));
  const happyCard = document.querySelector('.mood-card.happy');
  if (happyCard) happyCard.classList.add("active");
  loadMood("happy");
});

let currentYoutubeTab = null;
const moodOrder = ["happy", "sad", "romantic", "motivated", "energetic"];
let currentMoodId = null;
let isPlaying = false;
let isCollapsed = false;

// Now Playing footer — DOM refs
const nowPlaying = document.getElementById("nowPlaying");
const npBar = document.getElementById("npBar");
const npPill = document.getElementById("npPill");
const npMoodLabel = document.getElementById("npMoodLabel");
const npPillLabel = document.getElementById("npPillLabel");
const npFav = document.getElementById("npFav");
const npPlay = document.getElementById("npPlay");
const npPrev = document.getElementById("npPrev");
const npNext = document.getElementById("npNext");
const npCollapse = document.getElementById("npCollapse");

function updateNowPlaying(moodId) {
  const mood = moods[moodId];
  if (!mood) return;
  currentMoodId = moodId;
  isPlaying = true;
  isCollapsed = false;

  npMoodLabel.textContent = mood.title;
  npPillLabel.textContent = mood.title;
  updateFavIcon(moodId);
  resetPlayIcon();
  nowPlaying.style.display = "block";
  npBar.style.display = "flex";
  npPill.style.display = "none";

  try { localStorage.setItem("moodswings_now_playing", moodId); } catch (e) {}
}

function clearNowPlaying() {
  if (currentYoutubeTab && !currentYoutubeTab.closed) {
    try { currentYoutubeTab.close(); } catch (e) {}
  }
  currentYoutubeTab = null;
  currentMoodId = null;
  isPlaying = false;
  isCollapsed = false;
  nowPlaying.style.display = "none";
  try { localStorage.removeItem("moodswings_now_playing"); } catch (e) {}
}

// ---- Favorites (heart toggle) ----
function getFavorites() {
  try { return JSON.parse(localStorage.getItem("moodswings_favorites") || "[]"); } catch (e) { return []; }
}
function saveFavorites(favs) {
  try { localStorage.setItem("moodswings_favorites", JSON.stringify(favs)); } catch (e) {}
}
function updateFavIcon(moodId) {
  const favs = getFavorites();
  const icon = npFav.querySelector("i");
  if (favs.includes(moodId)) {
    icon.className = "fa-solid fa-heart";
    npFav.classList.add("np-fav--active");
  } else {
    icon.className = "fa-regular fa-heart";
    npFav.classList.remove("np-fav--active");
  }
}

npFav.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!currentMoodId) return;
  const favs = getFavorites();
  const idx = favs.indexOf(currentMoodId);
  if (idx === -1) {
    favs.push(currentMoodId);
    showToast("Added to favorites");
  } else {
    favs.splice(idx, 1);
    showToast("Removed from favorites");
  }
  saveFavorites(favs);
  updateFavIcon(currentMoodId);
});

// ---- Previous / Next ----
function goToMood(moodId) {
  moodCards.forEach(c => c.classList.remove("active"));
  const card = document.querySelector(`.mood-card.${moodId}`);
  if (card) card.classList.add("active");
  loadMood(moodId);
}

npPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!currentMoodId) return;
  const idx = moodOrder.indexOf(currentMoodId);
  const prev = moodOrder[(idx - 1 + moodOrder.length) % moodOrder.length];
  goToMood(prev);
});

npNext.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!currentMoodId) return;
  const idx = moodOrder.indexOf(currentMoodId);
  const next = moodOrder[(idx + 1) % moodOrder.length];
  goToMood(next);
});

// ---- Play / Pause visual toggle ----
function resetPlayIcon() {
  const icon = npPlay.querySelector("i");
  icon.className = "fa-solid fa-play";
  isPlaying = true;
}

npPlay.addEventListener("click", (e) => {
  e.stopPropagation();
  const icon = npPlay.querySelector("i");
  if (isPlaying) {
    icon.className = "fa-solid fa-pause";
    isPlaying = false;
  } else {
    icon.className = "fa-solid fa-play";
    isPlaying = true;
  }
  showToast("Visual only — control playback in the YouTube tab");
});

// ---- Collapse / Expand ----
npCollapse.addEventListener("click", (e) => {
  e.stopPropagation();
  isCollapsed = true;
  npBar.style.display = "none";
  npPill.style.display = "flex";
});

npPill.addEventListener("click", () => {
  isCollapsed = false;
  npPill.style.display = "none";
  npBar.style.display = "flex";
});

// ---- Restore from localStorage ----
(function restoreNowPlaying() {
  const saved = (() => { try { return localStorage.getItem("moodswings_now_playing"); } catch (e) { return null; } })();
  if (saved && moods[saved]) {
    updateNowPlaying(saved);
  }
})();

// Nav icons
menuBtn.addEventListener("click", () => {
  closeProfileDropdown();
  openSidePanel();
});

homeBtn.addEventListener("click", () => window.location.reload());

profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isUserSignedIn()) {
    toggleProfileDropdown(e);
  } else {
    openSigninModal();
  }
});

// Search bar — open YouTube search in new tab
const searchInput = document.getElementById("searchInput");
const searchIcon = document.querySelector(".search-icon");

function doSearch() {
  const query = searchInput.value.trim();
  if (!query) return;
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  window.open(url, "_blank");
  searchInput.value = "";
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});

searchIcon.addEventListener("click", doSearch);

// Side panel close
sidePanelClose.addEventListener("click", closeSidePanel);
sideOverlay.addEventListener("click", closeSidePanel);

// Side panel nav links
document.querySelectorAll(".side-panel-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const action = link.dataset.action;
    if (action === "home") {
      resetToHome();
    } else if (action === "browse") {
      closeSidePanel();
      document.querySelector(".mood-section").scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action === "about") {
      closeSidePanel();
      openAboutModal();
    } else if (action === "contact") {
      closeSidePanel();
      openContactModal();
    } else {
      closeSidePanel();
      showToast(`${link.textContent.trim()} page — coming soon`);
    }
  });
});

// Profile dropdown sign-in / logout buttons
profileDropdownMain.addEventListener("click", () => {
  closeProfileDropdown();
  if (!isUserSignedIn()) {
    openSigninModal();
  }
});

logoutBtn.addEventListener("click", () => {
  closeProfileDropdown();
  logoutUser();
});

// Close profile dropdown on outside click
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
    closeProfileDropdown();
  }
});

// ============================================
// Sign In / Logout Logic
// ============================================
function openSigninModal() {
  signinModal.classList.add("modal-open");
  signinModal.style.display = "flex";
  signinName.value = "";
  signinEmail.value = "";
}

function closeSigninModal() {
  signinModal.classList.remove("modal-open");
  setTimeout(() => {
    signinModal.style.display = "none";
  }, 300);
}

closeSigninBtn.addEventListener("click", closeSigninModal);
signinModal.addEventListener("click", (e) => {
  if (e.target === signinModal) closeSigninModal();
});

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = signinName.value.trim();
  const email = signinEmail.value.trim();
  if (!name || !email) return;
  const user = { name, email };
  try {
    localStorage.setItem("moodswings_user", JSON.stringify(user));
  } catch (err) {}
  updateProfileUI();
  closeSigninModal();
  showToast(`Welcome, ${name}!`);
});

function isUserSignedIn() {
  try {
    return !!localStorage.getItem("moodswings_user");
  } catch (e) {
    return false;
  }
}

function getUserInfo() {
  try {
    const raw = localStorage.getItem("moodswings_user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function logoutUser() {
  try {
    localStorage.removeItem("moodswings_user");
  } catch (e) {}
  updateProfileUI();
  showToast("Logged out");
}

function updateProfileUI() {
  const user = getUserInfo();
  if (user) {
    profileDropdownText.textContent = user.name;
    profileDropdownMain.style.pointerEvents = "none";
    profileDropdownMain.style.cursor = "default";
    profileDropdownMain.querySelector("i").className = "fa-solid fa-circle-check";
    logoutBtn.style.display = "flex";
  } else {
    profileDropdownText.textContent = "Sign In";
    profileDropdownMain.style.pointerEvents = "";
    profileDropdownMain.style.cursor = "";
    profileDropdownMain.querySelector("i").className = "fa-solid fa-arrow-right-to-bracket";
    logoutBtn.style.display = "none";
  }
}

// Init profile UI on page load
updateProfileUI();

// About modal
const aboutModal = document.getElementById("aboutModal");
const closeAboutBtn = document.getElementById("closeAboutBtn");

function openAboutModal() {
  aboutModal.classList.add("modal-open");
  aboutModal.style.display = "flex";
}

function closeAboutModal() {
  aboutModal.classList.remove("modal-open");
  setTimeout(() => {
    aboutModal.style.display = "none";
  }, 300);
}

closeAboutBtn.addEventListener("click", closeAboutModal);
aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) closeAboutModal();
});

// Contact modal
const contactModal = document.getElementById("contactModal");
const closeContactBtn = document.getElementById("closeContactBtn");
const contactForm = document.getElementById("contactForm");

function openContactModal() {
  contactModal.classList.add("modal-open");
  contactModal.style.display = "flex";
}

function closeContactModal() {
  contactModal.classList.remove("modal-open");
  setTimeout(() => {
    contactModal.style.display = "none";
  }, 300);
}

closeContactBtn.addEventListener("click", closeContactModal);
contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) closeContactModal();
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closeContactModal();
  contactForm.reset();
  showToast("Message sent! We'll get back to you soon.");
});

// Logo click → home (gentle reset, not full reload)
document.querySelector(".nav-logo").addEventListener("click", resetToHome);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "Escape") {
    closeSidePanel();
    closeProfileDropdown();
    closeQuiz();
    closeSigninModal();
    closeAboutModal();
    closeContactModal();
  }
});

// ============================================
// Mood Quiz / Mood Detector Logic
// ============================================
let quizAnswers = { q1: "", q2: "", q3: "" };
let recommendedMood = "";

function openQuiz() {
  quizModal.classList.add("modal-open");
  quizModal.style.display = "flex";
  resetQuiz();
}

function closeQuiz() {
  if (!quizModal) return;
  quizModal.classList.remove("modal-open");
  setTimeout(() => {
    quizModal.style.display = "none";
  }, 300);
}

function resetQuiz() {
  quizAnswers = { q1: "", q2: "", q3: "" };
  recommendedMood = "";
  
  quizIntro.style.display = "flex";
  q1Slide.style.display = "none";
  q2Slide.style.display = "none";
  q3Slide.style.display = "none";
  resultSlide.style.display = "none";
}

startQuizBtn.addEventListener("click", () => {
  quizIntro.style.display = "none";
  q1Slide.style.display = "flex";
});

quizOpts.forEach(opt => {
  opt.addEventListener("click", () => {
    const questionNum = opt.dataset.q;
    const value = opt.dataset.val;

    if (questionNum === "1") {
      quizAnswers.q1 = value;
      q1Slide.style.display = "none";
      q2Slide.style.display = "flex";
    } else if (questionNum === "2") {
      quizAnswers.q2 = value;
      q2Slide.style.display = "none";
      q3Slide.style.display = "flex";
    } else if (questionNum === "3") {
      quizAnswers.q3 = value;
      q3Slide.style.display = "none";
      showQuizResult();
    }
  });
});

function showQuizResult() {
  recommendedMood = calculateSuggestedMood();
  
  recommendedMoodBadge.className = "result-badge " + recommendedMood;
  recommendedMoodBadge.textContent = recommendedMood.charAt(0).toUpperCase() + recommendedMood.slice(1);
  
  if (moods[recommendedMood]) {
    recommendedMoodDesc.textContent = moods[recommendedMood].description;
  }
  
  resultSlide.style.display = "flex";
}

function calculateSuggestedMood() {
  const scores = {
    happy: 0,
    sad: 0,
    romantic: 0,
    motivated: 0,
    energetic: 0
  };

  // Q1: Energy level
  if (quizAnswers.q1 === "low") {
    scores.sad += 2;
    scores.romantic += 1;
  } else if (quizAnswers.q1 === "medium") {
    scores.happy += 1;
    scores.romantic += 1;
    scores.motivated += 1;
  } else if (quizAnswers.q1 === "high") {
    scores.energetic += 2;
    scores.motivated += 1;
  }

  // Q2: Calmer vs Pumped up
  if (quizAnswers.q2 === "calmer") {
    scores.sad += 1;
    scores.romantic += 2;
  } else if (quizAnswers.q2 === "pumped") {
    scores.happy += 1;
    scores.motivated += 2;
    scores.energetic += 2;
  }

  // Q3: What's on your mind?
  if (quizAnswers.q3 === "fun") {
    scores.happy += 2;
    scores.energetic += 1;
  } else if (quizAnswers.q3 === "deep") {
    scores.sad += 2;
    scores.motivated += 2;
    scores.romantic += 1;
  } else if (quizAnswers.q3 === "vibing") {
    scores.romantic += 2;
    scores.happy += 1;
    scores.energetic += 1;
  }

  let bestMood = "happy";
  let maxScore = -1;
  for (const mood in scores) {
    if (scores[mood] > maxScore) {
      maxScore = scores[mood];
      bestMood = mood;
    }
  }
  return bestMood;
}

quizPlayBtn.addEventListener("click", () => {
  if (recommendedMood) {
    moodCards.forEach(c => c.classList.remove("active"));
    const card = document.querySelector(`.mood-card.${recommendedMood}`);
    if (card) card.classList.add("active");
    
    loadMood(recommendedMood);
    closeQuiz();
  }
});

quizRetryBtn.addEventListener("click", resetQuiz);

quizBtn.addEventListener("click", openQuiz);
closeQuizBtn.addEventListener("click", closeQuiz);
quizModal.addEventListener("click", (e) => {
  if (e.target === quizModal) {
    closeQuiz();
  }
});
