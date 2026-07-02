// Tiny single-file static server. Usage:
//   node static.js <port> <absoluteFileOrDirPath>
// Serves a directory (index.html at root) or one specific file at "/".
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.argv[2]);
const TARGET = process.argv[3];
if (!PORT || !TARGET) {
  console.error("Usage: node static.js <port> <fileOrDirPath>");
  process.exit(1);
}

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".gif": "image/gif", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8",
};
const isDir = fs.statSync(TARGET).isDirectory();
const ROOT = isDir ? TARGET : path.dirname(TARGET);
const FILE = isDir ? null : path.basename(TARGET);

http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url.split("?")[0] || "/"));
    if (FILE) { // single-file mode: always serve that file at any path
      urlPath = "/" + FILE;
    } else if (urlPath === "/") {
      urlPath = "/index.html";
    }
    const filePath = path.normalize(path.join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end("Forbidden"); return; }
    fs.stat(filePath, (err, st) => {
      if (err || !st.isFile()) { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("404 Not Found"); return; }
      res.writeHead(200, { "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) { res.writeHead(500); res.end("Server error"); }
}).listen(PORT, "0.0.0.0", () => {
  console.log(`Static server on :${PORT}  ->  ${isDir ? TARGET + " (dir)" : TARGET}`);
});
