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
const voiceoverList = document.getElementById("voiceoverList");
const walkthroughVideo = document.getElementById("walkthroughVideo");
const pitchVideoSection = document.getElementById("pitch-video");
const videoCaptionsText = document.getElementById("videoCaptionsText");
const chapterList = document.getElementById("chapterList");

const urlParams = new URLSearchParams(window.location.search);
const bossMode = urlParams.get("mode") === "boss";

let transcriptOpen = false;
let presentationMode = true;
let subtitleCues = [];

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

async function loadTranscript() {
  try {
    const response = await fetch("exports/demo-script.txt", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Transcript unavailable");
    }

    const script = await response.text();
    const blocks = script
      .split(/\r?\n\r?\n/)
      .map((block) => block.trim())
      .filter(Boolean);

    voiceoverList.innerHTML = blocks.map((block) => `<li>${block}</li>`).join("");
  } catch (_) {
    voiceoverList.innerHTML = "<li>Transcript unavailable.</li>";
  }
}

function parseVttTimestamp(value) {
  const [hours, minutes, secondsMillis] = value.split(":");
  const [seconds, millis] = secondsMillis.split(".");
  return (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds) + (Number(millis) / 1000);
}

function parseVtt(text) {
  return text
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter((block) => block.includes("-->"))
    .map((block) => {
      const lines = block.split(/\r?\n/).filter(Boolean);
      const timingLine = lines.find((line) => line.includes("-->"));
      const textLines = lines.slice(lines.indexOf(timingLine) + 1);
      const [start, end] = timingLine.split("-->").map((part) => part.trim());
      return {
        start: parseVttTimestamp(start),
        end: parseVttTimestamp(end),
        text: textLines.join(" ")
      };
    });
}

function formatChapterTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function renderChapters() {
  chapterList.innerHTML = subtitleCues.map((cue, index) => `
    <button class="chapter-button" type="button" data-chapter-index="${index}" data-start="${cue.start}">
      <span>${cue.text.split(":")[0]}</span>
      <span class="chapter-time">${formatChapterTime(cue.start)}</span>
    </button>
  `).join("");
}

function updateActiveChapter() {
  const currentTime = walkthroughVideo.currentTime;
  const buttons = Array.from(document.querySelectorAll(".chapter-button"));
  buttons.forEach((button) => {
    const start = Number(button.getAttribute("data-start"));
    const next = button.nextElementSibling ? Number(button.nextElementSibling.getAttribute("data-start")) : Number.POSITIVE_INFINITY;
    const active = currentTime >= start && currentTime < next;
    button.classList.toggle("is-active", active);
  });
}

async function loadSubtitles() {
  try {
    const response = await fetch("exports/ai-gateway-demo.vtt", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Subtitles unavailable");
    }

    subtitleCues = parseVtt(await response.text());
    renderChapters();
  } catch (_) {
    subtitleCues = [];
    videoCaptionsText.textContent = "Subtitles unavailable.";
    chapterList.innerHTML = "";
  }
}

function updateVisibleCaption() {
  const currentTime = walkthroughVideo.currentTime;
  const cue = subtitleCues.find((item) => currentTime >= item.start && currentTime <= item.end);
  videoCaptionsText.textContent = cue ? cue.text : "Subtitles will appear here during playback.";
  updateActiveChapter();
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

chapterList.addEventListener("click", async (event) => {
  const target = event.target.closest(".chapter-button");
  if (!target) {
    return;
  }

  walkthroughVideo.currentTime = Number(target.getAttribute("data-start"));
  updateVisibleCaption();
  try {
    await walkthroughVideo.play();
  } catch (_) {
    // Ignore playback restrictions.
  }
});

walkthroughVideo.addEventListener("timeupdate", () => {
  updateVisibleCaption();
});

walkthroughVideo.addEventListener("seeked", () => {
  updateVisibleCaption();
});

walkthroughVideo.addEventListener("ended", () => {
  updateVisibleCaption();
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
loadTranscript();
loadSubtitles();
