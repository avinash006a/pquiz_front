import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const videoLinks = {
  Percentage: {
    Hard: "https://example.com/percentage-hard",
    Medium: "https://example.com/percentage-medium",
    Basic: "https://example.com/percentage-basic",
  },
  Algebra: {
    Hard: "https://example.com/algebra-hard",
    Medium: "https://example.com/algebra-medium",
    Basic: "https://example.com/algebra-basic",
  },
  Geometry: {
    Hard: "https://example.com/geometry-hard",
    Medium: "https://example.com/geometry-medium",
    Basic: "https://example.com/geometry-basic",
  },
};

const classifyDifficulty = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage >= 60) return "Hard";
  if (percentage >= 35) return "Medium";
  return "Basic";
};

const classifyTotalScore = (score) => {
  if (score === 30) return "🌟 Outstanding Performance! You demonstrated exceptional mastery.";
  if (score >= 25) return "👏 Excellent Work! Your strong grasp of the concepts is evident.";
  if (score >= 20) return "👍 Great Effort! You're making significant progress.";
  return "💡 Keep Striving! Every attempt is a step toward improvement.";
};

const getAppreciationMessage = (difficulty) => {
  if (difficulty === "Hard") return "🚀 Exceptional! Your expertise in this topic is truly commendable.";
  if (difficulty === "Medium") return "📈 Well Done! A little more practice will take you to the next level.";
  return "📚 Keep Learning! Building a strong foundation is the key to success.";
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, scoreByTopic } = location.state || {};

  if (!scoreByTopic) {
    alert("Invalid result data. Redirecting to the quiz...");
    navigate("/quiz");
    return null;
  }

  // Assume each topic has an equal number of questions (total/3)
  const totalQuestionsPerTopic = Math.ceil(30 / 3) || 1; // Assuming 30 total questions

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <h1 style={styles.header}>📊 Quiz Results</h1>
      <div style={styles.totalScoreCard}>
        <h2 style={styles.totalScoreText}>Your Total Score: {totalScore}</h2>
        <p style={styles.totalScoreMessage}>{classifyTotalScore(totalScore)}</p>
      </div>

      <h3 style={styles.topicHeader}>📝 Performance by Topic</h3>
      {Object.entries(scoreByTopic).map(([topic, score]) => {
        const difficulty = classifyDifficulty(score, totalQuestionsPerTopic);
        const percentage = ((score / totalQuestionsPerTopic) * 100).toFixed(2);
        return (
          <div key={topic} style={styles.topicCard}>
            <h4 style={styles.topicTitle}>{topic}</h4>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${percentage}%`,
                  backgroundColor:
                    difficulty === "Hard" ? "#4CAF50" : difficulty === "Medium" ? "#FFC107" : "#F44336",
                }}
              ></div>
            </div>
            <p style={styles.topicScore}>
              Score: {score}/{totalQuestionsPerTopic} ({percentage}%)
            </p>
            <p style={styles.topicMessage}>{getAppreciationMessage(difficulty)}</p>
            <a
              href={videoLinks[topic][difficulty]}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.videoLink}
            >
              🎥 Watch Video for {topic}
            </a>
          </div>
        );
      })}

      <button onClick={() => navigate("/userdashboard")} style={styles.homeButton}>
        Go to Home
      </button>
    </div>
  );
};

export default Result;

// Internal CSS Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    textAlign: "center",
    animation: "fadeIn 0.5s ease-in-out",
  },
  header: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "1rem",
  },
  totalScoreCard: {
    background: "#4CAF50",
    color: "white",
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  totalScoreText: {
    fontSize: "2rem",
    margin: "0",
  },
  totalScoreMessage: {
    fontSize: "1.2rem",
    margin: "0.5rem 0 0",
  },
  topicHeader: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1.5rem",
  },
  topicCard: {
    background: "white",
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  topicTitle: {
    fontSize: "1.5rem",
    color: "#333",
    margin: "0 0 1rem",
  },
  progressBar: {
    background: "#e0e0e0",
    borderRadius: "10px",
    height: "10px",
    overflow: "hidden",
    marginBottom: "1rem",
  },
  progressFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },
  topicScore: {
    fontSize: "1.2rem",
    color: "#555",
    margin: "0.5rem 0",
  },
  topicMessage: {
    fontSize: "1.1rem",
    color: "#333",
    margin: "0.5rem 0",
  },
  videoLink: {
    display: "inline-block",
    background: "#2196F3",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    textDecoration: "none",
    marginTop: "1rem",
    transition: "background-color 0.3s, transform 0.2s",
  },
  homeButton: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "2rem",
    transition: "background-color 0.3s, transform 0.2s",
  },
};