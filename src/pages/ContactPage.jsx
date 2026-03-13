import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const upd = (k,v) => setForm(p => ({ ...p, [k]: v }));

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="ct-wrap">
        <div className="ct-header">
          <h1 className="ct-title">Get in Touch</h1>
          <p className="ct-sub">We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.</p>
        </div>

        <div className="ct-grid">
          <div className="ct-card">
            {sent ? (
              <div className="ct-sent">
                <div className="ct-sent-icon">✓</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#1a2e1c", marginBottom:8 }}>Message Sent!</h3>
                <p style={{ fontSize:14, color:"#777", marginBottom:20, lineHeight:1.6 }}>Thanks for reaching out. We'll respond within 24 hours.</p>
                <button className="ct-btn" onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}>Send another</button>
              </div>
            ) : (
              <>
                <h2 className="ct-form-title">Send a Message</h2>
                <div className="ct-form-row">
                  <div className="ct-fg">
                    <label className="ct-fl">Full name *</label>
                    <input className="ct-fi" placeholder="Your name" value={form.name} onChange={e=>upd("name",e.target.value)}/>
                  </div>
                  <div className="ct-fg">
                    <label className="ct-fl">Email address *</label>
                    <input className="ct-fi" type="email" placeholder="your@email.com" value={form.email} onChange={e=>upd("email",e.target.value)}/>
                  </div>
                </div>
                <div className="ct-fg">
                  <label className="ct-fl">Subject</label>
                  <input className="ct-fi" placeholder="What's this about?" value={form.subject} onChange={e=>upd("subject",e.target.value)}/>
                </div>
                <div className="ct-fg">
                  <label className="ct-fl">Message *</label>
                  <textarea className="ct-fi ct-ta" rows={6} placeholder="Write your message here..." value={form.message} onChange={e=>upd("message",e.target.value)}/>
                </div>
                <button className="ct-btn" onClick={handleSend}>Send Message →</button>
              </>
            )}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { icon:"🏢", title:"Our Office",  lines:["6 Moore Walk, Forest Gate","London, E7 0HY, UK"] },
              { icon:"📞", title:"Phone",        lines:["07951414492","Mon–Fri, 9am–6pm"] },
              { icon:"✉️", title:"Email",        lines:["landlord@rentify.io","We reply within 24 hours"] },
              { icon:"💬", title:"Live Chat",    lines:["Available in the app","Instant support for tenants"] },
            ].map(item => (
              <div key={item.title} className="ct-card ct-info-card">
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div className="ct-info-icon">{item.icon}</div>
                  <div>
                    <div className="ct-info-title">{item.title}</div>
                    {item.lines.map((l,i) => <div key={i} className="ct-info-line">{l}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
