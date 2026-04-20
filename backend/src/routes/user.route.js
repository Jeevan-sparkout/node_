import { Router} from "express";
import { login, registerUser , logOut } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/loginUser").post(login);
router.route("/logOutUser").post(logOut);

export default router;