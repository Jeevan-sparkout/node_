import { Router } from "express";
import { registerUser, login, logOut } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/loginUser').post(login);

// JWS validation used inside routes
router.route('/logout').post(verifyJWT, logOut);

export default router;