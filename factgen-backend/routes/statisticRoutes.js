import express from "express";
import { getStatistiques } from "../controller/statistics.js";
import { getStatsMensuelles } from "../controller/facturescontrolleur.js";
const router = express.Router(); // Crée un routeur Express

router.get("/", getStatistiques);
router.get("/revenusmois", getStatsMensuelles);

export default router;
