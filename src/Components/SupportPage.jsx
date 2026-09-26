import React from "react";

const SERVICES = [
  { name: "GBV Command Centre", sub: "Social workers, 24 hours a day", number: "0800 428 428", tel: "0800428428" },
  { name: "TEARS Foundation", sub: "Free help by USSD, any network", number: "*134*7355#", tel: "*134*7355%23" },
  { name: "Childline South Africa", sub: "For children and their families", number: "116", tel: "116" },
  { name: "SAPS Emergency", sub: "Immediate danger", number: "10111", tel: "10111" },
];

export default function SupportPage({ onComplete }) {
  return (
    <div style={styles.container}>
      <style>{css}</style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div className="support-content" style={styles.content}>
        <span style={styles.eyebrow}>Support</span>
        <h1 className="support-title" style={styles.title}>If you or someone you know is being hurt</h1>
        <p style={styles.text}>
          You are not overreacting and you do not need to handle this alone.
          These services are free, confidential, and staffed around the clock.
        </p>

        <div style={styles.list}>
          {SERVICES.map((s) => (
            <a key={s.name} href={`tel:${s.tel}`} style={styles.row}>
              <div>
                <div style={styles.name}>{s.name}</div>
                <div style={styles.sub}>{s.sub}</div>
              </div>
              <div style={styles.number}>{s.number}</div>
            </a>
          ))}
        </div>

        <button style={styles.doneBtn} onClick={onComplete}>
          Back to home
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "linear-gradient(160deg, #2b0e1d 0%, #1c0713 55%, #12040c 100%)",
    fontFamily: "'Avenir Next', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    color: "#f6e3ec",
    overflow: "auto"
  },
  glow1: {
    position: "fixed",
    top: "-15%",
    right: "-10%",
    width: "55vw",
    height: "55vw",
    background: "radial-gradient(circle, rgba(255,92,138,0.14) 0%, transparent 65%)",
    pointerEvents: "none",
    zIndex: 0
  },
  glow2: {
    position: "fixed",
    bottom: "-20%",
    left: "-12%",
    width: "50vw",
    height: "50vw",
    background: "radial-gradient(circle, rgba(154,184,78,0.08) 0%, transparent 65%)",
    pointerEvents: "none",
    zIndex: 0
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "720px",
    margin: "0 auto",
    padding: "80px 32px 100px"
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#ff5c8a",
    marginBottom: "18px"
  },
  title: {
    fontSize: "42px",
    fontWeight: 300,
    color: "#fdf2f7",
    margin: "0 0 20px 0",
    letterSpacing: "-1px",
    lineHeight: "1.15"
  },
  text: {
    fontSize: "16px",
    color: "#d9b3c2",
    lineHeight: "1.8",
    margin: "0 0 40px 0"
  },
  list: {
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "22px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    textDecoration: "none",
    transition: "padding-left 0.2s"
  },
  name: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#fdf2f7"
  },
  sub: {
    fontSize: "13px",
    color: "#c99cae",
    marginTop: "4px"
  },
  number: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#ff5c8a",
    whiteSpace: "nowrap"
  },
  doneBtn: {
    width: "100%",
    padding: "20px",
    marginTop: "56px",
    background: "linear-gradient(135deg, #ff7ba3 0%, #e83a73 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 12px 32px rgba(232,58,115,0.35)",
    transition: "transform 0.2s"
  }
};

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { font-family: inherit; }
  a:hover { padding-left: 8px; }
  button:active { transform: scale(0.98); }
  button:hover { filter: brightness(1.06); }

  /* Mobile: tighter framing */
  @media (max-width: 600px) {
    .support-content { padding: 48px 18px 64px !important; }
    .support-title { font-size: 30px !important; letter-spacing: -0.5px !important; }
  }
`;
