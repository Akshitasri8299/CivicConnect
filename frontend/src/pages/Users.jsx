import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalCitizens = users.filter((u) => u.role === "citizen").length;

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1>👥 Community</h1>
          <p>Registered users of CivicConnect.</p>
        </div>

        <div className="stats-cards">

          <div className="stats-card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>

          <div className="stats-card">
            <h3>Citizens</h3>
            <p>{totalCitizens}</p>
          </div>

          <div className="stats-card">
            <h3>Admins</h3>
            <p>{totalAdmins}</p>
          </div>

        </div>

        <div className="dashboard-search">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="users-table-container">

          <table className="users-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <span className={`role ${user.role}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default Users;