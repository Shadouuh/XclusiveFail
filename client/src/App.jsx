import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import FormUser from "./pages/FormUser";

import { ToastContainer } from "react-toastify";

function App() {
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
      <Routes>
        <Route path="/" element={<FormUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
