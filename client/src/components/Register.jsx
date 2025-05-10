import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Register.css";

export default function Register() {
  return (
    <div className="register-page">
      <div className="background-wrapper">
        <span class="extra-blur"></span>
        <span class="extra-blur-2"></span>
        <div className="register-container">
          <div className="register-form">
            <div className="logo">
              <h1>XclusiveGames</h1>
              <img src="../../assets/icon.png" alt="" />
            </div>

            <h2>Regístrate</h2>

            <div className="contents-input">
              <div className="input-block">
                <label>Nombre</label>
                <div className="input-group">
                  <img src="../../assets/user.png" alt="" />
                  <input type="text" placeholder="Nombre" />
                </div>
              </div>

              <div className="input-block">
                <label>Apellido</label>
                <div className="input-group">
                  <img src="../../assets/user.png" alt="" />
                  <input type="text" placeholder="Apellido" />
                </div>
              </div>
            </div>

            <label>Email</label>
            <div className="input-group">
              <img src="../../assets/email.png" alt="" />
              <input type="email" placeholder="Correo Electrónico" />
            </div>

            <label>Contraseña</label>
            <div className="input-group">
              <img src="../../assets/lock.png" alt="" />
              <input type="password" placeholder="Contraseña" />
            </div>

            <label>Confirmar Contraseña</label>
            <div className="input-group">
              <img src="../../assets/lock.png" alt="" />
              <input type="password" placeholder="Confirmar Contraseña" />
            </div>

            <div className="form-options">
              <label className="custom-checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Acepto los términos y condiciones
              </label>
            </div>

            <button className="register-btn">Registrarse</button>

            <div className="divider">
              <div className="divider-title">
                <h5>Regístrate con</h5>
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

            <p className="login-link">
              ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
            </p>
          </div>

          <div className="register-image">
            <img src="../../assets/Rectangle 1.png" alt="Register Visual" />
          </div>
        </div>
      </div>
    </div>
  );
}
