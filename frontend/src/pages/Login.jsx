
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/Toast.jsx";

import "./Auth.css";

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      const user = await login(form.email, form.password);

      showToast(`Welcome back, ${user.name.split(" ")[0]}!`, "success");

      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page auth-page">
<Link to="/" className="back-home-btn">
  ← Back to Home
</Link>
      <div className="auth-card card-surface">
        <h1>Welcome Back</h1>

        <p className="auth-sub">
          Log in to file complaints, track updates, and help improve your city.
        </p>

        {serverError && (
          <div className="auth-error-banner">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              className={`form-control ${
                errors.email ? "has-error" : ""
              }`}
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            {errors.email && (
              <div className="field-error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              className={`form-control ${
                errors.password ? "has-error" : ""
              }`}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            {errors.password && (
              <div className="field-error">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>
      </div>

    </div>
  );
};

export default Login;