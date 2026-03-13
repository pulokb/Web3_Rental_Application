import { useState } from "react";
import { EditIcon, PlusIcon, BackIcon, EyeIcon, HomeIcon, PhoneIcon, MailIcon } from "../components/Icons";
import { SC, INITIAL_PROPERTIES, LL_TENANTS, PAYMENT_RECORDS } from "../data/constants";

export default function LandlordPage({ currentUser }) {
  const [tab, setTab] = useState("property");
  return (
    <div style={{ flex: 1 }}>
      <div className="dash-wrap">
        <aside className="dash-sidebar">
          {[["property","Property"],["tenant","Tenant"],["payment","Payment"]].map(([k,l]) => (
            <button key={k} className={`dash-sb-btn${tab===k?" active":""}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </aside>
        <main className="dash-main">
          {tab === "property" && <PropertyTab />}
          {tab === "tenant"   && <TenantTab />}
          {tab === "payment"  && <PaymentTab />}
        </main>
      </div>
    </div>
  );
}

/* ── Property Tab ── */
function PropertyTab() {
  const [props, setProps] = useState(INITIAL_PROPERTIES);
  const [showForm, setShow] = useState(false);
  const [form, setForm] = useState({ title:"",address:"",city:"",postcode:"",beds:"",kitchen:"",bath:"",type:"Sharing",rent:"",description:"" });
  const [errs, setErrs] = useState({});
  // FIX: property detail modal
  const [detailProp, setDetail] = useState(null);
  const upd = (k,v) => setForm(p => ({ ...p, [k]: v }));

  const handleAdd = () => {
    const e = {};
    if (!form.title)   e.title   = "Required";
    if (!form.address) e.address = "Required";
    if (!form.beds)    e.beds    = "Required";
    if (!form.rent)    e.rent    = "Required";
    setErrs(e); if (Object.keys(e).length) return;
    setProps(p => [...p, { id: Date.now(), ...form, beds:+form.beds, kitchen:+form.kitchen||1, bath:+form.bath||1, rent:+form.rent }]);
    setForm({ title:"",address:"",city:"",postcode:"",beds:"",kitchen:"",bath:"",type:"Sharing",rent:"",description:"" });
    setErrs({}); setShow(false);
  };

  return (
    <div className="fade">
      <div className="stat-row">
        <div className="stat purple"><div className="stat-lbl">TENANTS</div><div className="stat-val">{LL_TENANTS.length}</div></div>
        <div className="stat dg"><div className="stat-lbl">PROPERTIES</div><div className="stat-val">{props.length}</div></div>
        <div className="stat teal"><div className="stat-lbl">TOTAL RENT</div><div className="stat-val">£{props.reduce((s,p)=>s+p.rent,0).toLocaleString()}</div></div>
      </div>

      {showForm && (
        <div className="card card-dashed" style={{ marginBottom:16 }}>
          <div className="card-hdr">
            <span className="sec-lbl">ADD NEW PROPERTY</span>
            <button className="btn-cancel" onClick={() => { setShow(false); setErrs({}); }}>✕ Cancel</button>
          </div>
          <div className="form-grid-2">
            {[["Property Title *","title","text"],["Room Type","type","select"],["Bedrooms *","beds","number"],
              ["Kitchens","kitchen","number"],["Bathrooms","bath","number"],["Monthly Rent (£) *","rent","number"]].map(([label,key,type]) => (
              <div key={key}>
                <label className="form-lbl">{label}</label>
                {type === "select"
                  ? <select className={`form-input${errs[key]?" err":""}`} value={form[key]} onChange={e=>upd(key,e.target.value)}>
                      {["Sharing","Entire","Studio","En-suite"].map(t=><option key={t}>{t}</option>)}
                    </select>
                  : <input className={`form-input${errs[key]?" err":""}`} type={type} placeholder={label.replace(" *","")} value={form[key]} onChange={e=>upd(key,e.target.value)}/>}
                {errs[key] && <span className="form-err-msg">{errs[key]}</span>}
              </div>
            ))}
            <div style={{ gridColumn:"1/-1" }}>
              <label className="form-lbl">Full Address *</label>
              <input className={`form-input${errs.address?" err":""}`} placeholder="Street address, city, postcode" value={form.address} onChange={e=>upd("address",e.target.value)}/>
              {errs.address && <span className="form-err-msg">{errs.address}</span>}
            </div>
            <div><label className="form-lbl">City</label><input className="form-input" placeholder="City" value={form.city} onChange={e=>upd("city",e.target.value)}/></div>
            <div><label className="form-lbl">Postcode</label><input className="form-input" placeholder="e.g. IG11 8SF" value={form.postcode} onChange={e=>upd("postcode",e.target.value)}/></div>
            <div style={{ gridColumn:"1/-1" }}>
              <label className="form-lbl">Description (optional)</label>
              <textarea className="form-input" rows={3} placeholder="Brief description..." value={form.description} onChange={e=>upd("description",e.target.value)} style={{ resize:"vertical" }}/>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:16 }}>
            <button className="btn-outline" onClick={() => { setShow(false); setErrs({}); }}>Cancel</button>
            <button className="btn-green" onClick={handleAdd}><PlusIcon/> Add Property</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-hdr">
          <span className="sec-lbl">PROPERTIES ({props.length})</span>
          {!showForm && <button className="btn-green" onClick={() => setShow(true)}><PlusIcon/> ADD PROPERTY</button>}
        </div>
        <div className="prop-grid">
          {props.map(p => (
            /* FIX: clicking card opens property detail modal */
            <div key={p.id} className="prop-card" onClick={() => setDetail(p)}>
              <div className="prop-img">🏠</div>
              <div style={{ padding:"10px 14px" }}>
                <span className="type-badge">{p.type}</span>
                <div className="prop-ttl">{p.title}</div>
                <div className="prop-addr">{p.address}</div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", margin:"6px 0" }}>
                  {[`🛏 ${p.beds}`,`🍳 ${p.kitchen}`,`🚿 ${p.bath}`].map(m => <span key={m} className="meta-chip">{m}</span>)}
                </div>
                <div className="prop-rent">£{p.rent}<span style={{ fontSize:11, fontWeight:400, color:"#888" }}>/mo</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FIX: Property detail modal */}
      {detailProp && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDetail(null)}>
          <div className="modal-panel">
            <div className="modal-header">
              <button className="modal-close" onClick={() => setDetail(null)}>✕</button>
              <div className="modal-prop-icon">🏠</div>
              <div className="modal-prop-title">{detailProp.title}</div>
              <span className="type-badge" style={{ fontSize:12, padding:"4px 10px" }}>{detailProp.type}</span>
            </div>
            <div className="modal-body">
              <div className="modal-details-grid">
                {[
                  ["Address",         detailProp.address],
                  ["Monthly Rent",    `£${detailProp.rent}/mo`],
                  ["Bedrooms",        `🛏 ${detailProp.beds}`],
                  ["Kitchens",        `🍳 ${detailProp.kitchen}`],
                  ["Bathrooms",       `🚿 ${detailProp.bath}`],
                  ["Room Type",       detailProp.type],
                  ["City",            detailProp.city   || "—"],
                  ["Postcode",        detailProp.postcode|| "—"],
                ].map(([label, val]) => (
                  <div key={label} className="modal-det-row">
                    <div className="modal-det-lbl">{label.toUpperCase()}</div>
                    <div className="modal-det-val">{val}</div>
                  </div>
                ))}
                {detailProp.description && (
                  <div style={{ gridColumn:"1/-1" }}>
                    <div className="modal-det-lbl">DESCRIPTION</div>
                    <div className="modal-det-val" style={{ lineHeight:1.6 }}>{detailProp.description}</div>
                  </div>
                )}
              </div>
              <div style={{ display:"flex", gap:10, marginTop:22, justifyContent:"flex-end" }}>
                <button className="btn-outline" onClick={() => setDetail(null)}>Close</button>
                <button className="btn-green">Edit Property</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Tenant Tab ── */
function TenantTab() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState("");
  const [editing, setEdit]      = useState(false);
  const [data, setData]         = useState(null);
  const upd = (k,v) => setData(p => ({ ...p, [k]: v }));

  const filtered = LL_TENANTS.filter(t =>
    `${t.firstName} ${t.lastName} ${t.property} ${t.occupation}`.toLowerCase().includes(search.toLowerCase())
  );

  const openProfile = (t) => { setData({ ...t }); setSelected(t); setEdit(false); };

  if (selected && data) {
    const sc = SC[data.status] || SC.Paid;
    return (
      <div className="fade">
        <button className="btn-back" onClick={() => setSelected(null)}><BackIcon/> Back to Tenants</button>
        <div className="tp-header">
          <div className="av-lg">{data.firstName[0]}{data.lastName[0]}</div>
          <div style={{ flex:1 }}>
            <div className="tp-name">{data.firstName} {data.lastName}</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:7 }}>
              <span className="info-chip"><PhoneIcon/> {data.phone}</span>
              <span className="info-chip"><MailIcon/>  {data.email}</span>
              <span className="info-chip"><HomeIcon/> {data.property}</span>
            </div>
          </div>
          <span className="status-pill" style={{ background:sc.bg, color:sc.text }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:sc.dot, display:"inline-block", marginRight:7 }}/>{data.status}
          </span>
        </div>

        {[
          { title:"PERSONAL INFORMATION", fields:[["First Name","firstName"],["Last Name","lastName"],["Phone","phone"],["Email","email"],["Occupation","occupation"],["Country","country"],["Gender","gender"]] },
          { title:"PASSPORT DETAILS",     fields:[["Passport Number","passportNo"],["Expiry Date","expiry"]] },
          { title:"RENTAL DETAILS",       fields:[["City","city"],["Postcode","postcode"],["Address 1","address1"],["Address 2","address2"],["Rent","rent"],["Deposit","deposit"],["Room Type","roomType"],["Move-In","moveIn"],["Property","property"]] },
        ].map(section => (
          <div key={section.title} className="card" style={{ marginBottom:12 }}>
            <div className="card-hdr">
              <span className="sec-lbl">{section.title}</span>
              <button className="btn-edit" onClick={() => setEdit(e => !e)}><EditIcon/> {editing?"Save":"Edit"}</button>
            </div>
            <div className="detail-grid">
              {section.fields.map(([label,key]) => (
                <div key={key} className="detail-row">
                  <span className="field-lbl" style={{ minWidth:130, flexShrink:0 }}>{label}</span>
                  {editing
                    ? <input className="field-input" value={data[key]||""} onChange={e=>upd(key,e.target.value)}/>
                    : <span className="field-val">{data[key]}</span>}
                </div>
              ))}
              {section.title==="RENTAL DETAILS" && (
                <div className="detail-row">
                  <span className="field-lbl" style={{ minWidth:130 }}>Status</span>
                  <span className="status-pill" style={{ background:sc.bg, color:sc.text }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:sc.dot, display:"inline-block", marginRight:6 }}/>{data.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="ll-next-bar">📅 Next Payment Date is DD-MM-YYYY</div>
        <div style={{ display:"flex", gap:12, marginTop:12, flexWrap:"wrap" }}>
          <div className="ll-badge olive" style={{ flex:1, minWidth:160 }}><span className="ll-bl">STATUS</span><span className="ll-bv">Pending</span></div>
          <div className="ll-badge red"   style={{ flex:1, minWidth:160 }}><span className="ll-bl">STATUS</span><span className="ll-bv">Over Due</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade">
      <div className="stat-row">
        <div className="stat purple"><div className="stat-lbl">TOTAL</div><div className="stat-val">{LL_TENANTS.length}</div></div>
        <div className="stat dg"><div className="stat-lbl">ACTIVE</div><div className="stat-val">3</div></div>
        <div className="stat red"><div className="stat-lbl">OVERDUE</div><div className="stat-val">1</div></div>
        <div className="stat teal"><div className="stat-lbl">PENDING</div><div className="stat-val">1</div></div>
      </div>
      <div className="card">
        <div className="card-hdr" style={{ flexWrap:"wrap", gap:10 }}>
          <span className="sec-lbl">TENANT LIST ({filtered.length})</span>
          <input className="search-box" style={{ width:220 }} placeholder="🔍 Search tenants..."
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        {filtered.length === 0
          ? <div style={{ textAlign:"center", padding:"40px 0", color:"#aaa" }}>No tenants match your search.</div>
          : (
            <div className="tenant-grid">
              {filtered.map(t => {
                const sc = SC[t.status] || SC.Paid;
                return (
                  <div key={t.id} className="tenant-card">
                    <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
                      <div className="av-sm">{t.firstName[0]}{t.lastName[0]}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:"#1a2e1c" }}>{t.firstName} {t.lastName}</div>
                        <div style={{ fontSize:12, color:"#999", marginTop:2 }}>{t.occupation} · {t.country}</div>
                        <span className="status-pill" style={{ background:sc.bg, color:sc.text, marginTop:4, display:"inline-flex" }}>
                          <span style={{ width:6, height:6, borderRadius:"50%", background:sc.dot, display:"inline-block", marginRight:5 }}/>{t.status}
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize:12.5, color:"#555", borderTop:"1px solid #f5f5f5", paddingTop:8, marginBottom:10, lineHeight:1.9 }}>
                      <div>🏠 {t.property}</div>
                      <div>📞 {t.phone}</div>
                      <div>✉ {t.email}</div>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span className="rent-tag">{t.rent}/mo</span>
                      <button className="view-btn" onClick={() => openProfile(t)}><EyeIcon/> View Profile</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

/* ── Payment Tab ── */
function PaymentTab() {
  const [filter, setFilter]     = useState("All");
  const [search, setSearch]     = useState("");
  const [selRows, setSel]       = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const counts = { All: PAYMENT_RECORDS.length,
    Succeeded: PAYMENT_RECORDS.filter(p=>p.status==="Succeeded").length,
    Pending:   PAYMENT_RECORDS.filter(p=>p.status==="Pending").length,
    Declined:  PAYMENT_RECORDS.filter(p=>p.status==="Declined").length };

  const visible = PAYMENT_RECORDS.filter(p =>
    (filter === "All" || p.status === filter) &&
    `${p.tenant}${p.property}${p.id}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = (checked) => { setSelectAll(checked); setSel(checked ? visible.map((_,i)=>i) : []); };
  const handleRowSel = (i) => { const n = selRows.includes(i) ? selRows.filter(x=>x!==i) : [...selRows,i]; setSel(n); setSelectAll(n.length===visible.length); };

  return (
    <div className="fade">
      <div className="stat-row">
        <div className="stat dg"><div className="stat-lbl">COLLECTED</div><div className="stat-val">£2,480</div></div>
        <div className="stat teal"><div className="stat-lbl">RECORDS</div><div className="stat-val">{PAYMENT_RECORDS.length}</div></div>
        <div className="stat purple"><div className="stat-lbl">PENDING</div><div className="stat-val">{counts.Pending}</div></div>
        <div className="stat red"><div className="stat-lbl">DECLINED</div><div className="stat-val">{counts.Declined}</div></div>
      </div>
      <div className="card">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:10 }}>
          <div>
            <h2 className="page-title">Payment Records</h2>
            <div style={{ display:"flex", gap:16, marginTop:8 }}>
              {["All","Succeeded","Pending","Declined"].map(f => (
                <button key={f} className={`filter-tab${filter===f?" active":""}`}
                  onClick={() => { setFilter(f); setSelectAll(false); setSel([]); }}>
                  {f} ({counts[f] ?? 0})
                </button>
              ))}
            </div>
          </div>
          <button className="btn-outline">⬇ Export CSV</button>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          <input className="search-box" placeholder="🔍 Search by tenant, property, ID..."
            value={search} onChange={e => { setSearch(e.target.value); setSelectAll(false); setSel([]); }}/>
          <button className="filter-chip">Date ▾</button>
          <button className="filter-chip">Method ▾</button>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" checked={selectAll} onChange={e=>handleSelectAll(e.target.checked)}
                    style={{ accentColor:"#2d7a3a", cursor:"pointer", width:15, height:15 }}/>
                </th>
                <th>ID</th><th>TENANT</th><th>PROPERTY</th><th>METHOD</th><th>STATUS</th><th>AMOUNT</th><th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p,i) => {
                const sc = SC[p.status] || SC.Pending;
                return (
                  <tr key={i} className={selRows.includes(i)?"row-selected":""}>
                    <td><input type="checkbox" checked={selRows.includes(i)} onChange={() => handleRowSel(i)}
                      style={{ accentColor:"#2d7a3a", cursor:"pointer", width:15, height:15 }}/></td>
                    <td><span className="pay-id">{p.id}</span></td>
                    <td><div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div className="mini-avatar">{p.tenant[0]}</div>
                      <span style={{ fontSize:13, fontWeight:500 }}>{p.tenant}</span>
                    </div></td>
                    <td style={{ fontSize:12.5, color:"#666" }}>{p.property}</td>
                    <td><span className="method-badge">{p.method}</span></td>
                    <td><span className="status-pill" style={{ background:sc.bg, color:sc.text }}>
                      <span style={{ width:7, height:7, borderRadius:"50%", background:sc.dot, display:"inline-block", marginRight:6 }}/>{p.status}
                    </span></td>
                    <td><b style={{ fontSize:13.5 }}>{p.amount}</b></td>
                    <td style={{ color:"#999", fontSize:12 }}>{p.date}</td>
                  </tr>
                );
              })}
              {visible.length === 0 && <tr><td colSpan={8} style={{ textAlign:"center", padding:"36px 0", color:"#aaa" }}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span style={{ fontSize:13, color:"#888" }}>{visible.length} records</span>
          <div style={{ display:"flex", gap:8 }}>
            <button className="pg-btn">Prev</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
