import { useState } from "react";
import axios from "../../api/axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

export default function Login({ toggleForm, formData, handleChange }) {
  const { notify } = useNotification();


  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await axios.post("/user/login", formData);

      if (response.status === 200) {
        const user = response.data.resultLogin;
        window.localStorage.setItem("user", JSON.stringify(user));
        //faltaria guardar el token

        
        notify(response.data.message, "success");
        navigate("/dashboard");
      } 
    } catch (err) {
      notify(err.response?.data?.message || "Error al iniciar sesión", 'error');
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
            <div className="logo">
              <h1>XclusiveGames</h1>
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad-icon lucide-gamepad"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
            </div>
            <form  onSubmit={handleSubmit}>
              <h2>Iniciar Sesión</h2>
              <div className="form-group">
                <label>Email o Usuario</label>
                <div className="input-group">
                  <img src="../../assets/email.png" alt="Ícono Email" />
                  <input 
                    type="text" 
                    name="nickOrEmail"
                    placeholder="Correo Electrónico o Usuario" 
                    value={formData.nickOrEmail} 
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <div className="input-group">
                  <img src="../../assets/lock.png" alt="Ícono Contraseña" />
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
              ¿No tienes una cuenta? 
              <button onClick={toggleForm} className="link-button">
                Regístrate
              </button>
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
