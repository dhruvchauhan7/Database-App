import express from "express"
import { login, logout, register, initializedatabase } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/initialize_database", initializedatabase);


export default router;
