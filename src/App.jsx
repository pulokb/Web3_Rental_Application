import { useState } from "react";
import "./styles/global.css";
import Navbar       from "./components/Navbar";
import HomePage     from "./pages/HomePage";
import LoginPage    from "./pages/LoginPage";
import SignupPage   from "./pages/SignupPage";
import TenantPage   from "./pages/TenantPage";
import LandlordPage from "./pages/LandlordPage";
import ContactPage  from "./pages/ContactPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("home");

  const handleLogin = (user) => {
    setCurrentUser(user);
    setPage(user.role === "tenant" ? "tenant" : "landlord");
  };
  const handleLogout = () => { setCurrentUser(null); setPage("home"); };

  const goPage = (key) => {
    if ((key === "tenant" || key === "landlord") && !currentUser) { setPage("login"); return; }
    setPage(key);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar currentUser={currentUser} page={page} setPage={goPage} onLogout={handleLogout} />
      {page === "home"     && <HomePage currentUser={currentUser} setPage={goPage} />}
      {page === "login"    && <LoginPage  onLogin={handleLogin} setPage={setPage} />}
      {page === "signup"   && <SignupPage onLogin={handleLogin} setPage={setPage} />}
      {page === "tenant"   && currentUser?.role === "tenant"   && <TenantPage   currentUser={currentUser} />}
      {page === "landlord" && currentUser?.role === "landlord" && <LandlordPage currentUser={currentUser} />}
      {page === "contact"  && <ContactPage />}
    </div>
  );
}
