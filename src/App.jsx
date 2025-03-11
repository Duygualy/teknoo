import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setIsAuthenticated(!!userID); // Eğer userID varsa true yap
  }, []);

  return (
    <Router>
      <MainLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}

// **Ana Layout Componenti - Navbar sadece bazı sayfalarda görünür**
function MainLayout({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation(); // Bulunduğumuz sayfayı öğrenmek için

  // Navbar sadece Dashboard ve Profile sayfalarında görünecek
  const showNavbar = isAuthenticated && !["/login", "/signup"].includes(location.pathname);

  return (
    <div className="app">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
