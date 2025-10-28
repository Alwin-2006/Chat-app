import {Router} from "express";
import {FetchLeaderboard,FetchChats,incomingRequests, friendRequest, acceptFriendRequest,fetchMessages} from "../../controllers/leaderboard.controller.js";
const router = Router();

console.log("nice");
router.get("/leaderboard",FetchLeaderboard);
router.get("/chats/:id",FetchChats);
router.get("/users",friendRequest);
router.get("/users/:id/friends",incomingRequests);  
router.get("/users/accept",acceptFriendRequest);
router.get("/chats/chat/:id",fetchMessages);
export default router
