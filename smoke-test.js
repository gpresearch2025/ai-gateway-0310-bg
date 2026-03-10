const { createServer } = require("./server");

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, attempts = 20) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
    } catch (_) {
      // Server not ready yet.
    }
    await wait(250);
  }
  throw new Error(`Server did not start at ${url}`);
}

async function main() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });

  try {
    const response = await waitForServer(baseUrl);
    const html = await response.text();
    const walkthroughHtml = await fetch(`${baseUrl}/walkthrough.html`).then((res) => res.text());
    const walkthroughJs = await fetch(`${baseUrl}/walkthrough.js`).then((res) => res.text());
    const walkthroughVtt = await fetch(`${baseUrl}/exports/ai-gateway-demo.vtt`).then((res) => res.text());

    const requiredSnippets = [
      "Consentext AI Gateway",
      "Dismiss",
      "Current walkthrough context",
      "contextGuidance",
      "actionToast",
      "Review mode off",
      "compare-legend",
      "Open recommended lane",
      "Return to active scene",
      "Presenter tools",
      "Presenter help",
      "Speaker notes",
      "Demo script",
      "Demo scenes",
      "Keyboard shortcuts",
      "Close open presenter panels",
      "Copy share link",
      "Copy summary",
      "Deterministic",
      "Private",
      "Private+",
      "Max Intelligence",
      "See the same task across all lanes",
      "Boundary review",
      "Connection mode",
      "Payload preview",
      "Internal review summary",
      "Copy link",
      "Copy summary",
      "Print summary",
      "Reset session",
      "Use recommended lane",
      "Export summary",
      "Review checklist",
      "Mark current lane reviewed",
      "Audit / activity",
      "Direct outside AI UI handoff"
    ];

    const missing = requiredSnippets.filter((snippet) => !html.includes(snippet));
    if (missing.length > 0) {
      throw new Error(`Missing expected content: ${missing.join(", ")}`);
    }

    const walkthroughSnippets = [
      "Consentext AI Gateway demo walkthrough",
      "Open live prototype",
      "One clean story for your boss and team",
      "MP4 presentation with narration",
      "What the website demonstrates",
      "AI voiceover transcript",
      "Fastest live demo sequence",
      "Fullscreen",
      "Show transcript",
      "Presentation mode on",
      "Start presentation",
      "30-second presenter summary",
      "Copy cue card",
      "Open boss mode",
      "Copy boss-mode link",
      "Download MP4",
      "kind=\"subtitles\"",
      "On-screen subtitles",
      "Chapters",
      "Open prototype after video"
    ];
    const missingWalkthrough = walkthroughSnippets.filter((snippet) => !walkthroughHtml.includes(snippet));
    if (missingWalkthrough.length > 0) {
      throw new Error(`Missing walkthrough content: ${missingWalkthrough.join(", ")}`);
    }

    const appJs = await fetch(`${baseUrl}/app.js`).then((res) => res.text());
    const laneIds = ["deterministic", "private", "private-plus", "max-intelligence"];
    const missingLaneIds = laneIds.filter((laneId) => !appJs.includes(`id: "${laneId}"`));
    if (missingLaneIds.length > 0) {
      throw new Error(`Missing lane definitions in app.js: ${missingLaneIds.join(", ")}`);
    }

    const requiredAppSnippets = [
      'id: "managed"',
      'id: "byok"',
      'id: "care-gap"',
      "promptDrafts",
      "data-lane-id",
      "recommendedLaneId",
      "recommendationReason",
      "Recommended lane for this task",
      "reviewedLanes",
      "renderChecklist",
      "consentext-ai-gateway-prototype-state",
      "localStorage.getItem",
      "localStorage.setItem",
      "localStorage.removeItem",
      "resetState",
      "copyShareLink",
      "URLSearchParams",
      "navigator.clipboard.writeText",
      "sessionBanner",
      "renderContextBar",
      "Custom state",
      "reviewMode",
      "renderReviewMode",
      "compare-panel",
      "STEP_LABELS",
      "STEP_GUIDANCE",
      "showToast",
      "presenterToolsOpen",
      "renderPresenterToolbar",
      "togglePresenterToolsButton",
      "contextRecommendedButton",
      "contextSceneButton",
      "Switched to recommended lane:",
      'lowerKey === "m"',
      'lowerKey === "s"',
      'lowerKey === "l"',
      'lowerKey === "y"',
      'event.key === "Escape"',
      "copySummaryText",
      "Summary copied",
      "Scene loaded:",
      "Summary exported",
      "Session reset",
      "Result and audit",
      "Boundary review",
      "Loaded state from a shared review link.",
      "Restored your last local review session.",
      "shouldIgnoreShortcut",
      "document.addEventListener(\"keydown\"",
      "toggleHelpButton",
      "toggleNotesButton",
      "laneNotes",
      "renderNotesPanel",
      "toggleScriptButton",
      "laneScripts",
      "renderScriptPanel",
      "demoScenes",
      "applyDemoScene",
      "Loaded demo scene:",
      "activeSceneId",
      "params.get(\"scene\")",
      "searchParams.set(\"scene\"",
      "Demo scene:",
      "consentext-gateway-summary",
      "Blob([buildSummaryExportText()]",
      "User-supplied provider key",
      "Consentext-managed connection",
      "Reduced payload example",
      "Broader context example",
      "window.print"
    ];
    const missingAppSnippets = requiredAppSnippets.filter((snippet) => !appJs.includes(snippet));
    if (missingAppSnippets.length > 0) {
      throw new Error(`Missing provider connection definitions in app.js: ${missingAppSnippets.join(", ")}`);
    }

    const requiredWalkthroughJs = [
      "walkthroughVideo",
      "copyVoiceoverButton",
      "toggleTranscriptButton",
      "togglePresentationModeButton",
      "renderPresentationMode",
      "startPresentationButton",
      "startPresentationInlineButton",
      "startPresentation",
      "copyCueCardButton",
      "cueCardText",
      'urlParams.get("mode") === "boss"',
      "copyBossModeLinkButton",
      "buildBossModeUrl",
      "fullscreenVideoButton",
      "requestVideoFullscreen",
      "loadTranscript",
      "demo-script.txt",
      "loadSubtitles",
      "videoCaptionsText",
      "updateVisibleCaption",
      "chapterList",
      "renderChapters",
      "updateActiveChapter"
    ];
    const missingWalkthroughJs = requiredWalkthroughJs.filter((snippet) => !walkthroughJs.includes(snippet));
    if (missingWalkthroughJs.length > 0) {
      throw new Error(`Missing walkthrough video hooks: ${missingWalkthroughJs.join(", ")}`);
    }

    if (!walkthroughVtt.includes("WEBVTT")) {
      throw new Error("Missing VTT captions content");
    }

    console.log("Smoke test passed");
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
