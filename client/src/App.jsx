import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormUser from "./pages/FormUser";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Navbar/Nav.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import './globals.css';
const App = () => {
  return (
    <Router>
      <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          limit={3}
          pauseOnFocusLoss
          pauseOnHover
        />
      <header>
        <Nav />
      </header>
      <main>
        <Sidebar />
        <div className="router">
            <Routes>
            <Route path="/" element={<FormUser />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;