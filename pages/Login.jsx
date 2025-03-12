import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // **CSS dosyasını import ettik**

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const storedUser = JSON.parse(localStorage.getItem(`user_${email}`));
    
    if (storedUser && storedUser.password === password) {
      localStorage.setItem("userID", storedUser.userID);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Geçersiz e-posta veya şifre!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title" style={{ color: "#007bff" }}>Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <input type="email" className="auth-input" placeholder="E-posta girin" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="auth-input" placeholder="Şifrenizi girin" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="auth-button login">Giriş Yap</button>
        </form>
        <p className="auth-footer" style={{ color: "#0D9276" }}>
          Henüz bir hesabın yok mu? <Link to="/signup" style={{ color: "#007bff" }}>Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
