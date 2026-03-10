const { createServer } = require("./server");

const port = 4271;
const baseUrl = `http://127.0.0.1:${port}`;

function assertIncludes(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

async function main() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });

  try {
    const [html, appJs, css, walkthroughHtml, walkthroughCss, walkthroughJs, walkthroughVtt] = await Promise.all([
      fetch(baseUrl).then((res) => res.text()),
      fetch(`${baseUrl}/app.js`).then((res) => res.text()),
      fetch(`${baseUrl}/styles.css`).then((res) => res.text()),
      fetch(`${baseUrl}/walkthrough.html`).then((res) => res.text()),
      fetch(`${baseUrl}/walkthrough.css`).then((res) => res.text()),
      fetch(`${baseUrl}/walkthrough.js`).then((res) => res.text()),
      fetch(`${baseUrl}/exports/ai-gateway-demo.vtt`).then((res) => res.text())
    ]);

    const criticalHtml = [
      "Current walkthrough context",
      "Review mode off",
      "Presenter tools",
      "Demo scenes",
      "Internal review summary",
      "Review checklist",
      "Copy summary",
      "Reset session"
    ];

    const criticalJs = [
      "loadPersistedState",
      "loadStateFromUrl",
      "persistState",
      "syncUrlState",
      "applyDemoScene",
      "buildSummaryExportText",
      "copyShareLink",
      "copySummaryText",
      "renderChecklist",
      "renderContextBar",
      "renderReviewMode",
      "renderPresenterToolbar",
      "showToast",
      'event.key === "Escape"',
      'lowerKey === "m"',
      'lowerKey === "s"',
      'lowerKey === "l"',
      'lowerKey === "y"'
    ];

    const criticalCss = [
      ".context-bar",
      ".compare-legend",
      ".compare-panel",
      ".presenter-toolbar",
      ".scene-chip.is-active",
      ".toast",
      ".review-summary-card"
    ];

    const criticalWalkthroughHtml = [
      "Consentext AI Gateway demo walkthrough",
      "Open live prototype",
      "One clean story for your boss and team",
      "Fastest live demo sequence",
      "MP4 presentation with narration",
      "AI voiceover transcript",
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
      "On-screen subtitles"
    ];

    const criticalWalkthroughCss = [
      ".walkthrough-hero",
      ".step-grid",
      ".feature-grid",
      ".video-card",
      ".prototype-frame-shell",
      ".caption-title",
      ".support-drawer",
      ".presentation-support-section",
      ".cue-card",
      "body.is-boss-mode",
      ".video-captions"
    ];

    const criticalWalkthroughJs = [
      "walkthroughVideo",
      "copyVoiceoverButton",
      "toggleTranscriptButton",
      "togglePresentationModeButton",
      "startPresentationButton",
      "startPresentationInlineButton",
      "copyCueCardButton",
      "copyBossModeLinkButton",
      "buildBossModeUrl",
      "fullscreenVideoButton",
      "loadTranscript",
      "loadSubtitles",
      "updateVisibleCaption"
    ];

    criticalHtml.forEach((item) => assertIncludes(html, item, "HTML content"));
    criticalJs.forEach((item) => assertIncludes(appJs, item, "app.js hook"));
    criticalCss.forEach((item) => assertIncludes(css, item, "styles.css rule"));
    criticalWalkthroughHtml.forEach((item) => assertIncludes(walkthroughHtml, item, "walkthrough HTML content"));
    criticalWalkthroughCss.forEach((item) => assertIncludes(walkthroughCss, item, "walkthrough CSS rule"));
    criticalWalkthroughJs.forEach((item) => assertIncludes(walkthroughJs, item, "walkthrough JS hook"));
    assertIncludes(walkthroughVtt, "WEBVTT", "walkthrough captions");

    console.log("Preflight check passed");
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
