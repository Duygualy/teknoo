import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const userID = localStorage.getItem("userID");
  const defaultPic = "/images/default-profile.png";
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(defaultPic);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedPic = localStorage.getItem(`profilePic_${userID}`);
    const savedUserInfo = JSON.parse(localStorage.getItem(`userInfo_${userID}`));
    const signUpUser = JSON.parse(localStorage.getItem(`user_${userID}`));

    if (savedPic) setProfilePic(savedPic);
    if (savedUserInfo) {
      setUserInfo({
        name: savedUserInfo.name || signUpUser?.name || "",
        email: savedUserInfo.email || signUpUser?.email || "",
        bio: savedUserInfo.bio || "",
      });
    } else if (signUpUser) {
      setUserInfo({
        name: signUpUser.name,
        email: signUpUser.email,
        bio: "",
      });
    }
  }, [userID]);

  const handleProfilePicChange = (event) => {
    if (!isEditing) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem(`profilePic_${userID}`, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      localStorage.setItem(`userInfo_${userID}`, JSON.stringify(userInfo));
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem(`profilePic_${userID}`);
    localStorage.removeItem(`userInfo_${userID}`);
    localStorage.removeItem(`user_${userID}`);
    localStorage.removeItem("userID");
    alert("Hesap silindi!");
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {/* Profil Resmi (Büyük) */}
      <label htmlFor="profilePicInput" className="profile-pic-wrapper">
        <img src={profilePic} alt="Profile" className="profile-pic-large" />
        {isEditing && <input type="file" id="profilePicInput" accept="image/*" onChange={handleProfilePicChange} />}
      </label>

      {/* Kullanıcı Bilgileri */}
      <div className="user-info">
        <input type="text" value={userInfo.name} disabled />
        <input type="email" value={userInfo.email} disabled />
        <textarea
          value={userInfo.bio}
          placeholder="Biyografi"
          onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
          disabled={!isEditing}
        />
      </div>

      {/* Butonlar */}
      <div className="button-group">
        <button className="edit-button" onClick={toggleEditMode}>{isEditing ? "Kaydet" : "Düzenle"}</button>
        <button className="logout-button" onClick={handleLogout}>Çıkış Yap</button>
        <button className="delete-account" onClick={handleDeleteAccount} disabled={isEditing}>Hesabı Sil</button>
      </div>
    </div>
  );
}
