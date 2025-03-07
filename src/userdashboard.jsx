import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [score, setScore] = useState(0);
    const [attemptNumber, setAttemptNumber] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log("Fetched User ID:", userId);

        if (!userId) {
            console.error("No user ID found in local storage!");
            return;
        }

        // Fetch user details
        axios.get(`http://192.168.112.4:3002/api/users/${userId}`)
            .then(response => {
                setName(response.data.name);
                setUsername(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        // Fetch user score
        axios.get(`http://192.168.112.4:3002/api/scores/${userId}`)
            .then(response => {
                setScore(response.data.totalScore);
                setAttemptNumber(response.data.attemptNumber || 1);
                console.log("User score:", response.data.totalScore);
                console.log("Attempt Number:", response.data.attemptNumber);
            })
            .catch(error => {
                console.error('Error fetching user score:', error);
            });
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>User Dashboard</h1>
                <p style={styles.info}><strong>Name:</strong> {name}</p>
                <p style={styles.info}><strong>Username:</strong> {username}</p>
                <p style={styles.info}><strong>Score:</strong> {score}</p>
                <p style={styles.info}><strong>Attempt Number:</strong> {attemptNumber}</p>
                <Link to="/quiz" style={styles.button}>Start Quiz</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff',
        padding: '20px',
    },
    card: {
        backgroundColor: '#e8f5e9',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        color: '#4caf50',
        marginBottom: '20px',
    },
    info: {
        fontSize: '18px',
        color: '#4caf50',
        margin: '10px 0',
    },
    button: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background 0.3s ease',
    },
};

export default UserDashboard;
 