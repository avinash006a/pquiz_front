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

  return (
    <div
      style={{
        backgroundColor: "#003366",  // Blue background
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "none",
          border: "none",
          color: "#f1f1f1",  // Lighter text color
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        &times;
      </button>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#006699",  // Lighter blue for form
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "400px",
          color: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#d2b48c",  // Beige/gold color for the heading
          }}
        >
          Admin Login
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#f1f1f1",  // Lighter text color for labels
            }}
          >
            Username:
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={handleUsernameChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              outline: "none",
              backgroundColor: "#004d66",  // Darker blue for inputs
              color: "white",
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              color: "#f1f1f1",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              outline: "none",
              backgroundColor: "#004d66",
              color: "white",
              fontSize: "14px",
            }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#3399ff",  // Blue button color
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#66b3ff")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3399ff")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Admin;
