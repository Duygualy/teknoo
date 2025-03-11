import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [profilePic, setProfilePic] = useState("/images/default-profile.png");
  const [trigger, setTrigger] = useState(false); // **Boş state**

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
        <h1 className="brand-name">Mediterranean Pearl</h1>
      </div>

      <div className="navbar-center">
        <h2 className="welcome-text">Hello, welcome to Akdeniz’in İncisi!</h2>
      </div>

      <div className="navbar-right">
        <Link to="/profile">
          <img src={profilePic} alt="Profile" className="profile-pic" onClick={handleProfileClick} />
        </Link>
      </div>
    </div>
  );
}
