import "./styles.css";
import { useState } from "react";
import axios from "../../api/axios";
import useNotification from "../../hooks/useNotification";
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
      notify(err.response?.data?.message || "Error al iniciar sesión", "error");
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
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad-icon lucide-gamepad"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
              </div>

              <h2>Regístrate</h2>

              <div className="form-group">
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

              <div className="form-group">
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
              </div>

              <div className="form-group">
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
              </div>

              <div className="form-group">
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
