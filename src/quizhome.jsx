import React from 'react';

const QuizHomepage = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#25252b',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    },
    glowingOrbs: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
    },
    header: {
      fontSize: '3rem',
      color: '#45f3ff',
      marginBottom: '40px',
      textShadow: '0 0 10px #45f3ff',
      fontWeight: 'bold',
      letterSpacing: '2px',
    },
    quizList: {
      listStyleType: 'none',
      padding: '0',
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    quizItem: {
      margin: '10px auto',
      padding: '25px',
      backgroundColor: 'rgba(69, 243, 255, 0.1)',
      borderRadius: '15px',
      width: '80%',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(69, 243, 255, 0.3)',
      color: '#ffffff',
      fontSize: '1.2rem',
      position: 'relative',
      overflow: 'hidden',
    },
    relatedLinks: {
      marginTop: '60px',
      padding: '30px',
      backgroundColor: 'rgba(255, 39, 112, 0.1)',
      borderRadius: '20px',
      maxWidth: '800px',
      margin: '60px auto 0',
      border: '1px solid rgba(255, 39, 112, 0.3)',
    },
    relatedLinksTitle: {
      color: '#ff2770',
      fontSize: '2rem',
      marginBottom: '30px',
      textShadow: '0 0 10px #ff2770',
    },
    relatedLink: {
      color: '#45f3ff',
      textDecoration: 'none',
      margin: '0 20px',
      fontSize: '1.2rem',
      padding: '10px 20px',
      borderRadius: '30px',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(69, 243, 255, 0.3)',
      display: 'inline-block',
      marginBottom: '10px',
    },
  };

  // Add these styles to your component
  const additionalStyles = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    @keyframes glow {
      0% { box-shadow: 0 0 5px #45f3ff, 0 0 15px #45f3ff; }
      50% { box-shadow: 0 0 10px #45f3ff, 0 0 30px #45f3ff; }
      100% { box-shadow: 0 0 5px #45f3ff, 0 0 15px #45f3ff; }
    }

    @keyframes borderGlow {
      0% { border-color: rgba(69, 243, 255, 0.3); }
      50% { border-color: rgba(69, 243, 255, 0.8); }
      100% { border-color: rgba(69, 243, 255, 0.3); }
    }

    .quiz-item {
      animation: float 3s ease-in-out infinite;
    }

    .quiz-item:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 0 20px rgba(69, 243, 255, 0.4);
      background: rgba(69, 243, 255, 0.2);
      animation: glow 2s infinite;
    }

    .related-link:hover {
      background: rgba(69, 243, 255, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 0 15px rgba(69, 243, 255, 0.4);
    }
  `;

  const quizzes = [
    { id: 1, title: 'General Knowledge Quiz' },
    { id: 2, title: 'Science Quiz' },
    { id: 3, title: 'History Quiz' },
  ];

  const relatedWebsites = [
    { name: 'Wikipedia', url: 'https://www.wikipedia.org/' },
    { name: 'Khan Academy', url: 'https://www.khanacademy.org/' },
    { name: 'Coursera', url: 'https://www.coursera.org/' },
  ];

  return (
    <div style={styles.container}>
      <style>{additionalStyles}</style>
      <div style={styles.glowingOrbs}>
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
        }}></div>
      </div>
      
      <div style={styles.content}>
        <h1 style={styles.header}>Quiz Homepage</h1>

        <ul style={styles.quizList}>
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="quiz-item"
              style={styles.quizItem}
            >
              {quiz.title}
            </li>
          ))}
        </ul>

        <div style={styles.relatedLinks}>
          <h2 style={styles.relatedLinksTitle}>Related Websites</h2>
          {relatedWebsites.map((site, index) => (
            <a
              key={index}
              href={site.url}
              className="related-link"
              style={styles.relatedLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizHomepage;