import express from "express";
import { getStatistiques } from "../controller/statistics.js";
import { getStatsMensuelles } from "../controller/facturescontrolleur.js";
import { authenticateUser } from "../middleware/auth.js"; 
const router = express.Router(); // Crée un routeur Express

router.get("/",authenticateUser, getStatistiques);
router.get("/revenusmois",authenticateUser, getStatsMensuelles);

export default router;
