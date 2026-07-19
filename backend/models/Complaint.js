import mongoose from "mongoose";

// Each entry records a status change so citizens can see a timeline of what happened.
const statusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ["Pothole", "Garbage", "Streetlight", "Water Supply", "Other"],
    required: true
  },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  location: { type: String, required: true, trim: true },

image: {
  type: String,
  default: ""
},

status: {
    type: String,
    enum: ["pending", "in-progress", "resolved", "rejected"],
    default: "pending"
  },
  // Human-readable tracking ID in the format GRV-YYMM-XXXX, generated at creation time.
  ticketId: { type: String, required: true, unique: true },
  image: {
  type: String,
  default: "",
},
  citizen: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  statusHistory: [statusHistorySchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Complaint", complaintSchema);
