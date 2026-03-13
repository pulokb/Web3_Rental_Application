import { useState } from "react";
import { BigLogoIcon } from "../components/Icons";
import { USERS } from "../data/constants";

export default function LoginPage({ onLogin, setPage }) {
  const [email,  setEmail]  = useState("");
  const [pw,     setPw]     = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error,  setError]  = useState("");

  const handleLogin = () => {
    setError("");
    const u = USERS[email.trim().toLowerCase()];
    if (!u || u.password !== pw) {
      setError("Invalid email or password. Please use the demo credentials above.");
      return;
    }
    onLogin({ ...u, email: email.trim().toLowerCase() });
  };

  return (
    <div className="auth-page">
      {/* ── Left panel (decorative) ── */}
      <div className="auth-panel-left">
        <BigLogoIcon />
        <p className="auth-tagline">Your trusted Web3 rental platform</p>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="auth-panel-right">
        <div className="auth-card">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to your Rentify account</p>

          {/* <div className="demo-hint">
            <strong>Demo credentials:</strong><br />
            🏠 Tenant &nbsp;— <code>tenant@rentify.io</code> / <code>tenant123</code><br />
            🔑 Landlord — <code>landlord@rentify.io</code> / <code>landlord123</code>
          </div> */}

          {error && <div className="err-banner">{error}</div>}

          <div className="auth-fg">
            <label className="auth-fl">Email address</label>
            <input
              className="auth-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="auth-fg">
            <label className="auth-fl">Password</label>
            <div className="pw-wrap">
              <input
                className="auth-input"
                type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                value={pw}
                onChange={e => { setPw(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{ paddingRight: 56 }}
              />
              <button className="pw-toggle" onClick={() => setShowPw(p => !p)}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="btn-auth" onClick={handleLogin}>Log in</button>

          <div className="auth-footer">
            Don't have an account?{" "}
            <button className="link-btn" onClick={() => setPage("signup")}>Sign up</button>
          </div>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button className="link-btn" style={{ fontSize: 13 }} onClick={() => setPage("home")}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
