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


function updateMusicButton() {
  if (!music || !musicToggle) return;
  const playing = !music.paused;
  musicToggle.classList.toggle("playing", playing);
  musicToggle.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
  musicToggle.setAttribute("aria-pressed", String(playing));
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
    console.error("File musik tidak dapat dimuat.");
  });
  updateMusicButton();
}

// Music navigation buttons
const musicPrev = document.getElementById("musicPrev");
const musicNext = document.getElementById("musicNext");

if (musicPrev && music) {
  musicPrev.addEventListener("click", async () => {
    music.currentTime = 0;
    if (music.paused) {
      try { await music.play(); } catch (error) { console.warn("Musik gagal diputar:", error); }
    }
    updateMusicButton();
  });
}

if (musicNext && music) {
  musicNext.addEventListener("click", async () => {
    music.currentTime = Math.min(
      Math.max(0, music.duration || music.currentTime + 10),
      music.currentTime + 10
    );
    if (music.paused) {
      try { await music.play(); } catch (error) { console.warn("Musik gagal diputar:", error); }
    }
    updateMusicButton();
  });
}
