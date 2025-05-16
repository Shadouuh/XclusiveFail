import "./styles/Register.css";
import React, { useState } from "react";
import axios from "../api/axios";
import useNotification from "../hooks/useNotification";

export default function Register({ toggleForm, formData, handleChange }) {
  const { notify } = useNotification();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/user/register", formData);

      if (response.status === 201) {
        notify(response.data.message, "success");
        toggleForm();
      }
    } catch (err) {
      notify(err.response?.data?.message || "Error al iniciar sesión", 'error');
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="background-wrapper">
        <span className="extra-blur"></span>
        <span className="extra-blur-2"></span>
        <div className="register-container">
          <div className="register-form">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="logo">
                <h1>XclusiveGames</h1>
                <img src="../../assets/icon.png" alt="" />
              </div>

              <h2>Regístrate</h2>

              <div className="contents-input">
                <div className="input-block">
                  <label>Nick</label>
                  <div className="input-group">
                    <img src="../../assets/user.png" alt="" />
                    <input
                      type="text"
                      name="nick"
                      placeholder="Nick"
                      value={formData.nick}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <label>Email</label>
              <div className="input-group">
                <img src="../../assets/email.png" alt="" />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Contraseña</label>
              <div className="input-group">
                <img src="../../assets/lock.png" alt="" />
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Confirmar Contraseña</label>
              <div className="input-group">
                <img src="../../assets/lock.png" alt="" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-options">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Acepto los términos y condiciones
                </label>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Procesando..." : "Registrarse"}
              </button>
            </form>

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
              ¿Ya tienes una cuenta? 
              <button onClick={toggleForm} className="link-button">
                Inicia sesión
              </button>
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
