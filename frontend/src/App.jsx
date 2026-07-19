import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ComplaintDetail from "./pages/ComplaintDetail.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/Users.jsx";
import Contact from "./pages/Contact.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import Tickets from "./pages/Tickets.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";

function App() {
  const location = useLocation();

  // Hide Navbar & Chat on Auth Pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const hideChat =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
  path="/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/tickets"
          element={
            <AdminRoute>
              <Tickets />
            </AdminRoute>
          }
        />

        <Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <AdminAnalytics />
    </ProtectedRoute>
  }
/>

        {/* Fallback */}
        <Route path="*" element={<Landing />} />
      </Routes>

      {!hideChat && <ChatWidget />}
    </>
  );
}

export default App;