const reelStepEyebrow = document.getElementById("reelStepEyebrow");
const reelStepTitle = document.getElementById("reelStepTitle");
const reelStepBody = document.getElementById("reelStepBody");
const reelTags = document.getElementById("reelTags");
const reelProgressBar = document.getElementById("reelProgressBar");
const reelStepList = document.getElementById("reelStepList");
const reelStatus = document.getElementById("reelStatus");
const playReelButton = document.getElementById("playReelButton");
const pauseReelButton = document.getElementById("pauseReelButton");
const restartReelButton = document.getElementById("restartReelButton");
const narrationLine = document.getElementById("narrationLine");
const voiceoverList = document.getElementById("voiceoverList");
const copyVoiceoverButton = document.getElementById("copyVoiceoverButton");

const reelSteps = [
  {
    eyebrow: "Opening",
    title: "Frame AI Gateway as a trust-and-routing system",
    body: "Start with the core idea: the lane sets the trust boundary before any AI work runs. This is not just a model picker.",
    tags: ["4 lanes", "Governed routing", "User-visible boundary"],
    narration: "Consentext AI Gateway is a trust and routing layer for sensitive health questions. Before any AI work happens, the user chooses the lane, and that lane sets the boundary."
  },
  {
    eyebrow: "Lanes",
    title: "Show the four supported lanes",
    body: "Walk through Deterministic, Private, Private+, and Max Intelligence as real product choices with distinct protection and capability tradeoffs.",
    tags: ["Deterministic", "Private", "Private+", "Max Intelligence"],
    narration: "The four lanes are real product choices. Deterministic stays fact first. Private keeps sensitive interpretation inside. Private Plus uses reduced external payloads. Max Intelligence allows the broadest supported outside help."
  },
  {
    eyebrow: "Review",
    title: "Use boundary review before any send step",
    body: "Explain what stays inside, what may leave, and why approval is required in the external lanes.",
    tags: ["Boundary review", "Approval gating", "Payload preview"],
    narration: "Before any request runs, the product stops at boundary review. That makes it explicit what stays inside, what may leave, and when approval is required."
  },
  {
    eyebrow: "Result",
    title: "Run the request and show governed return flow",
    body: "The result is lane-labeled, comes back through Consentext, and keeps provenance and activity logging visible.",
    tags: ["Lane-specific output", "Provenance", "Audit trail"],
    narration: "When the result comes back, it is clearly lane labeled and returned through Consentext. Provenance and the activity trail stay visible, so the user sees governed behavior rather than a black box."
  },
  {
    eyebrow: "Compare",
    title: "Use compare view to make the differences obvious",
    body: "Compare boundary, connection, payload, and output side by side so the product story is easy to scan quickly.",
    tags: ["Compare all lanes", "Boundary", "Connection", "Output"],
    narration: "The compare view makes the tradeoffs easy to scan. You can see the same task across all four lanes, including the boundary, connection mode, payload story, and output style."
  },
  {
    eyebrow: "Close",
    title: "End on deterministic trust and product control",
    body: "Close by reinforcing that direct outside AI UI handoff is off the board and that Consentext remains the governed middle layer.",
    tags: ["Trust anchor", "No direct handoff", "Product moat"],
    narration: "The key takeaway is that this is not a generic AI frontend. Consentext remains the governed middle layer, and direct outside AI handoff is intentionally off the board."
  }
];

let reelIndex = 0;
let reelTimer = null;
let reelPlaying = true;

function renderReel() {
  const step = reelSteps[reelIndex];
  reelStepEyebrow.textContent = step.eyebrow;
  reelStepTitle.textContent = step.title;
  reelStepBody.textContent = step.body;
  narrationLine.textContent = step.narration;
  reelTags.innerHTML = step.tags.map((tag) => `<span>${tag}</span>`).join("");
  reelProgressBar.style.width = `${((reelIndex + 1) / reelSteps.length) * 100}%`;
  reelStatus.textContent = reelPlaying ? "Playing" : "Paused";
  reelStepList.innerHTML = reelSteps.map((item, index) => `
    <li class="${index === reelIndex ? "is-active" : ""}">
      <strong>${item.eyebrow}:</strong> ${item.title}
    </li>
  `).join("");
  voiceoverList.innerHTML = reelSteps.map((item) => `
    <li><strong>${item.eyebrow}:</strong> ${item.narration}</li>
  `).join("");
}

function stopReel() {
  if (reelTimer) {
    window.clearInterval(reelTimer);
    reelTimer = null;
  }
}

function startReel() {
  stopReel();
  reelPlaying = true;
  renderReel();
  reelTimer = window.setInterval(() => {
    reelIndex = (reelIndex + 1) % reelSteps.length;
    renderReel();
  }, 3600);
}

function pauseReel() {
  reelPlaying = false;
  stopReel();
  renderReel();
}

playReelButton.addEventListener("click", () => {
  startReel();
});

pauseReelButton.addEventListener("click", () => {
  pauseReel();
});

restartReelButton.addEventListener("click", () => {
  reelIndex = 0;
  startReel();
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

renderReel();
startReel();
