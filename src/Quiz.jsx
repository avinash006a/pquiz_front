import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let setNumber = localStorage.getItem("quizSetNumber");

        if (!setNumber) {
          setNumber = Math.floor(Math.random() * 3) + 1;
          localStorage.setItem("quizSetNumber", setNumber);
        }

        const response = await axios.get(`http://192.168.71.4:3002/api/questions/${setNumber}/random`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Error fetching questions.");
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      if (prevAnswers[questionId] === answer) {
        // Deselect the answer if it's already selected
        const { [questionId]: _, ...rest } = prevAnswers; // Remove the selected answer
        return rest;
      }
      // Select the new answer
      return { ...prevAnswers, [questionId]: answer };
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (questions.length === 0) {
        alert("No questions available.");
        return;
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in.");
        return;
      }

      const setNumber = localStorage.getItem("quizSetNumber") || 1;
      const formattedAnswers = {};
      questions.forEach((q) => {
        if (answers.hasOwnProperty(q._id.toString())) {
          formattedAnswers[q._id.toString()] = answers[q._id.toString()];
        }
      });

      const response = await axios.post("http://192.168.71.4:3002/api/scores/sc", {
        userId,
        setNumber,
        answers: formattedAnswers,
      });

      if (!response.data || typeof response.data.totalScore === "undefined") {
        throw new Error("Invalid response format from server");
      }

      const { totalScore, scoreByTopic, lowestTopic } = response.data;
      navigate("/result", { state: { totalScore, scoreByTopic, lowestTopic } });

      localStorage.removeItem("quizSetNumber");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz.");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={styles.quizContainer}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <h1 style={styles.quizTitle}>Quiz</h1>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>
      {currentQuestion && (
        <div style={styles.questionCard}>
          <p style={styles.questionText}>{currentQuestion.question}</p>
          <div style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion._id.toString(), option)}
                style={{
                  ...styles.optionButton,
                  ...(answers[currentQuestion._id] === option ? styles.selectedOption : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={styles.navigationButtons}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={styles.navButton}
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} style={styles.navButton}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} style={styles.navButton}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;

// Internal CSS Styles
const styles = {
  quizContainer: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    padding: "2rem",
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    margin: "2rem auto",
    animation: "fadeIn 0.5s ease-in-out",
  },
  quizTitle: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1.5rem",
  },
  progressBar: {
    background: "#e0e0e0",
    borderRadius: "5px",
    height: "10px",
    width: "100%",
    marginBottom: "1.5rem",
    overflow: "hidden",
  },
  progress: {
    background: "#4CAF50",
    height: "100%",
    transition: "width 0.3s ease",
  },
  questionCard: {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
  },
  questionText: {
    fontSize: "1.25rem",
    color: "#333",
    marginBottom: "1.5rem",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  optionButton: {
    background: "#f9f9f9",
    border: "2px solid #ddd",
    borderRadius: "5px",
    padding: "0.75rem",
    fontSize: "1rem",
    color: "#333",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s, border-color 0.3s",
  },
  selectedOption: {
    background: "#4CAF50",
    color: "white",
    borderColor: "#4CAF50",
  },
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
  navButton: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
};