import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div>
          <h2>CivicConnect</h2>
          <p>
            Empowering citizens to report civic issues and helping
            authorities resolve them efficiently.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#how">How It Works</a>
          <a href="#impact">Impact</a>
        </div>

        <div>
          <h3>Contact</h3>

          <p>📧 support@civicconnect.com</p>
          <p>📞 +91 9876543210</p>
          <p>📍 Ghaziabad, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 CivicConnect | Built by Akshita Srivastava
      </div>
    </footer>
  );
};

export default Footer;