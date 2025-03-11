import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // **CSS dosyasını import ettik**

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    const userID = `user_${Date.now()}`;
    
    const userData = { userID, name, email, password };
    localStorage.setItem(`user_${email}`, JSON.stringify(userData));
    localStorage.setItem("userID", userID);

    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title" style={{ color: "#28a745" }}>Kayıt Ol</h2>
        <form onSubmit={handleSignUp}>
          <input type="text" className="auth-input" placeholder="Adınızı girin" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" className="auth-input" placeholder="E-posta girin" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="auth-input" placeholder="Şifrenizi girin" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" className="auth-input" placeholder="Şifrenizi tekrar girin" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit" className="auth-button signup">Kayıt Ol</button>
        </form>
        <p className="auth-footer">
          Zaten bir hesabın var mı? <Link to="/login" style={{ color: "#007bff" }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;