import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useToast } from "../components/Toast.jsx";
import ComplaintCard from "../components/ComplaintCard.jsx";
import "./Dashboard.css";

const CATEGORIES = ["Pothole", "Garbage", "Streetlight", "Water Supply", "Other"];
const PRIORITIES = ["Low", "Medium", "High"];
const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
  { key: "rejected", label: "Rejected" }
];

const emptyForm = { title: "", category: CATEGORIES[0], priority: PRIORITIES[0], location: "", description: "" };

const Dashboard = () => {
  const { showToast } = useToast();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/complaints");
      setComplaints(data);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load complaints", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    else if (form.description.trim().length < 10) newErrors.description = "Please provide a bit more detail (10+ characters)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const formData = new FormData();

formData.append("title", form.title);
formData.append("category", form.category);
formData.append("priority", form.priority);
formData.append("location", form.location);
formData.append("description", form.description);

if (image) {
  formData.append("image", image);
}

const { data } = await api.post("/complaints", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
      setComplaints((prev) => [data, ...prev]);
      setForm(emptyForm);
setImage(null);
      showToast(`Complaint filed! Tracking ID: ${data.ticketId}`, "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to file complaint", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredComplaints = [...complaints]
  .filter((c) => {
    const matchesStatus =
      activeTab === "all" || c.status === activeTab;

    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  })
  .sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    const priority = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    if (sortBy === "high") {
      return priority[b.priority] - priority[a.priority];
    }

    if (sortBy === "low") {
      return priority[a.priority] - priority[b.priority];
    }

    return 0;
  });

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Citizen Dashboard</h1>
          <p>File a new complaint and track the status of your existing ones.</p>
        </div>
{/* Dashboard Stats */}
<div className="stats-cards">

  <div className="stats-card">
    <h3>Total</h3>
    <p>{complaints.length}</p>
  </div>

  <div className="stats-card">
    <h3>Pending</h3>
    <p>{complaints.filter(c => c.status === "pending").length}</p>
  </div>

  <div className="stats-card">
    <h3>Resolved</h3>
    <p>{complaints.filter(c => c.status === "resolved").length}</p>
  </div>

  <div className="stats-card">
    <h3>Rejected</h3>
    <p>{complaints.filter(c => c.status === "rejected").length}</p>
  </div>

</div>
        <div className="dashboard-layout">
          {/* New complaint form */}
          <div className="card-surface new-complaint-card">
            <h2>File a New Complaint</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className={`form-control ${errors.title ? "has-error" : ""}`}
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Large pothole on Main St"
                />
                {errors.title && <div className="field-error">{errors.title}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" className="form-control" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select id="priority" name="priority" className="form-control" value={form.priority} onChange={handleChange}>
                    {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className={`form-control ${errors.location ? "has-error" : ""}`}
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Corner of 5th Ave and Elm St"
                />
                {errors.location && <div className="field-error">{errors.location}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-control textarea-control ${errors.description ? "has-error" : ""}`}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail..."
                />
                {errors.description && <div className="field-error">{errors.description}</div>}
              </div>
<div className="form-group">
  <label>Upload Image (Optional)</label>

  <input
    type="file"
    accept="image/*"
    className="form-control"
    onChange={(e) => setImage(e.target.files[0])}
  />

  {image && (
    <p style={{ marginTop: "8px", fontSize: "14px" }}>
      Selected: {image.name}
    </p>
  )}
</div>
              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? "Filing..." : "Submit Complaint"}
              </button>
            </form>
          </div>
         {/* Complaint list */}
<div className="complaint-list-section">
  <h2>Your Complaints</h2>
<div className="search-sort-bar">

  <div className="dashboard-search">
    <input
      type="text"
      placeholder="🔍 Search complaints..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <select
    className="sort-dropdown"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="high">High Priority</option>
    <option value="low">Low Priority</option>
  </select>

</div>
  <div className="filter-tabs">
    {TABS.map((tab) => (
      <button
        key={tab.key}
        className={`filter-tab ${activeTab === tab.key ? "active" : ""}`}
        onClick={() => setActiveTab(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </div>

  <div className="complaints-scroll">
    {loading ? (
      <div className="spinner"></div>
    ) : filteredComplaints.length === 0 ? (
      <div className="empty-state">
        <h3>No complaints found</h3>
        <p>
          {activeTab === "all"
            ? "You haven't filed any complaints yet. Use the form to report an issue."
            : `You don't have any complaints with status "${activeTab.replace("-", " ")}".`}
        </p>
      </div>
    ) : (
      filteredComplaints.map((c) => (
        <ComplaintCard key={c._id} complaint={c} />
      ))
    )}
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
