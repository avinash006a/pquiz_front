import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignupLogin = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    repassword: "",
  });

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  useEffect(() => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });

    // Cleanup event listeners on component unmount
    return () => {
      registerBtn.removeEventListener('click', () => {
        container.classList.add('active');
      });
      loginBtn.removeEventListener('click', () => {
        container.classList.remove('active');
      });
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://192.168.112.4:3002/api/users/signup", {
        name: formData.name,
        username: formData.username,
        password: formData.password,
      });

      const response = await axios.post("http://192.168.112.4:3002/api/users/login", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.userId);
        navigate("/userdashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error occurred!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.112.4:3002/api/users/login", {
        username: formData.username,
        password: formData.password,
      });
  
      if (response.status === 200) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("score", response.data.totalScore); // Store score as well
        navigate("/userdashboard"); // Redirect to the dashboard
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials!");
    }
  };
  
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: "Poppins", sans-serif;
              text-decoration: none;
              list-style: none;
          }

          body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: linear-gradient(90deg, #e2e2e2, #c9d6ff);
          }

          .container {
              position: relative;
              width: 850px;
              height: 550px;
              background: #fff;
              margin: 20px;
              border-radius: 30px;
              box-shadow: 0 0 30px rgba(0, 0, 0, .2);
              overflow: hidden;
          }

          .container h1 {
              font-size: 36px;
              margin: -10px 0;
          }

          .container p {
              font-size: 14.5px;
              margin: 15px 0;
          }

          form { width: 100%; }

          .form-box {
              position: absolute;
              right: 0;
              width: 50%;
              height: 100%;
              background: #fff;
              display: flex;
              align-items: center;
              color: #333;
              text-align: center;
              padding: 40px;
              z-index: 1;
              transition: .6s ease-in-out 1.2s, visibility 0s 1s;
          }

          .container.active .form-box { right: 50%; }

          .form-box.register { visibility: hidden; }
          .container.active .form-box.register { visibility: visible; }

          .input-box {
              position: relative;
              margin: 30px 0;
          }

          .input-box input {
              width: 100%;
              padding: 13px 50px 13px 20px;
              background: #eee;
              border-radius: 8px;
              border: none;
              outline: none;
              font-size: 16px;
              color: #333;
              font-weight: 500;
          }

          .input-box input::placeholder {
              color: #888;
              font-weight: 400;
          }

          .input-box i {
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 20px;
          }

          .forgot-link { margin: -15px 0 15px; }
          .forgot-link a {
              font-size: 14.5px;
              color: #333;
          }

          .btn {
              width: 100%;
              height: 48px;
              background: #7494ec;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, .1);
              border: none;
              cursor: pointer;
              font-size: 16px;
              color: #fff;
              font-weight: 600;
          }

          .social-icons {
              display: flex;
              justify-content: center;
          }

          .social-icons a {
              display: inline-flex;
              padding: 10px;
              border: 2px solid #ccc;
              border-radius: 8px;
              font-size: 24px;
              color: #333;
              margin: 0 8px;
          }

          .toggle-box {
              position: absolute;
              width: 100%;
              height: 100%;
          }

          .toggle-box::before {
              content: '';
              position: absolute;
              left: -250%;
              width: 300%;
              height: 100%;
              background: #7494ec;
              border-radius: 150px;
              z-index: 2;
              transition: 1.8s ease-in-out;
          }

          .container.active .toggle-box::before { left: 50%; }

          .toggle-panel {
              position: absolute;
              width: 50%;
              height: 100%;
              color: #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              z-index: 2;
              transition: .6s ease-in-out;
          }

          .toggle-panel.toggle-left { 
              left: 0;
              transition-delay: 1.2s; 
          }
          .container.active .toggle-panel.toggle-left {
              left: -50%;
              transition-delay: .6s;
          }

          .toggle-panel.toggle-right { 
              right: -50%;
              transition-delay: .6s;
          }
          .container.active .toggle-panel.toggle-right {
              right: 0;
              transition-delay: 1.2s;
          }

          .toggle-panel p { margin-bottom: 20px; }

          .toggle-panel .btn {
              width: 160px;
              height: 46px;
              background: transparent;
              border: 2px solid #fff;
              box-shadow: none;
          }

          @media (max-width: 768px) {
            .container {
              width: 100%;
              height: auto;
              margin: 10px;
              border-radius: 15px;
            }

            .form-box {
              width: 100%;
              padding: 20px;
            }

            .toggle-panel {
              width: 100%;
              padding: 20px;
            }

            .toggle-box {
              height: auto;
            }

            .input-box input {
              padding: 10px;
              font-size: 14px;
            }

            .btn {
              height: 40px;
              font-size: 14px;
            }

            .social-icons a {
              font-size: 20px;
            }
          }
        `}
      </style>
      <div className="container">
        <div className={`form-box ${isRegistering ? "register" : "login"}`}>
          {isRegistering ? (
            <form onSubmit={handleSubmit}>
              <h1>Registration</h1>
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="repassword"
                  placeholder="Re-enter Password"
                  value={formData.repassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn">Register</button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <i className="bx bxs-user" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <i className="bx bxs-lock-alt" />
              </div>
              <div className="forgot-link">
                <button type="button" onClick={() => alert("Forgot Password?")} style={{ background: 'none', border: 'none', color: '#333', textDecoration: 'underline', cursor: 'pointer' }}>
                  Forgot Password?
                </button>
              </div>
              <button type="submit" className="btn">Login</button>
            </form>
          )}
        </div>
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={toggleForm}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={toggleForm}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupLogin;