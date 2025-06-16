import express from "express";
import { getStatistiques } from "../controller/statistics.js";
const router = express.Router(); // Crée un routeur Express

router.get("/", getStatistiques);

export default router;
