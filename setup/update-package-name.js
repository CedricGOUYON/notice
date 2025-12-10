import fs from "node:fs";
import path from "node:path";

const rootFolderName = path.basename(path.resolve());
const constantsPath = path.resolve("setup/constants.ts");

// Charger le fichier
let content = fs.readFileSync(constantsPath, "utf8");

// Remplacer toutes occurrences
content = content.replace(/PENDING_GENERATION/g, rootFolderName);

// Réécrire
fs.writeFileSync(constantsPath, content);

console.log(`constants.ts mis à jour avec : ${rootFolderName}`);
