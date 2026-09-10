/* Build step for Vercel: copy the site into dist/ and, when CF_BEACON_TOKEN is
   set, inject the Cloudflare Web Analytics beacon. With no token set the output
   is byte-for-byte the source, so opening index.html directly still works. */
const fs = require("fs");
const path = require("path");

const OUT = "dist";
const ASSETS = ["favicon.svg", "favicon.ico", "apple-touch-icon.png"];
const raw = process.env.CF_BEACON_TOKEN || "";
const token = raw.trim();

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let html = fs.readFileSync("index.html", "utf8");

if (token) {
  if (!/^[A-Za-z0-9]{1,64}$/.test(token)) {
    console.error("CF_BEACON_TOKEN must be alphanumeric; got " + token.length + " chars. Beacon not injected.");
    process.exitCode = 1;
  } else {
    const beacon =
      '<script defer src="https://static.cloudflareinsights.com/beacon.min.js" ' +
      "data-cf-beacon='{\"token\": \"" + token + "\"}'></script>\n";
    html = html.replace("</body>", beacon + "</body>");
    console.log("Cloudflare Web Analytics beacon injected.");
  }
} else {
  console.log("CF_BEACON_TOKEN not set — building without analytics.");
}

fs.writeFileSync(path.join(OUT, "index.html"), html);
ASSETS.forEach(function (f) {
  if (fs.existsSync(f)) fs.copyFileSync(f, path.join(OUT, f));
});
console.log("Wrote " + OUT + "/");
