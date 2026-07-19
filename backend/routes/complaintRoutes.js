import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint
} from "../controllers/complaintController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  createComplaint
);
router.get("/", protect, getComplaints);
router.get("/:id", protect, getComplaintById);
router.patch("/:id/status", protect, adminOnly, updateComplaintStatus);
router.delete("/:id", protect, adminOnly, deleteComplaint);

export default router;
