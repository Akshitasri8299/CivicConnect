import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useToast } from "../components/Toast.jsx";
import ComplaintCard from "../components/ComplaintCard.jsx";
import "./Dashboard.css";

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
  { key: "rejected", label: "Rejected" },
];

const AdminDashboard = () => {
  const { showToast } = useToast();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);

    try {
      const { data } = await api.get("/complaints");
      setComplaints(data);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to load complaints",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus =
      activeTab === "all" || c.status === activeTab;

    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      (c.citizen?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (c.citizen?.email || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const countFor = (key) =>
    key === "all"
      ? complaints.length
      : complaints.filter((c) => c.status === key).length;

  return (
    <div className="page">
      <div className="container">

        {/* Header */}

        <div className="page-header">
          <h1>Admin Control Center 👨‍💼</h1>

          <p>
            Monitor complaints, update their status, manage citizens'
            reports and keep your city organized.
          </p>
        </div>

        {/* Statistics */}

        <div className="stats-cards">
          <div className="stats-card">
            <h3>Total</h3>
            <p>{complaints.length}</p>
          </div>

          <div className="stats-card">
            <h3>Pending</h3>
            <p>
              {complaints.filter((c) => c.status === "pending").length}
            </p>
          </div>

          <div className="stats-card">
            <h3>In Progress</h3>
            <p>
              {
                complaints.filter(
                  (c) => c.status === "in-progress"
                ).length
              }
            </p>
          </div>

          <div className="stats-card">
            <h3>Resolved</h3>
            <p>
              {complaints.filter((c) => c.status === "resolved").length}
            </p>
          </div>
        </div>

        {/* Search */}

        <div className="dashboard-search">
          <input
            type="text"
            placeholder="🔍 Search by Ticket ID, Citizen, Email, Category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tabs */}

        <div className="filter-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`filter-tab ${
                activeTab === tab.key ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} ({countFor(tab.key)})
            </button>
          ))}
        </div>

        {/* Complaint List */}

        {loading ? (
          <div className="spinner"></div>
        ) : filteredComplaints.length === 0 ? (
          <div className="empty-state">
            <h3>No complaints found</h3>

            <p>
              {activeTab === "all"
                ? "No complaints have been submitted yet."
                : `No complaints with status "${activeTab.replace(
                    "-",
                    " "
                  )}".`}
            </p>
          </div>
        ) : (
          filteredComplaints.map((c) => (
            <ComplaintCard
              key={c._id}
              complaint={c}
              showCitizen
              isAdmin
              onDelete={(id) =>
                setComplaints((prev) =>
                  prev.filter((item) => item._id !== id)
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;