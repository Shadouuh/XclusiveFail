import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>XclusiveGames</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <main>
        <h2>Bienvenido a XclusiveGames</h2>
        <p>Esta es tu página de inicio. Aquí podrás ver tus juegos y más.</p>
      </main>
    </div>
  );
}