import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useNotification from "../hooks/useNotification";
import useConfirmation from "../hooks/useConfirmation";

export default function Dashboard() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { confirm } = useConfirmation();

  useEffect(() => {
    const userLocal = window.localStorage.getItem("user");
    if (!userLocal) {
      navigate("/");
    } else {
      const user = JSON.parse(userLocal)[0];
      console.log("Usuario autenticado:", user);
    }
  }, [navigate]);

  const handleLogout = () => {
    confirm(
      "¿Estás seguro?",
      () => {
        window.localStorage.removeItem("user");
        console.log("Sesion cerrada");
        notify("Has cerrado sesión correctamente", "success");
        navigate("/");
      }
    );
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