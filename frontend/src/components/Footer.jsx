import React from 'react';
import { Link } from 'react-router-dom'; // If you want to add some navigation links

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.copy}>© 2024 Your Project Name. All rights reserved.</p>
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f" style={styles.iconStyle}></i>
          </a>
          <a href="https://twitter.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" style={styles.iconStyle}></i>
          </a>
          <a href="https://linkedin.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in" style={styles.iconStyle}></i>
          </a>
        </div>
        <div style={styles.navLinks}>
          <Link to="/privacy-policy" style={styles.navLink}>Privacy Policy</Link>
          <span style={styles.separator}>|</span>
          <Link to="/terms-of-service" style={styles.navLink}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1f2329',
    color: '#ffffff',
    padding: '15px 10px',  // Reduced padding to decrease the size
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
    width: '100%',
    boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  content: {
    maxWidth: '1000px',  // Reduced max-width for more compact content
    margin: '0 auto',
  },
  copy: {
    fontSize: '12px',  // Reduced font size
    marginBottom: '10px',  // Reduced margin
    fontWeight: 'lighter',
  },
  socialIcons: {
    marginBottom: '10px',  // Reduced margin
  },
  icon: {
    color: '#ffffff',
    margin: '0 8px',  // Reduced icon margin
    textDecoration: 'none',
  },
  iconStyle: {
    fontSize: '18px',  // Reduced icon size
    transition: 'color 0.3s',
  },
  navLinks: {
    marginTop: '5px',  // Reduced margin
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '12px',  // Reduced font size
    margin: '0 8px',  // Reduced margin
    transition: 'color 0.3s',
  },
  separator: {
    color: '#ffffff',
    margin: '0 5px',
  },
};

export default Footer;
