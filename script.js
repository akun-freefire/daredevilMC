const topbar = document.querySelector(".topbar");
const btn = document.querySelector(".menu-btn");

if (btn) {
  btn.addEventListener("click", () => topbar.classList.toggle("open"));
  document.querySelectorAll("nav a").forEach(a =>
    a.addEventListener("click", () => topbar.classList.remove("open"))
  );
}

/* Background music:
   - Starts automatically when the browser allows it.
   - A first tap/click enables sound after the browser's autoplay restriction.
   - Double-tap/double-click anywhere toggles play/pause.
*/
const music = document.getElementById("bgMusic");
let musicStarted = false;

async function startMusic(withSound = false) {
  if (!music) return;
  try {
    if (withSound) music.muted = false;
    await music.play();
    musicStarted = true;
  } catch (err) {
    // Mobile browsers may require a user gesture before playback.
  }
}

function toggleMusic() {
  if (!music) return;

  if (music.paused) {
    music.muted = false;
    startMusic(true);
  } else {
    music.pause();
  }
}

// Try autoplay immediately (muted is allowed by most mobile browsers).
startMusic(false);

// The first normal tap enables audio if autoplay was blocked.
document.addEventListener("pointerdown", () => {
  if (!musicStarted) startMusic(true);
}, { once: true, passive: true });

// Double tap / double click anywhere = pause/play.
let lastTap = 0;
document.addEventListener("pointerup", (event) => {
  const now = Date.now();
  if (now - lastTap < 350) {
    event.preventDefault();
    toggleMusic();
    lastTap = 0;
  } else {
    lastTap = now;
  }
}, { passive: false });

document.addEventListener("dblclick", (event) => {
  event.preventDefault();
  toggleMusic();
});
