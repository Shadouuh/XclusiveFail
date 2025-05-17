import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./styles.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickOrEmail: "",
    password: "",
    remember: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nickOrEmail || !formData.password) {
      setError("Todos los campos son requeridos");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/user/login", {
        nickOrEmail: formData.nickOrEmail,
        password: formData.password
      });

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="background-wrapper">
        <span className="extra-blur"></span>
        <span className="extra-blur-2"></span>
        <div className="login-container">
          <div className="login-form">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
            <div className="logo">
              <h1>XclusiveGames</h1>
              <img src="../../assets/icon.png" alt="Logo" />
            </div>

            <h2>Iniciar Sesión</h2>

            <label>Email o Usuario</label>
            <div className="input-group">
              <img src="../../assets/email.png" alt="Ícono Email" />
              <input 
                type="text" 
                name="nickOrEmail"
                placeholder="Correo Electrónico o Usuario" 
                value={formData.nickOrEmail}
                onChange={handleChange}
              />
            </div>

            <label>Contraseña</label>
            <div className="input-group">
              <img src="../../assets/lock.png" alt="Ícono Contraseña" />
              <input 
                type="password" 
                name="password"
                placeholder="Contraseña" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-options">
              <label className="custom-checkbox">
                <input 
                  type="checkbox" 
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Recordarme
              </label>

              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Procesando..." : "Iniciar sesión"}
            </button>
            </form>

            <div className="divider">
              <div className="divider-title">
                <h5>Inicia Sesión con</h5>
              </div>
              <div className="social-icons">
                <a href="#">
                  <span className="icons">
                    <img src="../../assets/google.png" alt="Google" />
                  </span>
                </a>
                <a href="#">
                  <span className="icons">
                    <img src="../../assets/facebook.png" alt="Facebook" />
                  </span>
                </a>
                <a href="#">
                  <span className="icons">
                    <img src="../../assets/twitter.png" alt="Twitter" />
                  </span>
                </a>
              </div>
            </div>

            <p className="register-link">
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>

          <div className="login-image">
            <img src="../../assets/Rectangle 1.png" alt="Login Visual" />
          </div>
        </div>
      </div>
    </div>
  );
}
