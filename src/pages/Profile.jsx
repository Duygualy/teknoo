import { useState, useEffect } from "react";
import "../styles/Profile.css";

export default function Profile() {
  const userID = localStorage.getItem("userID");
  const defaultPic = "/images/default-profile.png"; // Varsayılan profil resmi

  const [profilePic, setProfilePic] = useState(defaultPic);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    const savedPic = localStorage.getItem(`profilePic_${userID}`);
    const savedUserInfo = JSON.parse(localStorage.getItem(`userInfo_${userID}`));

    if (savedPic) setProfilePic(savedPic);
    if (savedUserInfo) setUserInfo(savedUserInfo);
  }, []);

  // **Profil Resmini Güncelle**
  const handleProfilePicChange = (event) => {
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

  // **Kullanıcı Bilgilerini Güncelle**
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => {
      const updatedInfo = { ...prevInfo, [name]: value };
      localStorage.setItem(`userInfo_${userID}`, JSON.stringify(updatedInfo));
      return updatedInfo;
    });
  };

  // **Hesabı Sil**
  const handleDeleteAccount = () => {
    localStorage.removeItem(`profilePic_${userID}`);
    localStorage.removeItem(`userInfo_${userID}`);
    localStorage.removeItem("userID");
    alert("Hesap silindi!");
    window.location.href = "/login"; // Login sayfasına yönlendir
  };

  return (
    <div className="profile-container">
      {/* Profil Resmi */}
      <label htmlFor="profilePicInput" className="profile-pic-wrapper">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <input type="file" id="profilePicInput" accept="image/*" onChange={handleProfilePicChange} />
      </label>

      {/* Kullanıcı Bilgileri */}
      <div className="user-info">
        <input type="text" name="name" value={userInfo.name} placeholder="Adınızı girin" onChange={handleInputChange} />
        <input type="email" name="email" value={userInfo.email} placeholder="E-posta" disabled />
        <textarea name="bio" value={userInfo.bio} placeholder="Biyografi" onChange={handleInputChange} />
      </div>

      {/* Hesabı Sil Butonu */}
      <button className="delete-account" onClick={handleDeleteAccount}>Hesabı Sil</button>
    </div>
  );
}
