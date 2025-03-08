import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const staticUsername = "1";
    const staticPassword = "1";

    if (username === staticUsername && password === staticPassword) {
      navigate("/dashboard");
    } else {
      setAttempts((prevAttempts) => prevAttempts + 1);
      setError("Wrong UserName or password");

      setTimeout(() => {
        setError("");
        setUsername("");
        setPassword("");
      }, 3000);

      if (attempts + 1 >= 3) {
        window.close();
      }
    }
  };

  const styles = {
    container: {
      backgroundColor: "#25252b",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "none",
      border: "none",
      color: "#45f3ff",
      fontSize: "28px",
      cursor: "pointer",
      textShadow: "0 0 10px #45f3ff",
      transition: "all 0.3s ease",
      zIndex: 10,
    },
    form: {
      backgroundColor: "rgba(69, 243, 255, 0.05)",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 0 30px rgba(69, 243, 255, 0.2)",
      width: "100%",
      maxWidth: "400px",
      color: "white",
      border: "1px solid rgba(69, 243, 255, 0.3)",
      position: "relative",
      backdropFilter: "blur(10px)",
      animation: "formFloat 3s ease-in-out infinite",
    },
    heading: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#45f3ff",
      fontSize: "2.2em",
      textShadow: "0 0 10px #45f3ff",
      letterSpacing: "2px",
      fontWeight: "600",
    },
    inputGroup: {
      marginBottom: "25px",
      position: "relative",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontSize: "16px",
      color: "#ffffff",
      textShadow: "0 0 5px rgba(69, 243, 255, 0.5)",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid rgba(69, 243, 255, 0.3)",
      borderRadius: "30px",
      outline: "none",
      backgroundColor: "rgba(69, 243, 255, 0.1)",
      color: "white",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    error: {
      color: "#ff2770",
      textAlign: "center",
      marginBottom: "15px",
      textShadow: "0 0 5px #ff2770",
    },
    submitButton: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "30px",
      backgroundColor: "#ff2770",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
      boxShadow: "0 0 20px rgba(255, 39, 112, 0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes formFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes glowingBorder {
            0%, 100% { border-color: rgba(69, 243, 255, 0.3); }
            50% { border-color: rgba(69, 243, 255, 0.8); }
          }

          .cyber-input:focus {
            border-color: #45f3ff;
            box-shadow: 0 0 20px rgba(69, 243, 255, 0.3);
          }

          .cyber-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 30px rgba(255, 39, 112, 0.5);
          }

          .close-button:hover {
            transform: rotate(90deg);
            color: #ff2770;
            text-shadow: 0 0 10px #ff2770;
          }
        `}
      </style>

      {/* Background Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: '#45f3ff',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: '0.15',
        animation: 'formFloat 8s infinite ease-in-out',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: '400px',
        height: '400px',
        background: '#ff2770',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: '0.15',
        animation: 'formFloat 8s infinite ease-in-out reverse',
      }}></div>

      <button
        onClick={() => navigate(-1)}
        style={styles.closeButton}
        className="close-button"
      >
        ×
      </button>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Admin Login</h2>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            required
            value={username}
            onChange={handleUsernameChange}
            style={styles.input}
            className="cyber-input"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            style={styles.input}
            className="cyber-input"
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          type="submit"
          style={styles.submitButton}
          className="cyber-button"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Admin;
