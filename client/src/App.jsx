import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Navbar/Nav.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import './globals.css';
const App = () => {
  return (
    <Router>
      <header>
        <Nav />
      </header>
      <main>
        <Sidebar />
        <div className="router">
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;