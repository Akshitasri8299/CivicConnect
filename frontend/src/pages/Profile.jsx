import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../components/Toast";
import "./Profile.css";

const Profile = () => {
  const { showToast } = useToast();

  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchComplaints();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setProfile(data);
      setName(data.name);
    } catch (err) {
      showToast("Failed to load profile", "error");
    }
  };

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get("/complaints");

      setStats({
        total: data.length,
        pending: data.filter((c) => c.status === "pending").length,
        resolved: data.filter((c) => c.status === "resolved").length,
        rejected: data.filter((c) => c.status === "rejected").length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      return showToast("Name cannot be empty", "error");
    }

    setSaving(true);

    try {
      const { data } = await api.put("/auth/profile", {
        name,
      });

      setProfile(data);

      localStorage.setItem("cc_user", JSON.stringify(data));

      showToast("Profile updated successfully", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Update failed", "error");
    } finally {
      setSaving(false);
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

  return (
    <div className="page">
      <div className="container">

        <div className="profile-header">

          <div className="profile-avatar">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>{profile?.name}</h1>
            <p>{profile?.email}</p>
          </div>

        </div>

        <div className="profile-grid">

          {/* LEFT */}

          <div className="card-surface">

            <h2>Edit Profile</h2>

            <div className="form-group">
              <label>Name</label>

              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                className="form-control"
                value={profile?.email}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Role</label>

              <input
                className="form-control"
                value={profile?.role}
                disabled
              />
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

          {/* RIGHT */}

          <div>

            <div className="stats-cards">

              <div className="stats-card">
                <h3>Total</h3>
                <p>{stats.total}</p>
              </div>

              <div className="stats-card">
                <h3>Pending</h3>
                <p>{stats.pending}</p>
              </div>

              <div className="stats-card">
                <h3>Resolved</h3>
                <p>{stats.resolved}</p>
              </div>

              <div className="stats-card">
                <h3>Rejected</h3>
                <p>{stats.rejected}</p>
              </div>

            </div>

            <div
              className="card-surface"
              style={{ marginTop: "25px" }}
            >
              <h2>Account Information</h2>

              <p>
                Keep your profile information up to date.
              </p>

              <ul className="profile-info">

                <li>
                  <strong>Name:</strong> {profile?.name}
                </li>

                <li>
                  <strong>Email:</strong> {profile?.email}
                </li>

                <li>
                  <strong>Role:</strong> {profile?.role}
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;