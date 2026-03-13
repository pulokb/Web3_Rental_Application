export default function HomePage({ currentUser, setPage }) {
  const features = [
    { icon: "🏠", title: "Verified Listings",  desc: "Every property manually reviewed for accuracy and safety." },
    { icon: "🤝", title: "Trusted Landlords",  desc: "Connect with vetted landlords who passed our verification." },
    { icon: "⚡", title: "Fast Booking",        desc: "Secure your ideal room quickly with our streamlined system." },
    { icon: "🔒", title: "Web3 Secured",        desc: "Blockchain-powered contracts ensure transparent agreements." },
  ];
  return (
    <div style={{ flex: 1 }}>
      <div className="hero-wrap">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="hero-body">
          <h1 className="hero-title">Affordable Rooms in the<br />Right Location</h1>
          <p className="hero-sub">Browse verified rooms, connect with trusted landlords, and secure your ideal home — quickly and safely.</p>
          {currentUser ? (
            <div className="hero-btns">
              <button className="hero-btn"
                onClick={() => setPage(currentUser.role === "tenant" ? "tenant" : "landlord")}>
                Go to My Dashboard →
              </button>
            </div>
          ) : (
            <div className="hero-btns">
              <button className="hero-btn"         onClick={() => setPage("signup")}>Get Started</button>
              <button className="hero-btn-outline" onClick={() => setPage("login")}>Log In</button>
            </div>
          )}
        </div>
      </div>
      <div className="home-section">
        <h2 className="section-title">Why Choose Rentify?</h2>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
        {!currentUser && (
          <div className="cta-box">
            <div className="cta-title">Ready to find your perfect home?</div>
            <p className="cta-sub">Sign in as a <strong>Tenant</strong> to browse rentals, or as a <strong>Landlord</strong> to list properties.</p>
            <div className="cta-cards">
              <div className="cta-card" onClick={() => setPage("login")}><div className="cta-icon">🏠</div><div className="cta-label">Login as Tenant</div></div>
              <div className="cta-card" onClick={() => setPage("login")}><div className="cta-icon">🔑</div><div className="cta-label">Login as Landlord</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
