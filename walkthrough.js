const startPresentationButton = document.getElementById("startPresentationButton");
const startPresentationInlineButton = document.getElementById("startPresentationInlineButton");
const fullscreenVideoButton = document.getElementById("fullscreenVideoButton");
const togglePresentationModeButton = document.getElementById("togglePresentationModeButton");
const copyBossModeLinkButton = document.getElementById("copyBossModeLinkButton");
const copyCueCardButton = document.getElementById("copyCueCardButton");
const cueCardText = document.getElementById("cueCardText");
const copyVoiceoverButton = document.getElementById("copyVoiceoverButton");
const toggleTranscriptButton = document.getElementById("toggleTranscriptButton");
const transcriptDrawer = document.getElementById("transcriptDrawer");
const walkthroughVideo = document.getElementById("walkthroughVideo");
const pitchVideoSection = document.getElementById("pitch-video");

const urlParams = new URLSearchParams(window.location.search);
const bossMode = urlParams.get("mode") === "boss";

let transcriptOpen = false;
let presentationMode = true;

function renderPresentationMode() {
  document.body.classList.toggle("is-presentation-mode", presentationMode);
  document.body.classList.toggle("is-boss-mode", bossMode);
  togglePresentationModeButton.textContent = presentationMode ? "Presentation mode on" : "Presentation mode off";
  togglePresentationModeButton.setAttribute("aria-pressed", String(presentationMode));
}

function renderTranscript() {
  transcriptDrawer.classList.toggle("hidden", !transcriptOpen);
  toggleTranscriptButton.textContent = transcriptOpen ? "Hide transcript" : "Show transcript";
  toggleTranscriptButton.setAttribute("aria-expanded", String(transcriptOpen));
}

function buildBossModeUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", "boss");
  return url.toString();
}

async function requestVideoFullscreen() {
  if (document.fullscreenElement === walkthroughVideo) {
    return;
  }

  try {
    await walkthroughVideo.requestFullscreen();
  } catch (_) {
    // Ignore browser fullscreen restrictions.
  }
}

async function startPresentation() {
  presentationMode = true;
  transcriptOpen = false;
  renderTranscript();
  renderPresentationMode();
  pitchVideoSection.scrollIntoView({ behavior: "smooth", block: "start" });
  walkthroughVideo.currentTime = 0;

  try {
    await walkthroughVideo.play();
  } catch (_) {
    // Browsers may require a direct interaction before playback starts.
  }

  await requestVideoFullscreen();
}

async function copyText(button, text, defaultLabel) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
  } catch (_) {
    button.textContent = "Copy failed";
  }

  window.setTimeout(() => {
    button.textContent = defaultLabel;
  }, 1400);
}

startPresentationButton.addEventListener("click", () => {
  startPresentation();
});

startPresentationInlineButton.addEventListener("click", async () => {
  walkthroughVideo.currentTime = 0;
  try {
    await walkthroughVideo.play();
  } catch (_) {
    // Ignore playback restrictions.
  }
});

fullscreenVideoButton.addEventListener("click", async () => {
  if (document.fullscreenElement === walkthroughVideo) {
    try {
      await document.exitFullscreen();
    } catch (_) {
      // Ignore exit errors.
    }
    return;
  }

  await requestVideoFullscreen();
});

togglePresentationModeButton.addEventListener("click", () => {
  presentationMode = !presentationMode;
  renderPresentationMode();
});

copyBossModeLinkButton.addEventListener("click", () => {
  copyText(copyBossModeLinkButton, buildBossModeUrl(), "Copy boss-mode link");
});

copyCueCardButton.addEventListener("click", () => {
  copyText(copyCueCardButton, cueCardText.textContent.trim(), "Copy cue card");
});

copyVoiceoverButton.addEventListener("click", () => {
  const transcript = Array.from(document.querySelectorAll("#voiceoverList li"))
    .map((item) => item.textContent.trim())
    .join("\n\n");
  copyText(copyVoiceoverButton, transcript, "Copy script");
});

toggleTranscriptButton.addEventListener("click", () => {
  transcriptOpen = !transcriptOpen;
  renderTranscript();
});

document.addEventListener("fullscreenchange", () => {
  fullscreenVideoButton.textContent = document.fullscreenElement === walkthroughVideo ? "Exit fullscreen" : "Fullscreen";
});

if (bossMode) {
  presentationMode = true;
  transcriptOpen = false;
}

renderTranscript();
renderPresentationMode();
