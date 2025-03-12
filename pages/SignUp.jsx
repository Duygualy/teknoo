import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Pop-up kontrolü

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    const userID = `user_${Date.now()}`;
    
    const userData = { userID, name, email, password };
    
    // Kullanıcı bilgilerini kaydet
    localStorage.setItem("userID", userID);
    localStorage.setItem(`user_${userID}`, JSON.stringify(userData));

    setShowSuccess(true); // ✅ Başarı pop-up'ını göster

    setTimeout(() => {
      setShowSuccess(false); // ✅ 3 saniye sonra pop-up kaybolsun
    navigate("/login");
    }, 5000);
    
    navigate("/dashboard");
    
     // SignUp sonrası Dashboard’a yönlendirme

    
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title" style={{ color: "#007bff" }}>Kayıt Ol</h2>

        {showSuccess && ( // ✅ Pop-up mesajı
          <div className="success-popup">
            <span className="checkmark">✔</span> Kayıt başarılı!
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <input type="text" className="auth-input" placeholder="Adınızı girin" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" className="auth-input" placeholder="E-posta girin" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="auth-input" placeholder="Şifrenizi girin" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" className="auth-input" placeholder="Şifrenizi tekrar girin" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit" className="auth-button signup" >Kayıt Ol </button>
        </form>
        <p className="auth-footer" style= {{color:"#0D9276"}}>
          Zaten bir hesabın var mı? <Link to="/login" style={{ color: "#007bff" }}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
