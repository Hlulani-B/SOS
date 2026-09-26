import React from "react";

export default function GuidePage({ onComplete }) {
  return (
    <div style={styles.container}>
      <style>{css}</style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div className="guide-content" style={styles.content}>
        <div className="guide-hero" style={styles.hero}>
          <span style={styles.eyebrow}>Getting started</span>
          <h1 className="guide-title" style={styles.title}>Welcome to Safe</h1>
          <p className="guide-subtitle" style={styles.subtitle}>
            Everything you need to know, in one minute.
          </p>
        </div>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNumber}>01</span>
            <h2 className="guide-section-title" style={styles.sectionTitle}>What is Safe?</h2>
          </div>
          <p style={styles.text}>
            Safe looks like three everyday apps: Weather, Style, and Calculator.
            Underneath, it's a discreet safety tool that keeps you connected to
            the people you trust most. Nothing on screen ever reveals what it
            really does.
          </p>
        </section>

        <div className="guide-divider" style={styles.divider} />

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNumber}>02</span>
            <h2 className="guide-section-title" style={styles.sectionTitle}>How it works</h2>
          </div>
          <p style={styles.text}>
            Each app has hidden safety gestures disguised as normal buttons. The
            colors tell you what each one does.
          </p>
          <div className="color-grid" style={styles.colorGrid}>
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
          <div className="red-demo" style={styles.redDemo}>
            <div style={styles.demoRow}>
              <span style={{ ...demoKey, background: "#556b2f", color: "#ffffff" }}>3</span>
              <span style={styles.demoArrow}>→</span>
              <span style={{ ...demoKey, background: "#ff3b30", color: "#ffffff" }}>3</span>
            </div>
            <p style={styles.note}>
              A button that turns red means the recording is taking place — like
              this. That is the only indicator: the label never changes and
              everything else on screen stays completely normal. Tap the same
              button again to stop; the recording is saved and sent to your
              contacts.
            </p>
          </div>
        </section>

        <div className="guide-divider" style={styles.divider} />

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNumber}>03</span>
            <h2 className="guide-section-title" style={styles.sectionTitle}>Where the gestures live</h2>
          </div>
          <div style={styles.gestureList}>
            <div className="gesture-row" style={styles.gestureRow}>
              <div className="gesture-app" style={styles.gestureApp}>Weather</div>
              <div style={styles.gestureDesc}>The Johannesburg, Cape Town and Durban city chips</div>
            </div>
            <div className="gesture-row" style={styles.gestureRow}>
              <div className="gesture-app" style={styles.gestureApp}>Style</div>
              <div style={styles.gestureDesc}>The "Quick View" buttons on products</div>
            </div>
            <div className="gesture-row" style={styles.gestureRow}>
              <div className="gesture-app" style={styles.gestureApp}>Calculator</div>
              <div style={styles.gestureDesc}>The number keys 3, 7 and 9</div>
            </div>
          </div>
        </section>

        <div className="guide-divider" style={styles.divider} />

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNumber}>04</span>
            <h2 className="guide-section-title" style={styles.sectionTitle}>Add your emergency contacts</h2>
          </div>
          <p style={styles.text}>
            On the home page, tap <strong style={styles.strong}>Add Emergency Contacts</strong> in
            the header. Add the names and email addresses of the people you trust.
            When you trigger an alert, they receive your name, your custom
            message, and your GPS location.
          </p>
        </section>

        <div className="guide-divider" style={styles.divider} />

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNumber}>05</span>
            <h2 className="guide-section-title" style={styles.sectionTitle}>Getting back home</h2>
          </div>
          <p style={styles.text}>
            Inside Weather, Style or Calculator, tap the <strong style={styles.strong}>menu icon (☰)</strong> in
            the top-left corner, then tap <strong style={styles.strong}>Settings</strong>. That brings you
            back to the home page.
          </p>
        </section>

        <button style={styles.doneBtn} onClick={onComplete}>
          I'm ready
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

// Mini calculator-key mock for the "idle -> recording" red demo
const demoKey = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: 500,
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
    maxWidth: "760px",
    margin: "0 auto",
    padding: "80px 32px 100px"
  },
  hero: {
    marginBottom: "72px"
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
    fontSize: "56px",
    fontWeight: 300,
    color: "#fdf2f7",
    margin: "0 0 16px 0",
    letterSpacing: "-1px",
    lineHeight: "1.05"
  },
  subtitle: {
    fontSize: "18px",
    color: "#c99cae",
    margin: 0,
    lineHeight: "1.6"
  },
  section: {
    marginBottom: "8px"
  },
  sectionHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "16px",
    marginBottom: "20px"
  },
  sectionNumber: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#ff5c8a",
    letterSpacing: "1px"
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: 500,
    color: "#fdf2f7",
    margin: 0
  },
  text: {
    fontSize: "16px",
    color: "#d9b3c2",
    lineHeight: "1.8",
    margin: "0 0 16px 0"
  },
  strong: {
    color: "#fdf2f7",
    fontWeight: 600
  },
  note: {
    fontSize: "14px",
    color: "#a97b8f",
    fontStyle: "italic",
    margin: "4px 0 0 0"
  },
  redDemo: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginTop: "20px",
    padding: "18px 20px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,59,48,0.25)",
    borderRadius: "14px"
  },
  demoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0
  },
  demoArrow: {
    fontSize: "18px",
    color: "#a97b8f"
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(255,92,138,0.25), transparent)",
    margin: "44px 0"
  },
  colorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    margin: "28px 0 24px"
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
  gestureList: {
    display: "flex",
    flexDirection: "column"
  },
  gestureRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "24px",
    padding: "16px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  gestureApp: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#fdf2f7",
    minWidth: "110px"
  },
  gestureDesc: {
    fontSize: "15px",
    color: "#c99cae",
    lineHeight: "1.6"
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
    transition: "transform 0.2s, box-shadow 0.2s"
  }
};

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { font-family: inherit; }
  button:active { transform: scale(0.98); }
  button:hover { filter: brightness(1.06); }

  /* Mobile: tighter framing, compact color legend, stacked gesture rows */
  @media (max-width: 600px) {
    .guide-content { padding: 48px 18px 64px !important; }
    .guide-hero { margin-bottom: 44px !important; }
    .guide-title { font-size: 34px !important; letter-spacing: -0.5px !important; }
    .guide-subtitle { font-size: 15px !important; }
    .guide-section-title { font-size: 20px !important; }
    .guide-divider { margin: 28px 0 !important; }
    .color-grid { gap: 12px !important; }
    .color-dot { width: 26px !important; height: 26px !important; }
    .gesture-row { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; padding: 14px 0 !important; }
    .gesture-app { min-width: 0 !important; }
    .red-demo { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
  }
`;
