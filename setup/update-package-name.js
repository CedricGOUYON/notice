import fs from "node:fs";
import path from "node:path";

const rootFolderName = path.basename(path.resolve());
const packageJsonPath = path.resolve("package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

packageJson.name = rootFolderName;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");

console.log(`✅ package.json mis à jour avec name: "${rootFolderName}"`);
