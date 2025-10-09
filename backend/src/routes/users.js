import {Router} from "express";
import leaderboard from "../../controllers/leaderboard.controller.js";
const router = Router();

console.log("nice");
router.get("/leaderboard",leaderboard);
export default router