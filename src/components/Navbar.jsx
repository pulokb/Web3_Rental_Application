import { useState } from "react";
import { LogoIcon, UserIcon, EditIcon, LockIcon } from "./Icons";

export default function Navbar({ currentUser, page, setPage, onLogout }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navItems = [
    { label: "Home", key: "home" },
    ...(currentUser?.role === "tenant"   ? [{ label: "Tenant",   key: "tenant"   }] : []),
    ...(currentUser?.role === "landlord" ? [{ label: "Landlord", key: "landlord" }] : []),
    { label: "Contact", key: "contact" },
  ];

  const go = (key) => { setPage(key); setDropOpen(false); };

  return (
    <>
      <nav className="app-navbar">
        <button className="nav-logo-btn" onClick={() => go("home")}>
          <LogoIcon />
          <span className="nav-logo-text">Rent<span className="nav-logo-accent">ify</span></span>
        </button>
        <div className="nav-links-row">
          {navItems.map(({ label, key }) => (
            <button key={key} className={`nav-link-btn${page === key ? " active" : ""}`} onClick={() => go(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="nav-right">
          {currentUser ? (
            <div className="nav-user-wrap">
              <button className="nav-user-btn" onClick={() => setDropOpen(p => !p)}>
                <span className="nav-avatar-sm">{currentUser.firstName[0]}{currentUser.lastName[0]}</span>
                <span className="nav-username">{currentUser.firstName} {currentUser.lastName}</span>
                <span className="nav-chevron">{dropOpen ? "▲" : "▼"}</span>
              </button>
              {dropOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-head">
                    <div className="nav-dropdown-avatar">{currentUser.firstName[0]}{currentUser.lastName[0]}</div>
                    <div>
                      <div className="nav-dd-name">{currentUser.firstName} {currentUser.lastName}</div>
                      <span className="nav-dd-role">{currentUser.role === "tenant" ? "🏠 Tenant" : "🔑 Landlord"}</span>
                    </div>
                  </div>
                  <div className="nav-dd-divider" />
                  <button className="nav-dd-item" onClick={() => { setDropOpen(false); setShowProfile(true); }}>
                    <UserIcon /> My Profile
                  </button>
                  {currentUser.role === "tenant" && (
                    <button className="nav-dd-item" onClick={() => go("tenant")}>🏠 Tenant Dashboard</button>
                  )}
                  {currentUser.role === "landlord" && (
                    <button className="nav-dd-item" onClick={() => go("landlord")}>🔑 Landlord Dashboard</button>
                  )}
                  <button className="nav-dd-item" onClick={() => go("contact")}>📬 Contact Us</button>
                  <div className="nav-dd-divider" />
                  <button className="nav-dd-item logout" onClick={() => { setDropOpen(false); onLogout(); }}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="nav-ghost-btn" onClick={() => go("login")}>Login</button>
              <button className="nav-solid-btn" onClick={() => go("signup")}>Sign Up</button>
            </>
          )}
        </div>
      </nav>
      {showProfile && currentUser && (
        <ProfileModal user={currentUser} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}

function ProfileModal({ user, onClose }) {
  const [tab, setTab]      = useState("info");
  const [data, setData]    = useState({ ...user });
  const [editing, setEdit] = useState(false);
  const [saved, setSaved]  = useState(false);
  const [pw, setPw]        = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg]  = useState("");

  const upd = (k, v) => setData(p => ({ ...p, [k]: v }));
  const handleSave = () => { setEdit(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handlePwChange = () => {
    if (!pw.current)            { setPwMsg("Enter your current password."); return; }
    if (pw.next.length < 8)     { setPwMsg("New password needs 8+ characters."); return; }
    if (pw.next !== pw.confirm)  { setPwMsg("Passwords do not match."); return; }
    setPwMsg("✓ Password updated successfully!");
    setPw({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwMsg(""), 3000);
  };
  const FIELDS = [
    ["First Name","firstName"],["Last Name","lastName"],
    ["Email","email"],["Phone","phone"],
    ["Occupation","occupation"],["Gender","gender"],
    ["Country","country"],["City","city"],["Postcode","postcode"],
  ];

  return (
    <div className="pm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pm-panel">
        <div className="pm-header">
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div className="pm-avatar">{data.firstName[0]}{data.lastName[0]}</div>
            <div>
              <div className="pm-name">{data.firstName} {data.lastName}</div>
              <span className="pm-role-badge">{user.role === "tenant" ? "🏠 Tenant" : "🔑 Landlord"}</span>
            </div>
          </div>
          <button className="pm-close" onClick={onClose}>✕</button>
        </div>
        <div className="pm-tabs">
          {[["info","Personal Info"],["security","Security"]].map(([k,l]) => (
            <button key={k} className={`pm-tab${tab===k?" active":""}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="pm-body">
          {tab === "info" && (
            <>
              <div className="pm-actions">
                {editing ? (
                  <>
                    <button className="pm-btn-outline" onClick={() => setEdit(false)}>Cancel</button>
                    <button className="pm-btn-green" onClick={handleSave}><EditIcon /> Save</button>
                  </>
                ) : (
                  <button className="pm-btn-outline" onClick={() => setEdit(true)}><EditIcon /> Edit Profile</button>
                )}
              </div>
              {saved && <div className="pm-saved-banner">✓ Profile saved successfully!</div>}
              <div className="pm-fields-grid">
                {FIELDS.map(([label, key]) => (
                  <div key={key}>
                    <label className="pm-label">{label}</label>
                    {editing ? <input className="pm-input" value={data[key]||""} onChange={e=>upd(key,e.target.value)}/>
                             : <div className="pm-value">{data[key]||"—"}</div>}
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1" }}>
                  <label className="pm-label">Address</label>
                  {editing ? <input className="pm-input" value={data.address||""} onChange={e=>upd("address",e.target.value)}/>
                           : <div className="pm-value">{data.address||"—"}</div>}
                </div>
              </div>
            </>
          )}
          {tab === "security" && (
            <div style={{ maxWidth:380 }}>
              <p style={{ fontSize:13, color:"#888", marginBottom:20, lineHeight:1.6 }}>Update your login password below.</p>
              {[["Current password","current"],["New password","next"],["Confirm new password","confirm"]].map(([label,k])=>(
                <div key={k} style={{ marginBottom:14 }}>
                  <label className="pm-label">{label}</label>
                  <input className="pm-input" type="password" value={pw[k]} onChange={e=>setPw(p=>({...p,[k]:e.target.value}))} />
                </div>
              ))}
              {pwMsg && <div className={`pm-pw-msg${pwMsg.startsWith("✓")?" success":" error"}`}>{pwMsg}</div>}
              <button className="pm-btn-full" onClick={handlePwChange}><LockIcon /> Change Password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
