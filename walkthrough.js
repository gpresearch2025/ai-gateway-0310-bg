const reelStepEyebrow = document.getElementById("reelStepEyebrow");
const reelStepTitle = document.getElementById("reelStepTitle");
const reelStepBody = document.getElementById("reelStepBody");
const reelTags = document.getElementById("reelTags");
const reelProgressBar = document.getElementById("reelProgressBar");
const reelStepList = document.getElementById("reelStepList");
const reelStatus = document.getElementById("reelStatus");
const voiceStatus = document.getElementById("voiceStatus");
const playReelButton = document.getElementById("playReelButton");
const pauseReelButton = document.getElementById("pauseReelButton");
const restartReelButton = document.getElementById("restartReelButton");
const startPresentationButton = document.getElementById("startPresentationButton");
const startPresentationInlineButton = document.getElementById("startPresentationInlineButton");
const copyBossModeLinkButton = document.getElementById("copyBossModeLinkButton");
const toggleVoiceButton = document.getElementById("toggleVoiceButton");
const fullscreenPitchButton = document.getElementById("fullscreenPitchButton");
const toggleStepListButton = document.getElementById("toggleStepListButton");
const togglePresentationModeButton = document.getElementById("togglePresentationModeButton");
const narrationLine = document.getElementById("narrationLine");
const captionTitle = document.getElementById("captionTitle");
const captionStep = document.getElementById("captionStep");
const voiceoverList = document.getElementById("voiceoverList");
const copyVoiceoverButton = document.getElementById("copyVoiceoverButton");
const copyCueCardButton = document.getElementById("copyCueCardButton");
const cueCardText = document.getElementById("cueCardText");
const toggleTranscriptButton = document.getElementById("toggleTranscriptButton");
const pitchFeatureStrip = document.getElementById("pitchFeatureStrip");
const mockLanePanel = document.getElementById("mockLanePanel");
const mockBoundaryPanel = document.getElementById("mockBoundaryPanel");
const mockResultPanel = document.getElementById("mockResultPanel");
const laneBoardCards = Array.from(document.querySelectorAll("[data-lane-card]"));
const filmOutcomeTitle = document.getElementById("filmOutcomeTitle");
const filmOutcomeBody = document.getElementById("filmOutcomeBody");
const filmBoundaryTitle = document.getElementById("filmBoundaryTitle");
const filmBoundaryBody = document.getElementById("filmBoundaryBody");
const reelStage = document.querySelector(".reel-stage");
const filmCards = Array.from(document.querySelectorAll(".film-card"));
const prototypeFrame = document.getElementById("prototypeFrame");
const prototypeViewLabel = document.getElementById("prototypeViewLabel");
const prototypeFrameShell = document.getElementById("prototypeFrameShell");
const prototypeFrameStatus = document.getElementById("prototypeFrameStatus");
const stepListDrawer = document.getElementById("stepListDrawer");
const transcriptDrawer = document.getElementById("transcriptDrawer");
const pitchVideoSection = document.getElementById("pitch-video");
const urlParams = new URLSearchParams(window.location.search);

const laneAccents = {
  deterministic: "#b88a2b",
  private: "#0f766e",
  "private-plus": "#2b6cb0",
  "max-intelligence": "#a24d57",
  mixed: "#123448"
};

const reelSteps = [
  {
    eyebrow: "What this is",
    title: "Consentext AI Gateway is the product layer for governed health AI routing",
    body: "This website demonstrates a product that decides how a sensitive health request should be handled before any AI work happens.",
    tags: ["Product overview", "Sensitive health AI", "Trust boundary"],
    narration: "This is Consentext AI Gateway. It is the governed product layer for sensitive health AI requests. The trust boundary is chosen before any AI action happens.",
    lane: "Private",
    activeLaneIds: ["private"],
    accent: "private",
    boundary: "Protected internal AI",
    result: "Governed entry point for sensitive health requests",
    appViewLabel: "Private review state",
    appViewUrl: "index.html?lane=private&task=a1c&step=review&scene=private-anchor"
  },
  {
    eyebrow: "Core product choice",
    title: "The lane is the product decision, not just the model choice",
    body: "The product is organized around four lanes. Each lane changes the privacy boundary, outside usage, payload handling, approval requirements, and return flow.",
    tags: ["Four lanes", "Capability versus protection", "User-visible choice"],
    narration: "The main feature is the lane system, not a model picker. Each lane changes the boundary, the controls, and the return behavior.",
    lane: "All lanes",
    activeLaneIds: ["deterministic", "private", "private-plus", "max-intelligence"],
    accent: "mixed",
    boundary: "User chooses trust level first",
    result: "Different product behavior by lane",
    appViewLabel: "Gateway home and lane board",
    appViewUrl: "index.html?lane=private&task=a1c&step=compose"
  },
  {
    eyebrow: "Four lanes",
    title: "Deterministic, Private, Private Plus, and Max Intelligence",
    body: "Deterministic stays fact first. Private keeps sensitive interpretation inside. Private Plus allows reduced external payloads. Max Intelligence allows the broadest supported outside assistance.",
    tags: ["Deterministic", "Private", "Private Plus", "Max Intelligence"],
    narration: "The four lanes are Deterministic, Private, Private Plus, and Max Intelligence. Each one is a real product choice with a different protection and capability tradeoff.",
    lane: "Deterministic to Max Intelligence",
    activeLaneIds: ["deterministic", "private", "private-plus", "max-intelligence"],
    accent: "mixed",
    boundary: "Capability rises as boundary broadens",
    result: "Different outputs and control surfaces",
    appViewLabel: "All-lane comparison setup",
    appViewUrl: "index.html?lane=private-plus&task=visit&step=result&scene=bridge-lane"
  },
  {
    eyebrow: "Task composer",
    title: "The same request can be run across lanes for a fair comparison",
    body: "The task composer keeps the demo grounded. It lets the team run the same task repeatedly so lane differences are easy to compare instead of hidden by different prompts.",
    tags: ["Task composer", "Repeatable tasks", "Compare fairly"],
    narration: "The task composer keeps the comparison honest. The same request runs across different lanes so the team can compare real behavior, not unrelated examples.",
    lane: "Task composer",
    activeLaneIds: ["private", "private-plus"],
    accent: "private-plus",
    boundary: "Same task, different trust choices",
    result: "Fair lane-to-lane comparison",
    appViewLabel: "Task composer state",
    appViewUrl: "index.html?lane=private&task=a1c&step=compose"
  },
  {
    eyebrow: "Guidance",
    title: "The product can recommend the right lane for the task",
    body: "Recommendation guidance explains which lane fits the request, and why. That makes the product feel intentional rather than leaving trust decisions unexplained.",
    tags: ["Recommended lane", "Why this lane", "Guided choice"],
    narration: "The product includes task-aware lane guidance. It recommends the right lane for the request and explains why.",
    lane: "Recommended lane",
    activeLaneIds: ["private"],
    accent: "private",
    boundary: "Guidance before send",
    result: "Choice feels intentional",
    appViewLabel: "Recommendation and selected lane",
    appViewUrl: "index.html?lane=private&task=a1c&step=compose"
  },
  {
    eyebrow: "Boundary review",
    title: "Nothing runs until the boundary is reviewed",
    body: "The review step shows what stays inside Consentext, what may leave, which controls apply, and whether approval is required before the request can continue.",
    tags: ["Boundary review", "Controls", "Before send"],
    narration: "Before any request runs, the product stops at boundary review. It makes clear what stays inside, what may leave, and which controls are active.",
    lane: "Boundary review",
    activeLaneIds: ["private-plus"],
    accent: "private-plus",
    boundary: "Inside, outside, and controls listed",
    result: "No hidden send step",
    appViewLabel: "Private Plus boundary review",
    appViewUrl: "index.html?lane=private-plus&task=visit&step=review&scene=bridge-lane"
  },
  {
    eyebrow: "External controls",
    title: "External lanes keep approval and connection choices visible",
    body: "Private Plus and Max Intelligence show approval requirements, reduced or broader payload previews, and connection modes such as Consentext-managed or bring your own key.",
    tags: ["Approval gating", "Payload preview", "BYOK and managed"],
    narration: "For the external lanes, the site keeps approval, payload minimization, and provider connection mode visible, including Consentext-managed and bring your own key options.",
    lane: "Private Plus and Max Intelligence",
    activeLaneIds: ["private-plus", "max-intelligence"],
    accent: "max-intelligence",
    boundary: "Approval plus payload preview",
    result: "Managed or BYOK connection mode",
    appViewLabel: "Broad mode external controls",
    appViewUrl: "index.html?lane=max-intelligence&task=prep&step=review&scene=broad-mode"
  },
  {
    eyebrow: "Results",
    title: "The answer returns with provenance and audit",
    body: "The result screen is not just an answer. It includes lane labeling, provenance chips, record references, and a plain-English audit trail of what happened.",
    tags: ["Lane-labeled result", "Provenance", "Audit trail"],
    narration: "When the result comes back, it is lane labeled and returned through Consentext. Provenance, references, and the audit trail stay visible.",
    lane: "Result screen",
    activeLaneIds: ["private"],
    accent: "private",
    boundary: "Returned through Consentext",
    result: "Provenance, references, and audit",
    appViewLabel: "Private result and audit",
    appViewUrl: "index.html?lane=private&task=a1c&step=result&scene=private-anchor"
  },
  {
    eyebrow: "Comparison",
    title: "All lanes can be compared side by side",
    body: "The compare view lines up boundary, connection, payload, and output style across all four lanes so the tradeoffs are easy to scan quickly.",
    tags: ["Compare all lanes", "Boundary", "Connection", "Output"],
    narration: "The compare view makes the tradeoffs easy to scan. The same task is compared across all four lanes for boundary, connection, payload, and output.",
    lane: "Compare view",
    activeLaneIds: ["deterministic", "private", "private-plus", "max-intelligence"],
    accent: "mixed",
    boundary: "Side-by-side boundary model",
    result: "Fast scan of all tradeoffs",
    appViewLabel: "Compare all lanes view",
    appViewUrl: "index.html?lane=private-plus&task=visit&step=result&scene=bridge-lane"
  },
  {
    eyebrow: "Presenter workflow",
    title: "The prototype includes review, export, and presenter tooling",
    body: "The site includes demo scenes, review mode, presenter help, notes, script, review summary, copy and export actions, share links, and local persistence.",
    tags: ["Demo scenes", "Review mode", "Export and share", "Persistence"],
    narration: "The prototype also includes presenter tools: demo scenes, review mode, notes, script, exportable summaries, share links, and persistent state.",
    lane: "Presenter tools",
    activeLaneIds: ["private", "private-plus"],
    accent: "private-plus",
    boundary: "Internal review support",
    result: "Reusable and demo-ready workflow",
    appViewLabel: "Presenter workflow state",
    appViewUrl: "index.html?lane=private-plus&task=visit&step=result&scene=bridge-lane"
  },
  {
    eyebrow: "Why it matters",
    title: "This is a governed product layer, not a generic AI front end",
    body: "The key business point is that Consentext keeps the trust boundary and governance visible. Direct outside AI user-interface handoff is off the board, and the product stays in the middle.",
    tags: ["Governed routing", "No direct handoff", "Product moat"],
    narration: "The main takeaway is that this is not a generic AI front end. It is a governed product layer that keeps the trust boundary explicit and keeps Consentext in the middle.",
    lane: "Strategic takeaway",
    activeLaneIds: ["private", "deterministic"],
    accent: "deterministic",
    boundary: "Governed middle layer",
    result: "Differentiated product story",
    appViewLabel: "Deterministic trust anchor",
    appViewUrl: "index.html?lane=deterministic&task=care-gap&step=result&scene=fact-first"
  }
];

const pitchFeatures = [
  {
    title: "Governed lane model",
    text: "Distinct trust boundaries instead of one generic AI entry point."
  },
  {
    title: "Visible boundary review",
    text: "Pre-send explanation of what stays inside and what may leave."
  },
  {
    title: "External-use controls",
    text: "Explicit approval plus managed or BYOK connection modes."
  },
  {
    title: "Auditable return flow",
    text: "Returned answers are labeled, comparable, and auditable."
  }
];

let reelIndex = 0;
let reelTimer = null;
let reelPlaying = false;
let voiceEnabled = true;
let currentUtterance = null;
let availableVoices = [];
let lockedVoice = null;
let playbackToken = 0;
let stepListOpen = false;
let transcriptOpen = false;
let presentationMode = true;
const bossMode = urlParams.get("mode") === "boss";

function estimateStepDuration(step) {
  const words = step.narration.split(/\s+/).length;
  return Math.max(7000, Math.min(13500, words * 320));
}

function getPreferredVoice() {
  if (lockedVoice) {
    return lockedVoice;
  }

  if (!availableVoices.length) {
    return null;
  }

  const preferredPatterns = [
    /Jenny/i,
    /Aria/i,
    /Guy/i,
    /Google US English/i,
    /Sonia/i,
    /en-US/i,
    /en-GB/i
  ];

  for (const pattern of preferredPatterns) {
    const match = availableVoices.find((voice) => pattern.test(`${voice.name} ${voice.lang}`));
    if (match) {
      lockedVoice = match;
      return match;
    }
  }

  lockedVoice = availableVoices.find((voice) => /^en/i.test(voice.lang)) || availableVoices[0];
  return lockedVoice;
}

function renderPitchFeatures() {
  pitchFeatureStrip.innerHTML = pitchFeatures.map((feature) => `
    <article class="pitch-feature-pill">
      <strong>${feature.title}</strong>
      <span>${feature.text}</span>
    </article>
  `).join("");
}

function renderSupportDrawers() {
  stepListDrawer.classList.toggle("hidden", !stepListOpen);
  transcriptDrawer.classList.toggle("hidden", !transcriptOpen);
  toggleStepListButton.textContent = stepListOpen ? "Hide steps" : "Show steps";
  toggleTranscriptButton.textContent = transcriptOpen ? "Hide transcript" : "Show transcript";
  toggleStepListButton.setAttribute("aria-expanded", String(stepListOpen));
  toggleTranscriptButton.setAttribute("aria-expanded", String(transcriptOpen));
}

function renderPresentationMode() {
  const activePresentationMode = presentationMode && reelPlaying;
  document.body.classList.toggle("is-presentation-mode", activePresentationMode);
  document.body.classList.toggle("is-boss-mode", bossMode);
  togglePresentationModeButton.textContent = presentationMode ? "Presentation mode on" : "Presentation mode off";
  togglePresentationModeButton.setAttribute("aria-pressed", String(presentationMode));
}

function applyPitchAccent(step) {
  const accent = laneAccents[step.accent] || laneAccents.private;
  document.documentElement.style.setProperty("--pitch-accent", accent);
  reelStage.classList.remove("is-emphasized");
  void reelStage.offsetWidth;
  reelStage.classList.add("is-emphasized");
  filmCards.forEach((card) => {
    card.classList.remove("is-live");
    void card.offsetWidth;
    card.classList.add("is-live");
  });
}

function renderLaneBoard(step) {
  const activeIds = new Set(step.activeLaneIds || []);
  const showAll = activeIds.size === 0;

  laneBoardCards.forEach((card) => {
    const laneId = card.getAttribute("data-lane-card");
    const isActive = showAll || activeIds.has(laneId);
    const isDimmed = !showAll && !isActive;
    card.classList.toggle("is-active", isActive);
    card.classList.toggle("is-dimmed", isDimmed);
  });
}

function renderMockPanels(step) {
  mockLanePanel.innerHTML = `
    <div class="mock-row ${step.lane.includes("Private") || step.lane.includes("Deterministic") || step.lane.includes("Max") ? "is-active" : ""}">
      <strong>${step.lane}</strong>
      <span class="mock-pill">Active focus</span>
    </div>
    <span class="mock-line">Deterministic</span>
    <span class="mock-line">Private</span>
    <span class="mock-line">Private Plus</span>
    <span class="mock-line">Max Intelligence</span>
  `;

  mockBoundaryPanel.innerHTML = `
    <span class="mock-line">Inside Consentext: task framing, routing, and policy controls</span>
    <span class="mock-line">Current emphasis: ${step.boundary}</span>
    <span class="mock-line">Approval and payload rules change by lane</span>
  `;

  mockResultPanel.innerHTML = `
    <span class="mock-line">Result mode: ${step.result}</span>
    <span class="mock-line">Always returned with visible labeling</span>
    <span class="mock-line">Provenance and audit stay attached</span>
  `;

  filmOutcomeTitle.textContent = step.result;
  filmOutcomeBody.textContent = step.body;
  filmBoundaryTitle.textContent = step.boundary;
  filmBoundaryBody.textContent = `Current pitch focus: ${step.lane}. The active lane, boundary explanation, and return state move together in this demo.`;
}

function renderReel() {
  const step = reelSteps[reelIndex];
  reelStepEyebrow.textContent = step.eyebrow;
  reelStepTitle.textContent = step.title;
  reelStepBody.textContent = step.body;
  captionTitle.textContent = step.title;
  captionStep.textContent = `Step ${reelIndex + 1} of ${reelSteps.length}`;
  narrationLine.textContent = step.narration;
  reelTags.innerHTML = step.tags.map((tag) => `<span>${tag}</span>`).join("");
  prototypeViewLabel.textContent = step.appViewLabel;
  applyPitchAccent(step);
  renderLaneBoard(step);
  renderMockPanels(step);
  reelProgressBar.style.width = `${((reelIndex + 1) / reelSteps.length) * 100}%`;
  reelStatus.textContent = reelPlaying ? "Playing" : "Paused";
  voiceStatus.textContent = voiceEnabled
    ? (window.speechSynthesis
      ? `AI voiceover on${lockedVoice ? `: ${lockedVoice.name}` : ""}`
      : "Voiceover unavailable in this browser")
    : "AI voiceover muted";
  toggleVoiceButton.textContent = voiceEnabled ? "Mute voiceover" : "Unmute voiceover";
  reelStepList.innerHTML = reelSteps.map((item, index) => `
    <li class="${index === reelIndex ? "is-active" : ""}">
      <strong>${item.eyebrow}:</strong> ${item.title}
    </li>
  `).join("");
  voiceoverList.innerHTML = reelSteps.map((item) => `
    <li><strong>${item.eyebrow}:</strong> ${item.narration}</li>
  `).join("");
  renderPresentationMode();
}

function stopTimer() {
  if (reelTimer) {
    window.clearTimeout(reelTimer);
    reelTimer = null;
  }
}

function stopVoiceover() {
  if (!window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
  currentUtterance = null;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function syncPrototypeView(step, token) {
  prototypeViewLabel.textContent = step.appViewLabel;
  prototypeFrameStatus.textContent = `Loading ${step.appViewLabel}`;
  const nextUrl = step.appViewUrl;
  const currentUrl = prototypeFrame.getAttribute("src");

  if (currentUrl === nextUrl) {
    prototypeFrameShell.classList.add("is-loading");
    await wait(180);
    if (token !== playbackToken) {
      return;
    }
    prototypeFrameShell.classList.remove("is-loading");
    return;
  }

  prototypeFrameShell.classList.add("is-loading");

  await new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      prototypeFrame.removeEventListener("load", finish);
      resolve();
    };

    prototypeFrame.addEventListener("load", finish, { once: true });
    prototypeFrame.setAttribute("src", nextUrl);
    window.setTimeout(finish, 1600);
  });

  if (token !== playbackToken) {
    return;
  }

  await wait(180);
  if (token !== playbackToken) {
    return;
  }

  prototypeFrameShell.classList.remove("is-loading");
}

function scheduleNextStep(delay = estimateStepDuration(reelSteps[reelIndex])) {
  stopTimer();
  reelTimer = window.setTimeout(() => {
    if (!reelPlaying) {
      return;
    }
    reelIndex = (reelIndex + 1) % reelSteps.length;
    playCurrentStep();
  }, delay);
}

function speakCurrentStep() {
  if (!voiceEnabled || !window.speechSynthesis) {
    scheduleNextStep();
    return;
  }

  const step = reelSteps[reelIndex];
  stopVoiceover();

  const utterance = new SpeechSynthesisUtterance(step.narration);
  const voice = getPreferredVoice();
  if (voice) {
    utterance.voice = voice;
  }
  utterance.rate = 0.98;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onend = () => {
    currentUtterance = null;
    if (reelPlaying) {
      scheduleNextStep(1400);
    }
  };
  utterance.onerror = () => {
    currentUtterance = null;
    scheduleNextStep();
  };
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

async function playCurrentStep() {
  const token = ++playbackToken;
  renderReel();
  await syncPrototypeView(reelSteps[reelIndex], token);
  if (token !== playbackToken || !reelPlaying) {
    return;
  }
  speakCurrentStep();
}

function startReel({ restart = false } = {}) {
  if (restart) {
    reelIndex = 0;
  }

  reelPlaying = true;
  playCurrentStep();
}

function pauseReel() {
  playbackToken += 1;
  reelPlaying = false;
  stopTimer();
  stopVoiceover();
  renderReel();
}

function loadVoices() {
  if (!window.speechSynthesis) {
    renderReel();
    return;
  }

  availableVoices = window.speechSynthesis.getVoices();
  if (lockedVoice) {
    const refreshedMatch = availableVoices.find((voice) => voice.name === lockedVoice.name && voice.lang === lockedVoice.lang);
    if (refreshedMatch) {
      lockedVoice = refreshedMatch;
    }
  }
  renderReel();
}

async function requestPitchFullscreen() {
  const player = reelStage.closest(".pitch-player");
  if (!player || document.fullscreenElement === player) {
    return;
  }

  try {
    await player.requestFullscreen();
  } catch (_) {
    // Fullscreen can fail silently if the browser blocks it.
  }
}

async function startPresentation() {
  presentationMode = true;
  stepListOpen = false;
  transcriptOpen = false;
  renderSupportDrawers();
  pitchVideoSection.scrollIntoView({ behavior: "smooth", block: "start" });
  startReel({ restart: true });
  await requestPitchFullscreen();
}

function buildBossModeUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", "boss");
  return url.toString();
}

playReelButton.addEventListener("click", () => {
  startReel();
});

pauseReelButton.addEventListener("click", () => {
  pauseReel();
});

restartReelButton.addEventListener("click", () => {
  startReel({ restart: true });
});

startPresentationButton.addEventListener("click", () => {
  startPresentation();
});

startPresentationInlineButton.addEventListener("click", () => {
  startPresentation();
});

toggleVoiceButton.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;

  if (!voiceEnabled) {
    stopVoiceover();
    scheduleNextStep();
  } else if (reelPlaying) {
    playCurrentStep();
    return;
  }

  renderReel();
});

fullscreenPitchButton.addEventListener("click", async () => {
  const fullscreenElement = document.fullscreenElement;

  try {
    if (fullscreenElement === reelStage.closest(".pitch-player")) {
      await document.exitFullscreen();
    } else {
      await reelStage.closest(".pitch-player").requestFullscreen();
    }
  } catch (_) {
    fullscreenPitchButton.textContent = "Fullscreen unavailable";
    window.setTimeout(() => {
      fullscreenPitchButton.textContent = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
    }, 1400);
  }
});

document.addEventListener("fullscreenchange", () => {
  fullscreenPitchButton.textContent = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
});

copyVoiceoverButton.addEventListener("click", async () => {
  const script = reelSteps.map((item) => `${item.eyebrow}: ${item.narration}`).join("\n\n");

  try {
    await navigator.clipboard.writeText(script);
    copyVoiceoverButton.textContent = "Copied";
    window.setTimeout(() => {
      copyVoiceoverButton.textContent = "Copy script";
    }, 1400);
  } catch (_) {
    copyVoiceoverButton.textContent = "Copy failed";
    window.setTimeout(() => {
      copyVoiceoverButton.textContent = "Copy script";
    }, 1400);
  }
});

copyBossModeLinkButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildBossModeUrl());
    copyBossModeLinkButton.textContent = "Copied";
    window.setTimeout(() => {
      copyBossModeLinkButton.textContent = "Copy boss-mode link";
    }, 1400);
  } catch (_) {
    copyBossModeLinkButton.textContent = "Copy failed";
    window.setTimeout(() => {
      copyBossModeLinkButton.textContent = "Copy boss-mode link";
    }, 1400);
  }
});

copyCueCardButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(cueCardText.textContent.trim());
    copyCueCardButton.textContent = "Copied";
    window.setTimeout(() => {
      copyCueCardButton.textContent = "Copy cue card";
    }, 1400);
  } catch (_) {
    copyCueCardButton.textContent = "Copy failed";
    window.setTimeout(() => {
      copyCueCardButton.textContent = "Copy cue card";
    }, 1400);
  }
});

toggleStepListButton.addEventListener("click", () => {
  stepListOpen = !stepListOpen;
  renderSupportDrawers();
});

toggleTranscriptButton.addEventListener("click", () => {
  transcriptOpen = !transcriptOpen;
  renderSupportDrawers();
});

togglePresentationModeButton.addEventListener("click", () => {
  presentationMode = !presentationMode;
  renderPresentationMode();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseReel();
  }
});

renderPitchFeatures();
renderSupportDrawers();
loadVoices();

if (bossMode) {
  presentationMode = true;
  stepListOpen = false;
  transcriptOpen = false;
  renderSupportDrawers();
}

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

renderReel();
startReel({ restart: true });
