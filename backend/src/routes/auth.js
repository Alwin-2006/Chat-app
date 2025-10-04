import {Router} from "express";
import {signup,signin} from '../../controllers/auth.controller.js'

const router = Router();

router.post("/signup", signup);
router.get("/signin", signin);

export default router