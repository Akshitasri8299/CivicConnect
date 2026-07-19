import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

import "./AdminAnalytics.css";

const COLORS = ["#98b77c", "#ffc658", "#ff6b6b", "#4dabf7"];

const AdminAnalytics = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get("/complaints");
      setComplaints(data);
    } catch (err) {
      console.log(err);
    }
  };

  // =====================
  // STATUS DATA
  // =====================

  const statusData = [
    {
      name: "Pending",
      value: complaints.filter(c => c.status === "pending").length,
    },
    {
      name: "In Progress",
      value: complaints.filter(c => c.status === "in-progress").length,
    },
    {
      name: "Resolved",
      value: complaints.filter(c => c.status === "resolved").length,
    },
    {
      name: "Rejected",
      value: complaints.filter(c => c.status === "rejected").length,
    },
  ];

  // =====================
  // CATEGORY DATA
  // =====================

  const categories = [
    "Pothole",
    "Garbage",
    "Streetlight",
    "Water Supply",
    "Other",
  ];

  const categoryData = categories.map((cat) => ({
    category: cat,
    count: complaints.filter(c => c.category === cat).length,
  }));

  // =====================
  // PRIORITY DATA
  // =====================

  const priorities = ["High", "Medium", "Low"];

  const priorityData = priorities.map((p) => ({
    priority: p,
    count: complaints.filter(c => c.priority === p).length,
  }));

  // =====================
  // COMPLAINTS PER DAY
  // =====================

  const grouped = {};

  complaints.forEach((c) => {
    const date = new Date(c.createdAt).toLocaleDateString();

    grouped[date] = (grouped[date] || 0) + 1;
  });

  const trendData = Object.keys(grouped).map((date) => ({
    date,
    complaints: grouped[date],
  }));

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1>📊 Analytics Dashboard</h1>
          <p>Insights about complaints submitted on CivicConnect.</p>
        </div>

        {/* Stats */}

        <div className="stats-cards">

          <div className="stats-card">
            <h3>Total Complaints</h3>
            <p>{complaints.length}</p>
          </div>

          <div className="stats-card">
            <h3>Resolved</h3>
            <p>{statusData[2].value}</p>
          </div>

          <div className="stats-card">
            <h3>Pending</h3>
            <p>{statusData[0].value}</p>
          </div>

          <div className="stats-card">
            <h3>Rejected</h3>
            <p>{statusData[3].value}</p>
          </div>

        </div>

        <div className="analytics-grid">

          {/* Pie Chart */}

          <div className="chart-card">

            <h2>Complaint Status</h2>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Category */}

          <div className="chart-card">

            <h2>Complaints by Category</h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={categoryData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" fill="#98b77c" />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Priority */}

          <div className="chart-card">

            <h2>Priority Distribution</h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={priorityData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="priority" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" fill="#ff9f43" />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Trend */}

          <div className="chart-card">

            <h2>Complaint Trend</h2>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={trendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="complaints"
                  stroke="#4dabf7"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;