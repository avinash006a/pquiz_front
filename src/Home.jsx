import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Internal CSS (JavaScript object styles)
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "url('/assets/img and video/quiz video.mp4') ",
      backgroundSize: "cover",
    },
    container: {
      textAlign: "center",
      background: "rgba(255, 255, 255, 0.2)",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(10px)",
      maxWidth: "400px",
      width: "90%",
    },
    heading: {
      fontSize: "2.5rem",
      color: "#fff",
      marginBottom: "20px",
      animation: "fadeIn 3s ease-in-out",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    button: {
      background: "#fff",
      color: "#333",
      fontSize: "1.2rem",
      fontWeight: "bold",
      padding: "12px 20px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "0.3s",
    },
    buttonHover: {
      background: "#333",
      color: "#fff",
      transform: "scale(1.05)",
    },
    video: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };

  return (
    <div style={styles.body}>
      <video autoPlay loop muted style={{ ...styles.video, ...styles.body }}>
        <source src="/assets/img and video/quiz video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome</h1>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) =>
              Object.assign(e.target.style, styles.buttonHover)
            }
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          
          <button
            style={styles.button}
            onMouseOver={(e) =>
              Object.assign(e.target.style, styles.buttonHover)
            }
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// Add keyframes for the animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`, styleSheet.cssRules.length);

export default Home;
