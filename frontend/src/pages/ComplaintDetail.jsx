import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/Toast.jsx";
import "./ComplaintDetail.css";

const STATUS_OPTIONS = ["pending", "in-progress", "resolved", "rejected"];

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchComplaint = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const { data } = await api.get(`/complaints/${id}`);
      setComplaint(data);
      setNewStatus(data.status);
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
      } else {
        showToast(err.response?.data?.message || "Failed to load complaint", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusUpdate = async () => {
    if (newStatus === complaint.status) return;
    setUpdating(true);
    try {
      const { data } = await api.patch(`/complaints/${id}/status`, { status: newStatus });
      setComplaint(data);
      showToast(`Status updated to "${newStatus.replace("-", " ")}"`, "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update status", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (notFound || !complaint) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h3>Complaint not found</h3>
            <p>It may have been removed, or you may not have access to it.</p>
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-outline" onClick={() => navigate(-1)}>Go back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(complaint.createdAt).toLocaleString("en-US", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <div className="page">
      <div className="container">
        <Link to={user?.role === "admin" ? "/admin" : "/dashboard"} className="btn btn-outline btn-sm" style={{ marginBottom: 20 }}>
          ← Back to Dashboard
        </Link>

        <div className="card-surface">
          <div className="detail-header">
            <div>
              <h1>{complaint.title}</h1>
              <span className={`status-badge status-${complaint.status}`}>{complaint.status.replace("-", " ")}</span>
            </div>
            <span className="detail-ticket-id">{complaint.ticketId}</span>
          </div>

          <div className="detail-grid">
            <div className="detail-field">
              <div className="detail-field-label">Category</div>
              <div>{complaint.category}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Priority</div>
              <div>{complaint.priority}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Location</div>
              <div>{complaint.location}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Filed On</div>
              <div>{formattedDate}</div>
            </div>
            {user?.role === "admin" && complaint.citizen?.name && (
              <div className="detail-field">
                <div className="detail-field-label">Filed By</div>
                <div>{complaint.citizen.name} ({complaint.citizen.email})</div>
              </div>
            )}
          </div>

          <div className="detail-description">
            <div className="detail-field-label">Description</div>
            <p>{complaint.description}</p>
          </div>

          {complaint.statusHistory?.length > 0 && (
            <>
              <h3 style={{ marginTop: 28, marginBottom: 4 }}>Status History</h3>
              <div className="timeline">
                {complaint.statusHistory.map((entry, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className="timeline-status">{entry.status.replace("-", " ")}</div>
                    <div className="timeline-date">
                      {new Date(entry.changedAt).toLocaleString("en-US", {
                        year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {user?.role === "admin" && (
            <div className="admin-status-control">
              <label htmlFor="status-select">Update Status:</label>
              <select
                id="status-select"
                className="form-control"
                style={{ width: "auto" }}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.replace("-", " ")}</option>
                ))}
              </select>
              <button
                className="btn btn-secondary"
                onClick={handleStatusUpdate}
                disabled={updating || newStatus === complaint.status}
              >
                {updating ? "Updating..." : "Update Status"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
