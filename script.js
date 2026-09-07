const topbar = document.querySelector(".topbar");
const btn = document.querySelector(".menu-btn");

if (btn) {
  btn.addEventListener("click", () => topbar.classList.toggle("open"));
  document.querySelectorAll("nav a").forEach(a =>
    a.addEventListener("click", () => topbar.classList.remove("open"))
  );
}

/* Background music
   Autoplay with sound is blocked by many browsers. The music button
   starts/stops the audio from a real user interaction.
*/
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

function updateMusicButton() {
  if (!music || !musicLabel || !musicToggle) return;
  const playing = !music.paused;
  musicLabel.textContent = playing ? "PAUSE MUSIC" : "PLAY MUSIC";
  musicToggle.classList.toggle("playing", playing);
  musicToggle.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
}

async function toggleMusic() {
  if (!music) return;

  try {
    if (music.paused) {
      await music.play();
    } else {
      music.pause();
    }
  } catch (error) {
    console.warn("Musik gagal diputar:", error);
  }

  updateMusicButton();
}

if (musicToggle) {
  musicToggle.addEventListener("click", toggleMusic);
}

if (music) {
  music.addEventListener("play", updateMusicButton);
  music.addEventListener("pause", updateMusicButton);
  music.addEventListener("ended", updateMusicButton);
  music.addEventListener("error", () => {
    if (musicLabel) musicLabel.textContent = "MUSIC ERROR";
    console.error("File musik tidak dapat dimuat.");
  });
  updateMusicButton();
}
