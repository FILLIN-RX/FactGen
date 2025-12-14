import express from "express";
import { getStatistiques } from "../controller/statistics.js";
import { getStatsMensuelles ,getStatsJournalières} from "../controller/statistics.js";
import { authenticateUser } from "../middleware/auth.js"; 
const router = express.Router(); // Crée un routeur Express

router.get("/",authenticateUser, getStatistiques);
router.get("/revenusmois",authenticateUser, getStatsMensuelles);
router.get("/revenusjours", authenticateUser, getStatsJournalières);

export default router;
