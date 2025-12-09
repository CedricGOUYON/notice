import cors from "cors";

import express from "express";
import { db } from "../services/db";
import { initDB } from "../services/db/initDB";
import routes from "./routes/api";

const app = express();
const PORT = process.env.APP_PORT;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api", routes);

app.get("/", (_req, res) => {
	res.send("Backend Express en marche");
});

db.getConnection()
	.then(async () => {
		console.log(`Connexion réussie à la base ${process.env.DB_NAME}`);
		try {
			await initDB();
			console.log("Base de données initialisée avec toutes les tables");
		} catch (initErr) {
			console.error("Erreur lors de l'initialisation :", initErr);
		}
		app.listen(PORT, () => {
			console.log(`
=========================
✅ SERVER
=========================
`);
			console.log(`Serveur lancé sur http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Erreur de connexion MySQL :", err);
	});
