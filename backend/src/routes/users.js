import {Router} from "express";
import {FetchLeaderboard,FetchChats} from "../../controllers/leaderboard.controller.js";
const router = Router();

console.log("nice");
router.get("/leaderboard",FetchLeaderboard);
router.get("/chats/:id",FetchChats);

export default router