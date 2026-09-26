import React from "react";

export default function AboutPage({ onComplete }) {
  return (
    <div style={styles.container}>
      <style>{css}</style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div className="about-content" style={styles.content}>
        <span style={styles.eyebrow}>About</span>
        <h1 className="about-title" style={styles.title}>What this app is</h1>

        <p style={styles.text}>
          Safe looks like a handful of everyday apps — Weather, Style, and
          Calculator. They all work exactly as they appear to. Underneath, each
          one quietly keeps you a tap away from the people you trust most.
        </p>
        <p style={styles.text}>
          Each app carries a hidden gesture that can start recording, or reach
          your emergency contacts with your name, your message, and your GPS
          location — without changing what's on your screen. Nothing about the
          interface gives it away.
        </p>
        <p style={styles.text}>
          You decide who your contacts are and what your message says.
          Everything stays stored only on this device.
        </p>

        <div style={styles.divider} />

        <div className="about-color-grid" style={styles.colorGrid}>
          <div style={styles.colorCard}>
            <div className="color-dot" style={{ ...colorDot, background: "#7a9b3e" }} />
            <div style={styles.colorName}>Olive Green</div>
            <div style={styles.colorDesc}>Starts video recording</div>
          </div>
          <div style={styles.colorCard}>
            <div className="color-dot" style={{ ...colorDot, background: "#ff5c8a" }} />
            <div style={styles.colorName}>Pink</div>
            <div style={styles.colorDesc}>Sends alert with your location</div>
          </div>
          <div style={styles.colorCard}>
            <div className="color-dot" style={{ ...colorDot, background: "#eab308" }} />
            <div style={styles.colorName}>Yellow</div>
            <div style={styles.colorDesc}>Starts audio recording</div>
          </div>
        </div>

        <button style={styles.doneBtn} onClick={onComplete}>
          Back to home
        </button>
      </div>
    </div>
  );
}

const colorDot = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  flexShrink: 0,
  boxShadow: "0 4px 14px rgba(0,0,0,0.35)"
};

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
    fontSize: "48px",
    fontWeight: 300,
    color: "#fdf2f7",
    margin: "0 0 32px 0",
    letterSpacing: "-1px"
  },
  text: {
    fontSize: "16px",
    color: "#d9b3c2",
    lineHeight: "1.8",
    margin: "0 0 20px 0"
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(255,92,138,0.25), transparent)",
    margin: "44px 0"
  },
  colorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },
  colorCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px"
  },
  colorName: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#fdf2f7"
  },
  colorDesc: {
    fontSize: "13px",
    color: "#c99cae",
    lineHeight: "1.5",
    marginTop: "-6px"
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
  button:active { transform: scale(0.98); }
  button:hover { filter: brightness(1.06); }

  /* Mobile: tighter framing, compact color legend */
  @media (max-width: 600px) {
    .about-content { padding: 48px 18px 64px !important; }
    .about-title { font-size: 32px !important; letter-spacing: -0.5px !important; }
    .about-color-grid { gap: 12px !important; }
    .color-dot { width: 26px !important; height: 26px !important; }
  }
`;
