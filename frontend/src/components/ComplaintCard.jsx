import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "./Toast";

const CATEGORY_ICONS = {
  Pothole: "🕳️",
  Garbage: "🗑️",
  Streetlight: "💡",
  "Water Supply": "🚰",
  Other: "📋",
};

const ComplaintCard = ({
  complaint,
  showCitizen = false,
  isAdmin = false,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const formattedDate = new Date(complaint.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Delete complaint ${complaint.ticketId}?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/complaints/${complaint._id}`);

      showToast("Complaint deleted successfully", "success");

      if (onDelete) {
        onDelete(complaint._id);
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete complaint",
        "error"
      );
    }
  };

  return (
    <div
      className="ticket-card"
      onClick={() => navigate(`/complaints/${complaint._id}`)}
    >
      <div className="ticket-main">
        <div className="ticket-main-top">
          <h3 className="ticket-title">
            {CATEGORY_ICONS[complaint.category] || "📋"} {complaint.title}
          </h3>

          <span className={`status-badge status-${complaint.status}`}>
            {complaint.status.replace("-", " ")}
          </span>
        </div>

        <p className="ticket-description">{complaint.description}</p>

        <div className="ticket-meta">
          <span>{complaint.category}</span>

          <span className={`priority-badge priority-${complaint.priority}`}>
            {complaint.priority} Priority
          </span>

          <span>📍 {complaint.location}</span>

          <span>🗓️ {formattedDate}</span>

          {showCitizen && complaint.citizen && (
            <>
              <span>👤 {complaint.citizen.name}</span>
              <span>✉️ {complaint.citizen.email}</span>
            </>
          )}
        </div>

        {isAdmin && (
          <div style={{ marginTop: "18px" }}>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              🗑 Delete Complaint
            </button>
          </div>
        )}
      </div>

      <div className="ticket-divider"></div>

      <div className="ticket-stub">
        <span className="ticket-stub-label">Ticket ID</span>
        <span className="ticket-stub-id">{complaint.ticketId}</span>
      </div>
    </div>
  );
};

export default ComplaintCard;