import Complaint from "../models/Complaint.js";

const generateTicketId = async () => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `GRV-${yy}${mm}-`;

  const countThisMonth = await Complaint.countDocuments({
    ticketId: { $regex: `^${prefix}` },
  });

  const nextNumber = String(countThisMonth + 1).padStart(4, "0");
  return `${prefix}${nextNumber}`;
};

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority, location } = req.body;

    if (!title || !description || !category || !priority || !location) {
      return res
        .status(400)
        .json({ message: "All fields are required to file a complaint" });
    }

    const ticketId = await generateTicketId();

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      location,
      ticketId,
      image: req.file ? req.file.filename : "",
      citizen: req.user.id,
      statusHistory: [
        {
          status: "pending",
          changedAt: new Date(),
          changedBy: req.user.id,
        },
      ],
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong while filing your complaint.",
    });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const filter = {};

    if (req.user.role !== "admin") {
      filter.citizen = req.user.id;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const complaints = await Complaint.find(filter)
      .populate("citizen", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong while fetching complaints.",
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "citizen",
      "name email"
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    const isOwner = complaint.citizen._id.toString() === req.user.id;

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

const VALID_STATUSES = [
  "pending",
  "in-progress",
  "resolved",
  "rejected",
];

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = status;

    complaint.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: req.user.id,
    });

    await complaint.save();

    const updated = await complaint.populate("citizen", "name email");

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update complaint.",
    });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      message: "Complaint deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete complaint",
    });
  }
};