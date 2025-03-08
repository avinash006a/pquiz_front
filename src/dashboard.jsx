import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const API_URL = "http://192.168.70.4:3002/api"; // Backend Base URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchScores();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      if (response.data) {
        setUsers(response.data);
      } else {
        console.log("No users found.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch scores from backend
  const fetchScores = async () => {
    try {
      const response = await axios.get(`${API_URL}/scores`);
      if (response.data) {
        setScores(response.data);
      } else {
        console.log("No scores found.");
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Delete score by ID
  const deleteScore = async (scoreId) => {
    if (window.confirm("Are you sure you want to delete this score?")) {
      try {
        await axios.delete(`${API_URL}/scores/${scoreId}`);
        setScores(scores.filter((score) => score._id !== scoreId));
      } catch (error) {
        console.error("Error deleting score:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📊 Admin Dashboard</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}>👥 User Details</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>SNo</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Username</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.username}</td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteUser(user._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.tableCell}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionHeader}>🏆 Quiz Scores</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>SNo</th>
              <th style={styles.tableHeader}>User Name</th>
              <th style={styles.tableHeader}>Set Number</th>
              <th style={styles.tableHeader}>Total Score</th>
              <th style={styles.tableHeader}>Details</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => {
                const user = users.find((u) => u._id === score.userId);
                return (
                  <tr key={score._id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{index + 1}</td>
                    <td style={styles.tableCell}>
                      {user ? user.name : "Unknown User"}
                    </td>
                    <td style={styles.tableCell}>{score.setNumber}</td>
                    <td style={styles.tableCell}>{score.totalScore}</td>
                    <td style={styles.tableCell}>
                      {score.scoreByTopic ? (
                        Object.entries(score.scoreByTopic).map(
                          ([topic, value]) => (
                            <p key={topic} style={styles.scoreDetail}>
                              <strong>{topic}:</strong> {value}
                            </p>
                          )
                        )
                      ) : (
                        <p>No details available</p>
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.deleteButton}
                        onClick={() => deleteScore(score._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={styles.tableCell}>
                  No scores found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button style={styles.homeButton} onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    fontSize: "2rem",
    fontWeight: "bold",
    animation: "fadeIn 1s ease-in-out",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    transition: "transform 0.3s ease-in-out",
    animation: "slideIn 0.5s ease-in-out",
  },
  sectionHeader: {
    color: "#555",
    marginBottom: "15px",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s ease-in-out",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
  },
  scoreDetail: {
    margin: "4px 0",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease-in-out",
  },
  homeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    display: "block",
    margin: "20px auto",
    transition: "background-color 0.3s ease-in-out",
  },
  // Removed hover effects
};

// CSS Animations & Hover Effects
const animations = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Hover effects */
  tr:hover {
    background-color: #f1f1f1;
  }

  button:hover {
    opacity: 0.8;
  }

  .delete-button:hover {
    background-color: #cc0000 !important;
  }

  .home-button:hover {
    background-color: #005bb5 !important;
  }
`;

// Add animations and hover effects to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = animations;
document.head.appendChild(styleSheet);

export default Dashboard;