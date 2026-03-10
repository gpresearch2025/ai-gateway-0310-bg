const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");
const { createServer } = require("./server");

const port = 4317;
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = path.join(__dirname, "exports", "demo-frames");

const frames = [
  {
    id: "01-walkthrough",
    url: `${baseUrl}/walkthrough.html?mode=boss`,
    waitFor: "#demoReel"
  },
  {
    id: "02-lanes",
    url: `${baseUrl}/index.html?lane=private&task=a1c&step=compose`
  },
  {
    id: "03-guidance",
    url: `${baseUrl}/index.html?lane=private&task=a1c&step=compose`
  },
  {
    id: "04-review",
    url: `${baseUrl}/index.html?lane=private-plus&task=visit&step=review&scene=bridge-lane`
  },
  {
    id: "05-external",
    url: `${baseUrl}/index.html?lane=max-intelligence&task=prep&step=review&scene=broad-mode`
  },
  {
    id: "06-result",
    url: `${baseUrl}/index.html?lane=private&task=a1c&step=result&scene=private-anchor`
  },
  {
    id: "07-compare",
    url: `${baseUrl}/index.html?lane=private-plus&task=visit&step=result&scene=bridge-lane`
  },
  {
    id: "08-presenter",
    url: `${baseUrl}/index.html?lane=private-plus&task=visit&step=result&scene=bridge-lane&review=1`
  },
  {
    id: "09-close",
    url: `${baseUrl}/index.html?lane=deterministic&task=care-gap&step=result&scene=fact-first`
  }
];

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 920 },
    deviceScaleFactor: 1
  });

  try {
    for (const frame of frames) {
      await page.goto(frame.url, { waitUntil: "networkidle" });
      await page.waitForTimeout(1400);
      if (frame.waitFor) {
        await page.waitForSelector(frame.waitFor, { state: "visible", timeout: 5000 });
      }
      await page.screenshot({
        path: path.join(outputDir, `${frame.id}.png`)
      });
    }
    console.log(`Captured ${frames.length} demo frames in ${outputDir}`);
  } finally {
    await browser.close();
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
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
