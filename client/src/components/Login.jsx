import React from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="background-wrapper">
        <span class="extra-blur"></span>
        <span class="extra-blur-2"></span>
        <div className="login-container">
          <div className="login-form">
            <div className="logo">
              <h1>XclusiveGames</h1>
              <img src="../../assets/icon.png" alt="Logo" />
            </div>

            <h2>Iniciar Sesión</h2>

            <label>Email</label>
            <div className="input-group">
              <img src="../../assets/email.png" alt="Ícono Email" />
              <input type="email" placeholder="Correo Electrónico" />
            </div>

            <label>Contraseña</label>
            <div className="input-group">
              <img src="../../assets/lock.png" alt="Ícono Contraseña" />
              <input type="password" placeholder="Contraseña" />
            </div>

            <div className="form-options">
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Recordarme
              </label>

              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button className="login-btn">Iniciar sesión</button>

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
