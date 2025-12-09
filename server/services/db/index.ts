import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import { createDatabaseIfNotExists } from "../db/src/createDatabase";
import { initDB } from "./initDB";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootFolder = path.basename(path.resolve(__dirname, "../../../"));

process.env.DB_NAME = rootFolder;

await createDatabaseIfNotExists();

export const db = mysql.createPool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

console.log(`Using database ${process.env.DB_NAME}`);

// Initialiser les tables
await initDB();
