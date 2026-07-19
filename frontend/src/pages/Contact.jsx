import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useToast } from "../components/Toast";
import "./Contact.css";

const Contact = () => {
  const { showToast } = useToast();
const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    showToast("Message sent successfully! We'll get back to you soon.", "success");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Have a question or suggestion?
          Send us a message.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-form-card">

          <h2>Send us a Message</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Your Message..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

        <div className="contact-info-card">

          <h2>Contact Information</h2>

          <div className="info-item">
            📍 Ghaziabad, Uttar Pradesh
          </div>

          <div className="info-item">
            📞 +91 98765 43210
          </div>

          <div className="info-item">
            ✉ support@civicconnect.com
          </div>

          <div className="info-item">
            🕒 Monday - Friday <br />
            9:00 AM - 6:00 PM
          </div>

        </div>

      </div>

      <div className="map-section">

        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Ghaziabad&output=embed"
          loading="lazy"
        ></iframe>

      </div>
<div className="contact-back">
  {!user ? (
    <Link to="/" className="btn btn-outline">
      ← Back to Home
    </Link>
  ) : user.role === "admin" ? (
    <Link to="/admin" className="btn btn-outline">
      ← Back to Dashboard
    </Link>
  ) : (
    <Link to="/dashboard" className="btn btn-outline">
      ← Back to Dashboard
    </Link>
  )}
</div>
    </div>
    
  );
};

export default Contact;