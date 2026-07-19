import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../components/Toast";
import { Link } from "react-router-dom";
import "./Tickets.css";

const Tickets = () => {
  const { showToast } = useToast();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");

  const fetchTickets = async () => {
    try {
      const { data } = await api.get("/complaints");
      setTickets(data);
    } catch (err) {
      showToast("Failed to load tickets", "error");
    } finally {
      setLoading(false);
    }
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this complaint?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/complaints/${id}`);

    setTickets((prev) => prev.filter((ticket) => ticket._id !== id));

    showToast("Complaint deleted successfully", "success");
  } catch (err) {
    showToast(
      err.response?.data?.message || "Failed to delete complaint",
      "error"
    );
  }
};
  useEffect(() => {
    fetchTickets();
  }, []);
const filteredTickets = tickets.filter((ticket) => {
  return (
    ticket.ticketId.toLowerCase().includes(search.toLowerCase()) ||
    ticket.title.toLowerCase().includes(search.toLowerCase()) ||
    ticket.category.toLowerCase().includes(search.toLowerCase()) ||
    ticket.priority.toLowerCase().includes(search.toLowerCase()) ||
    ticket.status.toLowerCase().includes(search.toLowerCase()) ||
    ticket.citizen?.name?.toLowerCase().includes(search.toLowerCase())
  );
});
  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1>Complaint Tickets</h1>
          <p>Manage every complaint submitted by citizens.</p>
        </div>
<div className="dashboard-search">
  <input
    type="text"
    placeholder="🔍 Search Ticket ID, Citizen, Category..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
        {loading ? (
          <div className="spinner"></div>
        ) : (

          <div className="tickets-table">

            <table>

              <thead>

                <tr>

                  <th>Ticket ID</th>

                  <th>Citizen</th>

                  <th>Category</th>

                  <th>Priority</th>

                  <th>Status</th>

                  <th>Date</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredTickets.map((ticket) => (

                  <tr key={ticket._id}>

                    <td>{ticket.ticketId}</td>

                    <td>{ticket.citizen?.name}</td>

                    <td>{ticket.category}</td>

                    <td>{ticket.priority}</td>

                    <td>
                      <span className={`status-badge status-${ticket.status}`}>
                        {ticket.status}
                      </span>
                    </td>

                    <td>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>

                    <td className="action-buttons">

  <Link
    className="table-btn view-btn"
    to={`/complaints/${ticket._id}`}
  >
    👁 View
  </Link>

  <button
    className="table-btn delete-btn"
    onClick={() => handleDelete(ticket._id)}
  >
    🗑 Delete
  </button>

</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </div>
  );
};

export default Tickets;