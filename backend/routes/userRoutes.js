import express from "express";
import { protect } from "../middleware/auth.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

// Any logged-in user (Citizen or Admin) can view the users list
router.get("/", protect, getUsers);

export default router;