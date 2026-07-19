import { Link } from "react-router-dom";
import "./Landing.css";
import Footer from "../components/Footer";
const Landing = () => {
  return (
   <div className="landing-hero" id="home">
      <div className="container">
        <div className="landing-content">
          <span className="landing-eyebrow">Civic issues, resolved together</span>
          <h1>Report it. Track it. See it fixed.</h1>
          <p className="landing-sub">
            CivicConnect makes it simple to report potholes, garbage collection issues,
            broken streetlights, and water supply problems to your local authorities —
            and follow every step of the resolution with a real tracking ticket.
          </p>
          <div className="landing-actions">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-outline">I already have an account</Link>
          </div>

          <div className="landing-features">
            <div className="feature-card">
              <span className="feature-icon">🎫</span>
              <h3>Ticketed Tracking</h3>
              <p>Every complaint gets a unique tracking ID so you always know its status.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Full Transparency</h3>
              <p>See the complete status history — from filing to resolution.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🏛️</span>
              <h3>Direct to Officials</h3>
              <p>Your reports go straight to the admin team responsible for resolving them.</p>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
<section className="about-section" id="about">
  <div className="container">
    <div className="about-grid">

      <div className="about-text">
        <span className="section-tag">About CivicConnect</span>

        <h2>Making cities smarter through citizen participation.</h2>

        <p>
          CivicConnect is a digital grievance management platform where
          citizens can report potholes, garbage, broken streetlights,
          and water supply issues with ease.
        </p>

        <p>
          Every complaint gets a unique tracking ID, allowing users
          to monitor progress while helping authorities resolve issues
          efficiently.
        </p>

        <div className="about-buttons">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>

          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
        </div>
      </div>

      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900"
          alt="Smart City"
        />
      </div>

    </div>
  </div>
</section>
{/* How It Works */}
<section className="how-section" id="how">
  <div className="container">

    <div className="section-heading">
      <span className="section-tag">Process</span>
      <h2>How CivicConnect Works</h2>
      <p>
        Reporting civic issues is simple and transparent.
      </p>
    </div>

    <div className="steps">

      <div className="step-card">
        <div className="step-number">1</div>
        <h3>Report Issue</h3>
        <p>
          Citizens submit complaints with location and details.
        </p>
      </div>

      <div className="step-card">
        <div className="step-number">2</div>
        <h3>Admin Reviews</h3>
        <p>
          Authorities verify and begin processing the complaint.
        </p>
      </div>

      <div className="step-card">
        <div className="step-number">3</div>
        <h3>Track Progress</h3>
        <p>
          Citizens can monitor complaint status anytime.
        </p>
      </div>

      <div className="step-card">
        <div className="step-number">4</div>
        <h3>Issue Resolved</h3>
        <p>
          Once completed, the complaint is marked as resolved.
        </p>
      </div>

    </div>
  </div>
</section>
{/* Impact Section */}

<section className="stats-section" id="impact">
  <div className="container">

    <div className="section-heading">
      <span className="section-tag">Impact</span>
      <h2>Making Cities Better Together</h2>
      <p>
        Thousands of citizens can use CivicConnect to improve their communities.
      </p>
    </div>

    <div className="stats-grid">

      <div className="stat-card">
        <h2>10K+</h2>
        <p>Complaints Registered</p>
      </div>

      <div className="stat-card">
        <h2>92%</h2>
        <p>Resolved Successfully</p>
      </div>

      <div className="stat-card">
        <h2>50+</h2>
        <p>Cities Connected</p>
      </div>

      <div className="stat-card">
        <h2>24/7</h2>
        <p>Complaint Tracking</p>
      </div>

    </div>

  </div>
</section>
<Footer />
    </div>
  );
};

export default Landing;
