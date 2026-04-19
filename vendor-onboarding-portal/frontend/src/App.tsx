import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import ThreeBackground from "./ThreeBackground"

const BASE = "http://localhost:8000"
const CATEGORIES = ["Staffing Agency", "Freelance Platform", "Consultant"]

interface Vendor {
  id: string
  name: string
  category: string
  contact_email: string
  status: string
}

export default function App() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [name, setName] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("All")

  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  const loadVendors = () =>
    fetch(`${BASE}/vendors`).then((r) => r.json()).then(setVendors)

  useEffect(() => {
    loadVendors()

    // GSAP entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    tl.fromTo(titleRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
      .fromTo(formRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.4")
      .fromTo(tableRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, "-=0.5")
  }, [])

  // Animate new rows when vendors change
  useEffect(() => {
    gsap.fromTo(
      ".vendor-row",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" }
    )
  }, [vendors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) { setError("Name and email are required"); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address"); return }
    setError("")

    // Button pulse
    gsap.fromTo(".submit-btn", { scale: 0.95 }, { scale: 1, duration: 0.3, ease: "back.out(2)" })

    await fetch(`${BASE}/vendors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, contact_email: email }),
    })
    setName(""); setEmail(""); setCategory(CATEGORIES[0])
    loadVendors()
  }

  const handleApprove = async (id: string) => {
    await fetch(`${BASE}/vendors/${id}/approve`, { method: "PATCH" })
    loadVendors()
  }

  const displayed = filter === "All" ? vendors : vendors.filter((v) => v.category === filter)

  return (
    <>
      <ThreeBackground />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "2rem", fontFamily: "'Segoe UI', sans-serif", color: "#e2e8f0" }}>

        <h1 ref={titleRef} style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "0.25rem", background: "linear-gradient(90deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Vendor Onboarding Portal
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", fontSize: "0.95rem" }}>Register and manage your vendors in one place</p>

        {/* Form */}
        <div ref={formRef} style={glassCard}>
          <h2 style={{ marginBottom: "1.2rem", fontSize: "1.1rem", color: "#c7d2fe" }}>Register New Vendor</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <label style={labelStyle}>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Vendor name" />
              </label>
              <label style={labelStyle}>
                Category
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <label style={labelStyle}>
              Contact Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="contact@email.com" />
            </label>
            {error && <p style={{ color: "#f87171", marginTop: 8, fontSize: 13 }}>{error}</p>}
            <button type="submit" className="submit-btn" style={primaryBtn}>Register Vendor</button>
          </form>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: "1rem", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setFilter(c)} style={filterBtn(filter === c)}>{c}</button>
          ))}
        </div>

        {/* Table */}
        <div ref={tableRef} style={glassCard}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {["Name", "Category", "Email", "Status", "Action"].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: 28, color: "#64748b" }}>No vendors yet.</td></tr>
              ) : (
                displayed.map((v) => (
                  <tr key={v.id} className="vendor-row" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={tdStyle}>{v.name}</td>
                    <td style={tdStyle}>{v.category}</td>
                    <td style={tdStyle}>{v.contact_email}</td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                        background: v.status === "Approved" ? "rgba(16,185,129,0.15)" : "rgba(234,179,8,0.15)",
                        color: v.status === "Approved" ? "#34d399" : "#fbbf24",
                        border: `1px solid ${v.status === "Approved" ? "#34d39944" : "#fbbf2444"}`,
                      }}>
                        {v.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {v.status !== "Approved" && (
                        <button onClick={() => handleApprove(v.id)} style={approveBtn}>Approve</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(12px)",
  borderRadius: 16,
  padding: "1.5rem",
  marginBottom: "1.5rem",
}

const labelStyle: React.CSSProperties = {
  display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#94a3b8",
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  padding: "9px 12px",
  color: "#e2e8f0",
  fontSize: 14,
  outline: "none",
  marginTop: 2,
}

const primaryBtn: React.CSSProperties = {
  marginTop: "1.2rem",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  border: "none",
  padding: "10px 24px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
}

const approveBtn: React.CSSProperties = {
  background: "rgba(16,185,129,0.15)",
  color: "#34d399",
  border: "1px solid #34d39944",
  padding: "5px 14px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
}

const filterBtn = (active: boolean): React.CSSProperties => ({
  padding: "5px 16px",
  cursor: "pointer",
  background: active ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.06)",
  color: active ? "white" : "#94a3b8",
  border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
  borderRadius: 20,
  fontSize: 13,
  fontWeight: active ? 600 : 400,
})

const thStyle: React.CSSProperties = { textAlign: "left", padding: "10px 12px", fontSize: 13, color: "#94a3b8", fontWeight: 600 }
const tdStyle: React.CSSProperties = { padding: "12px 12px", fontSize: 14 }
