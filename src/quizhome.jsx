import React from 'react';

const QuizHomepage = () => {
  // Internal CSS
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    },
    header: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '20px',
    },
    quizList: {
      listStyleType: 'none',
      padding: '0',
    },
    quizItem: {
      margin: '10px auto',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '60%',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    quizItemHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    relatedLinks: {
      marginTop: '40px',
    },
    relatedLink: {
      color: '#007BFF',
      textDecoration: 'none',
      margin: '0 10px',
      fontSize: '1.1rem',
    },
    relatedLinkHover: {
      textDecoration: 'underline',
    },
  };

  // Quiz data
  const quizzes = [
    { id: 1, title: 'General Knowledge Quiz' },
    { id: 2, title: 'Science Quiz' },
    { id: 3, title: 'History Quiz' },
  ];

  // Related websites
  const relatedWebsites = [
    { name: 'Wikipedia', url: 'https://www.wikipedia.org/' },
    { name: 'Khan Academy', url: 'https://www.khanacademy.org/' },
    { name: 'Coursera', url: 'https://www.coursera.org/' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Quiz Homepage</h1>

      {/* Quiz List */}
      <ul style={styles.quizList}>
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            style={styles.quizItem}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {quiz.title}
          </li>
        ))}
      </ul>

      {/* Related Websites */}
      <div style={styles.relatedLinks}>
        <h2>Related Websites</h2>
        {relatedWebsites.map((site, index) => (
          <a
            key={index}
            href={site.url}
            style={styles.relatedLink}
            onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuizHomepage;