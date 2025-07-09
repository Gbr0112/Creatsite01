const fs = require("fs");
const path = require("path");

const src = path.resolve("client/public/_redirects");
const dest = path.resolve("dist/client/_redirects");

try {
  fs.copyFileSync(src, dest);
  console.log("Arquivo _redirects copiado com sucesso!");
} catch (err) {
  console.error("Erro ao copiar _redirects:", err);
  process.exit(1);
}
