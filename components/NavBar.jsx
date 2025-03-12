import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [profilePic, setProfilePic] = useState("/images/default-profile.png");
  const [trigger, setTrigger] = useState(false); // **Boş state**
  const navigate = useNavigate();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const savedPic = localStorage.getItem(`profilePic_${userID}`);
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, [trigger]); // **Trigger değişirse useEffect tekrar çalışır**

  const handleProfileClick = () => {
    setTrigger(!trigger); // **Tetikleme yaparak useEffect'in tekrar çalışmasını sağlıyoruz**
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <span className="brand-name" onClick={() => navigate("/Dashboard")}>Mediterranean Pearl</span>
      </div>
      
      <div className="navbar-right">
        <Link to="/profile">
          <img src={profilePic} alt="Profile" className="profile-pic" onClick={handleProfileClick} />
        </Link>
      </div>
    </div>
  );
}
