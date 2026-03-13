import { useState } from "react";
import { EditIcon } from "../components/Icons";
import { SC, TENANT_RENTAL, TENANT_PAYMENTS } from "../data/constants";

export default function TenantPage({ currentUser }) {
  const [tab, setTab]         = useState("profile");
  const [editing, setEdit]    = useState(false);
  const [profile, setProfile] = useState({
    firstName: currentUser.firstName, lastName: currentUser.lastName,
    phone: currentUser.phone, occupation: currentUser.occupation || "Student",
    gender: currentUser.gender || "Female", country: currentUser.country || "UK",
    email: currentUser.email,
  });
  const [rental, setRental]   = useState(TENANT_RENTAL);
  const [moveOut, setMoveOut] = useState("");
  const [notified, setNot]    = useState(false);
  const [card, setCard]       = useState({ number:"", expiry:"", cvc:"" });
  const [paid, setPaid]       = useState(false);
  const [hFilter, setHF]      = useState("All payments");
  // FIX: selectAll checkbox state
  const [selectAll, setSelectAll] = useState(false);
  const [selRows, setSel]     = useState([]);

  const deposit = 350; const rent = 350;

  const filteredPay = TENANT_PAYMENTS.filter(p => hFilter === "All payments" || p.status === hFilter);

  // FIX: select-all handler
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSel(checked ? filteredPay.map((_, i) => i) : []);
  };
  const handleRowSel = (i) => {
    const next = selRows.includes(i) ? selRows.filter(x => x !== i) : [...selRows, i];
    setSel(next);
    setSelectAll(next.length === filteredPay.length);
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="dash-wrap">
        <aside className="dash-sidebar">
          {[["profile","My Profile"],["history","History"],["payment","Payment"]].map(([k,l]) => (
            <button key={k} className={`dash-sb-btn${tab===k?" active":""}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </aside>

        <main className="dash-main">
          {/* ── MY PROFILE ── */}
          {tab === "profile" && (
            <div className="fade">
              <div className="stat-row">
                <div className="stat teal"><div className="stat-lbl">DEPOSIT</div><div className="stat-val">£{deposit}</div></div>
                <div className="stat purple"><div className="stat-lbl">RENT</div><div className="stat-val">£{rent}</div></div>
                <div className="stat dg"><div className="stat-lbl">STATUS</div><div className="stat-val">PAID</div></div>
                <div className="badge olive"><div className="badge-lbl">STATUS</div><div className="badge-val">PENDING</div></div>
                <div className="badge red-b"><div className="badge-lbl">STATUS</div><div className="badge-val">DUE</div></div>
              </div>
              <div className="next-bar">📅 Your Next Payment will be on DD-MM-YYYY</div>

              <div className="card">
                <div className="card-hdr">
                  <span className="sec-lbl">PROFILE</span>
                  <button className="btn-edit" onClick={() => setEdit(e => !e)}>
                    <EditIcon /> {editing ? "Save" : "Edit"}
                  </button>
                </div>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div className="avatar-lg">{profile.firstName[0]}</div>
                  <div className="field-grid">
                    {[["First Name","firstName"],["Last Name","lastName"],["Phone Number","phone"],
                      ["Occupation","occupation"],["Gender","gender"],["Country","country"]].map(([label,key]) => (
                      <div key={key}>
                        <div className="field-lbl">{label}</div>
                        {editing
                          ? <input className="field-input" value={profile[key]} onChange={e=>setProfile(p=>({...p,[key]:e.target.value}))}/>
                          : <div className="field-val">{profile[key]}</div>}
                      </div>
                    ))}
                    <div style={{ gridColumn:"1/-1" }}>
                      <div className="field-lbl">Email</div>
                      {editing
                        ? <input className="field-input" value={profile.email} onChange={e=>setProfile(p=>({...p,email:e.target.value}))}/>
                        : <div className="field-val">{profile.email}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-hdr"><span className="sec-lbl">RENTAL DETAILS</span></div>
                <div className="field-grid">
                  {[["City","city"],["Postal Code","postalCode"],["Address 1","address1"],["Address 2","address2"],
                    ["Passport Number","passportNumber"],["Expiry Date","expiryDate"],["Move-In Date","moveInDate"],["Room Type","roomType"]].map(([label,key]) => (
                    <div key={key}>
                      <div className="field-lbl">{label}</div>
                      {editing
                        ? <input className="field-input" value={rental[key]} onChange={e=>setRental(p=>({...p,[key]:e.target.value}))}/>
                        : <div className="field-val">{rental[key]}</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-hdr"><span className="sec-lbl">MOVE-OUT DATE</span></div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:10, flexWrap:"wrap" }}>
                  <span className="field-lbl" style={{ minWidth:100, marginBottom:0 }}>Move-Out Date</span>
                  <input className="field-input" style={{ maxWidth:160 }} placeholder="DD-MM-YYYY"
                    value={moveOut} onChange={e=>setMoveOut(e.target.value)}/>
                  <button onClick={() => setNot(true)}
                    style={{ background: notified ? "#2d7a3a" : "#b8a000", color:"white", border:"none",
                      borderRadius:7, padding:"8px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                    {notified ? "✓ Notified" : "Notify"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── HISTORY ── */}
          {tab === "history" && (
            <div className="fade">
              <div className="card">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:10 }}>
                  <div>
                    <h2 className="page-title">Payments overview</h2>
                    <div style={{ display:"flex", gap:16, marginTop:8 }}>
                      {["All payments","Succeeded","Refunded"].map(f => (
                        <button key={f} className={`filter-tab${hFilter===f?" active":""}`}
                          onClick={() => { setHF(f); setSelectAll(false); setSel([]); }}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <button className="btn-outline">⬇ Export</button>
                </div>
                <div className="filter-row">
                  {["Date range ▾","Status ▾","Marker ▾"].map(f=><button key={f} className="filter-chip">{f}</button>)}
                  <input className="search-box" placeholder="🔍 Search by amount, payment method..."/>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        {/* FIX: select-all checkbox */}
                        <input type="checkbox" checked={selectAll}
                          onChange={e => handleSelectAll(e.target.checked)}
                          style={{ accentColor:"#2d7a3a", cursor:"pointer", width:15, height:15 }}/>
                      </th>
                      <th>PAYMENT ID</th><th>STATUS</th><th>AMOUNT</th><th>CREATION DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPay.map((p,i) => {
                      const sc = SC[p.status] || SC.Create;
                      return (
                        <tr key={i} className={selRows.includes(i) ? "row-selected" : ""}>
                          <td>
                            <input type="checkbox" checked={selRows.includes(i)}
                              onChange={() => handleRowSel(i)}
                              style={{ accentColor:"#2d7a3a", cursor:"pointer", width:15, height:15 }}/>
                          </td>
                          <td><span className="pay-id">{p.id}</span></td>
                          <td>
                            <span className="status-pill" style={{ background:sc.bg, color:sc.text }}>
                              <span style={{ width:7, height:7, borderRadius:"50%", background:sc.dot, display:"inline-block", marginRight:6 }}/>
                              {p.status}
                            </span>
                          </td>
                          <td><b>{p.amount}</b></td>
                          <td style={{ color:"#999", fontSize:12 }}>{p.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="pagination">
                  <span style={{ fontSize:13, color:"#888" }}>{filteredPay.length} records</span>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="pg-btn">Prev</button>
                    <button className="pg-btn active">1</button>
                    <button className="pg-btn">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PAYMENT ── */}
          {tab === "payment" && (
            <div className="fade">
              <div className="card" style={{ maxWidth:500 }}>
                <h2 className="page-title" style={{ marginBottom:18 }}>Payment Method</h2>
                <div className="bank-box">
                  <div style={{ fontSize:13, fontWeight:600, textAlign:"center", marginBottom:12 }}>Bank Details of Landlord</div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, opacity:0.9, marginBottom:5 }}>
                    <span>Account Holder Name</span><span>Pulok Biswas</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, opacity:0.9 }}>
                    <span>Sort Code: 00-00-01</span><span>Account: XXXXXXX</span>
                  </div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label className="field-lbl">Card type</label>
                  <div className="card-radio">💳 Card</div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label className="field-lbl">Card number</label>
                  <input className="field-input" placeholder="1234 1234 1234 1234"
                    value={card.number} onChange={e=>setCard(p=>({...p,number:e.target.value}))}/>
                </div>
                <div style={{ display:"flex", gap:14 }}>
                  <div style={{ flex:1 }}>
                    <label className="field-lbl">Expiry</label>
                    <input className="field-input" placeholder="MM / YY"
                      value={card.expiry} onChange={e=>setCard(p=>({...p,expiry:e.target.value}))}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <label className="field-lbl">CVC</label>
                    <input className="field-input" placeholder="CVC"
                      value={card.cvc} onChange={e=>setCard(p=>({...p,cvc:e.target.value}))}/>
                  </div>
                </div>
                <button style={{ width:"100%", background: paid ? "#235f2c" : "#2d7a3a", color:"white", border:"none",
                    borderRadius:9, padding:13, fontSize:15, fontWeight:600, cursor:"pointer", marginTop:18 }}
                  onClick={() => setPaid(true)}>
                  {paid ? "✓ Payment Sent" : "Pay £350"}
                </button>
                {paid && <p style={{ color:"#2d7a3a", textAlign:"center", fontSize:13, marginTop:10 }}>Payment processed successfully!</p>}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
