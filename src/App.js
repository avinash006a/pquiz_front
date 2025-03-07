import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Quiz from "./Quiz";
import Result from "./result";
import Dashboard from "./dashboard";
import Admin from "./adminlogin";
import QuizHome from "./quizhome";
import UserDashboard from "./userdashboard";
import SignupLogin from "./Signup";
import SignUp from "./newsignup";
import Login from "./login";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<SignupLogin/>} /> */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/quizhome" element={<QuizHome />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        

      </Routes>
    </Router>
  );
};

export default App;
