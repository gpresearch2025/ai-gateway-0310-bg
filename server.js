const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm"
};

function resolvePath(urlPath) {
  const safePath = urlPath === "/" ? "/index.html" : urlPath;
  const normalized = path.normalize(safePath).replace(/^(\.\.[\\/])+/, "");
  return path.join(root, normalized);
}

function createServer() {
  return http.createServer((req, res) => {
    const filePath = resolvePath(req.url.split("?")[0]);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(err.code === "ENOENT" ? 404 : 500, {
          "Content-Type": "text/plain; charset=utf-8"
        });
        res.end(err.code === "ENOENT" ? "Not found" : "Server error");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      res.end(data);
    });
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  const server = createServer();
  server.listen(port, () => {
    console.log(`Consentext AI Gateway prototype running at http://localhost:${port}`);
  });
}

module.exports = { createServer };
