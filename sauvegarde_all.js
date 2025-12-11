import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Pour récupérer __filename et __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFile = "sauvegarde_all.md";

const excludedPaths = [
  "node_modules",
  "build",
  "dist",
  "client/dist",
  "server/dist",
  "logs",
  ".vscode",
  ".idea",
  ".vite",
  "client/.vite",
  ".git", // exclu pour éviter fichiers binaires Git
];

const excludedFiles = [".DS_Store", "npm-debug.log"];
const excludedExtensions = [".tsbuildinfo", ".log"];

// Détection du langage pour l’affichage markdown
function detectLanguage(file) {
  const ext = path.extname(file).slice(1);
  const map = {
    js: "javascript",
    ts: "typescript",
    sh: "bash",
    css: "css",
    html: "html",
    py: "python",
    json: "json",
    yml: "yaml",
    yaml: "yaml",
    tsx: "tsx",
    md: "markdown",
  };
  return map[ext] || "";
}

// Vérification des exclusions
function isExcluded(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  return excludedPaths.some((folder) => normalized.includes(`${folder}/`)) || excludedFiles.some((name) => path.basename(normalized) === name) || excludedExtensions.some((ext) => normalized.endsWith(ext));
}

// Détection binaire simple (ignore les fichiers non text)
function isBinary(buffer) {
  let nonAscii = 0;
  for (const byte of buffer) {
    if (byte > 127) nonAscii++;
  }
  return buffer.length > 0 && nonAscii / buffer.length > 0.3;
}

// Récupération de tous les fichiers
function getAllFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getAllFiles(fullPath);
    }
    return fullPath;
  });
}

let output = "## CONTENU DU PROJET \n";

const allFiles = getAllFiles(process.cwd())
  .filter((f) => fs.existsSync(f) && path.basename(f) !== outputFile && path.basename(f) !== path.basename(__filename) && !isExcluded(f))
  .sort();

for (const file of allFiles) {
  const lang = detectLanguage(file);
  const raw = fs.readFileSync(file);

  // Détection binaire → ignore
  if (isBinary(raw)) {
    output += `\n### \`${file}\`\n⚠️ **Fichier ignoré (format binaire)**\n`;
    continue;
  }

  const content = raw.toString("utf8");

  output += `\n### \`${file}\`\n\`\`\`${lang}\n${content}\n\`\`\`\n`;
}

fs.writeFileSync(outputFile, output, "utf8");
console.log(`✅ ${outputFile} généré avec succès !`);
