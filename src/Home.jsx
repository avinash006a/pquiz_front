import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#25252b",
      position: "relative",
      overflow: "hidden",
    },
    container: {
      textAlign: "center",
      background: "rgba(37, 37, 43, 0.8)",
      padding: "50px 40px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      maxWidth: "450px",
      width: "90%",
      position: "relative",
      border: "1px solid rgba(69, 243, 255, 0.3)",
      boxShadow: "0 0 30px rgba(69, 243, 255, 0.2)",
      animation: "floatContainer 3s ease-in-out infinite",
    },
    heading: {
      fontSize: "3.5rem",
      color: " #ff2770",
      marginBottom: "40px",
      textShadow: "0 0 10px #45f3ff",
      fontWeight: "700",
      letterSpacing: "3px",
      animation: "glowText 2s ease-in-out infinite",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      position: "relative",
      zIndex: "1",
    },
    button: {
      background: "rgba(69, 243, 255, 0.1)",
      color: "#45f3ff",
      fontSize: "1.2rem",
      fontWeight: "600",
      padding: "15px 30px",
      border: "1px solid rgba(69, 243, 255, 0.3)",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      letterSpacing: "1px",
    },
    buttonHover: {
      background: "#ff2770",
      color: "#ffffff",
      transform: "translateY(-3px)",
      boxShadow: "0 0 30px rgba(255, 39, 112, 0.5)",
      border: "1px solid #ff2770",
    },
    video: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: "0.3",
    },
    glowingOrb1: {
      position: "absolute",
      top: "20%",
      left: "10%",
      width: "300px",
      height: "300px",
      background: "#45f3ff",
      borderRadius: "50%",
      filter: "blur(100px)",
      opacity: "0.15",
      animation: "moveOrb 8s ease-in-out infinite",
    },
    glowingOrb2: {
      position: "absolute",
      bottom: "10%",
      right: "20%",
      width: "400px",
      height: "400px",
      background: "#ff2770",
      borderRadius: "50%",
      filter: "blur(100px)",
      opacity: "0.15",
      animation: "moveOrb 8s ease-in-out infinite reverse",
    },
  };

  return (
    <div style={styles.body}>
      <style>
        {`
          @keyframes glowText {
            0%, 100% { text-shadow: 0 0 10px #45f3ff; }
            50% { text-shadow: 0 0 20px #45f3ff, 0 0 30px #45f3ff; }
          }

          @keyframes floatContainer {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes moveOrb {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(50px, 20px); }
          }

          @keyframes buttonGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(69, 243, 255, 0.5); }
            50% { box-shadow: 0 0 20px rgba(69, 243, 255, 0.8); }
          }

          .cyber-button {
            position: relative;
            overflow: hidden;
          }

          .cyber-button:before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: rgba(255, 255, 255, 0.1);
            transform: rotate(45deg);
            transition: 0.5s;
            opacity: 0;
          }

          .cyber-button:hover:before {
            opacity: 1;
            transform: rotate(45deg) translateY(100%);
          }
        `}
      </style>

      <div style={styles.glowingOrb1}></div>
      <div style={styles.glowingOrb2}></div>

      <video autoPlay loop muted style={styles.video}>
        <source src="/assets/img and video/quiz video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome</h1>
        <div style={styles.buttonContainer}>
          <button
            className="cyber-button"
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, styles.button)}
            onClick={() => navigate("/login")}
          >
            Sign Up
          </button>
          
          <button
            className="cyber-button"
            style={styles.button}
            onMouseOver={(e) => Object.assign(e.target.style, styles.buttonHover)}
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

export default Home;
