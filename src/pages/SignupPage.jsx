import { useState } from "react";
import { BigLogoIcon } from "../components/Icons";
import { USERS } from "../data/constants";

export default function SignupPage({ onLogin, setPage }) {
  const [form, setForm] = useState({
    first: "", last: "", email: "", pw: "", pw2: "", role: "tenant", showPw: false,
  });
  const [error, setError] = useState("");
  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSignup = () => {
    setError("");
    if (!form.first.trim())   { setError("First name is required."); return; }
    if (!form.email.trim())   { setError("Email address is required."); return; }
    if (!form.pw)             { setError("Password is required."); return; }
    if (form.pw.length < 6)   { setError("Password must be at least 6 characters."); return; }
    if (form.pw !== form.pw2) { setError("Passwords do not match."); return; }

    // Demo: map to matching demo account but use entered name/email
    const demoKey = form.role === "tenant" ? "tenant@rentify.io" : "landlord@rentify.io";
    onLogin({
      ...USERS[demoKey],
      firstName: form.first.trim(),
      lastName:  form.last.trim() || "User",
      email:     form.email.trim().toLowerCase(),
    });
  };

  return (
    /* flip order: form left, green panel right */
    <div className="auth-page">
      {/* ── Left (form) ── */}
      <div className="auth-panel-right" style={{ flex: 1 }}>
        <div className="auth-card" style={{ maxWidth: 500 }}>
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-sub">
            Already have one?{" "}
            <button className="link-btn" onClick={() => setPage("login")}>Log in</button>
          </p>

          {error && <div className="err-banner">{error}</div>}

          <div className="auth-row-2">
            <div className="auth-fg">
              <label className="auth-fl">First name *</label>
              <input className="auth-input" placeholder="First" value={form.first}
                onChange={e => upd("first", e.target.value)} />
            </div>
            <div className="auth-fg">
              <label className="auth-fl">Last name</label>
              <input className="auth-input" placeholder="Last" value={form.last}
                onChange={e => upd("last", e.target.value)} />
            </div>
          </div>

          <div className="auth-fg">
            <label className="auth-fl">Email address *</label>
            <input className="auth-input" type="email" placeholder="your@email.com" value={form.email}
              onChange={e => upd("email", e.target.value)} />
          </div>

          <div className="auth-fg">
            <label className="auth-fl">I am a *</label>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["tenant", "landlord"].map(r => (
                <label key={r} className={`role-opt${form.role === r ? " selected" : ""}`}>
                  <input type="radio" name="su-role" value={r}
                    checked={form.role === r} onChange={() => upd("role", r)}
                    style={{ display: "none" }} />
                  {r === "tenant" ? "🏠 Tenant" : "🔑 Landlord"}
                </label>
              ))}
            </div>
          </div>

          <div className="auth-row-2">
            <div className="auth-fg">
              <label className="auth-fl">Password *</label>
              <input className="auth-input"
                type={form.showPw ? "text" : "password"}
                placeholder="Min. 6 characters" value={form.pw}
                onChange={e => upd("pw", e.target.value)} />
            </div>
            <div className="auth-fg">
              <label className="auth-fl">Confirm password</label>
              <input className="auth-input"
                type={form.showPw ? "text" : "password"}
                placeholder="Confirm" value={form.pw2}
                onChange={e => upd("pw2", e.target.value)} />
            </div>
          </div>

          <label className="check-row">
            <input type="checkbox" checked={form.showPw}
              onChange={e => upd("showPw", e.target.checked)}
              style={{ accentColor: "#2d7a3a" }} />
            Show password
          </label>

          <button className="btn-auth" onClick={handleSignup}>Create account</button>

          <div style={{ textAlign: "center", marginTop: 10 }}>
            <button className="link-btn" style={{ fontSize: 13 }} onClick={() => setPage("home")}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* ── Right (decorative) ── */}
      <div className="auth-panel-left">
        <BigLogoIcon />
        <p className="auth-tagline">Join thousands of happy tenants and landlords</p>
      </div>
    </div>
  );
}
