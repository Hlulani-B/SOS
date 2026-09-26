import React from "react";

export default function LandingPage({ onNavigate }) {
  const handleNavigate = (view) => {
    localStorage.setItem("view", view);
    if (onNavigate) onNavigate(view);
  };

  return (
    <div style={styles.container}>
      <style>{css}</style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      {/* Header */}
      <header className="header" style={styles.header}>
        <div className="header-inner" style={styles.headerInner}>
          <h1 className="logo" style={styles.logo}>Safe</h1>
          <div className="header-actions" style={styles.headerActions}>
            <button className="header-btn" style={styles.headerBtn} onClick={() => handleNavigate("setup")}>
              Emergency Contacts
            </button>
            <button className="get-started-btn" style={styles.gettingStartedBtn} onClick={() => handleNavigate("guide")}>
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="main" style={styles.main}>
        {/* Left Side */}
        <div className="left" style={styles.left}>
          <span className="eyebrow" style={styles.eyebrow}>Welcome back</span>
          <h2 className="title" style={styles.title}>Your safety, simplified.</h2>
          <p className="description" style={styles.description}>
            Three everyday apps. One hidden lifeline. Weather, Style, and Calculator
            are real, working tools you can use every day. Each one carries a quiet
            gesture that can start recording, or reach the emergency contacts you
            choose, without changing what's on your screen.
          </p>
          <div className="button-row" style={styles.buttonRow}>
            <button className="secondary-btn" style={styles.secondaryBtn} onClick={() => handleNavigate("about")}>
              About
            </button>
            <button className="secondary-btn" style={styles.secondaryBtn} onClick={() => handleNavigate("support")}>
              Support
            </button>
            <button className="secondary-btn" style={styles.secondaryBtn} onClick={() => handleNavigate("guide")}>
              Guide
            </button>
          </div>
        </div>

        {/* Right Side - App Cards */}
        <div className="right" style={styles.right}>
          <button className="app-card" style={styles.appCard} onClick={() => handleNavigate("weather")}>
            <div className="app-icon" style={styles.appIcon}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v2.4M12 19.1v2.4M4.2 12H1.8M22.2 12h-2.4M6 6l1.7 1.7M16.3 16.3 18 18M18 6l-1.7 1.7M7.7 16.3 6 18" />
              </svg>
            </div>
            <span className="app-name" style={styles.appName}>Weather</span>
            <span className="app-desc" style={styles.appDesc}>Real forecasts</span>
          </button>

          <button className="app-card" style={styles.appCard} onClick={() => handleNavigate("clothing")}>
            <div className="app-icon" style={styles.appIcon}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 4h6l1.5 2L21 8.5 18 11l-2-1.5V20H8V9.5L6 11l-3-2.5L4.5 6 9 4Z" />
              </svg>
            </div>
            <span className="app-name" style={styles.appName}>Style</span>
            <span className="app-desc" style={styles.appDesc}>Curated looks</span>
          </button>

          <button className="app-card" style={styles.appCard} onClick={() => handleNavigate("calculator")}>
            <div className="app-icon" style={styles.appIcon}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2.5" />
                <path d="M7.5 7.5h9M7.5 12h2.2M11.9 12h2.2M16.3 12h.01M7.5 16h2.2M11.9 16h2.2M16.3 16h.01" />
              </svg>
            </div>
            <span className="app-name" style={styles.appName}>Calculator</span>
            <span className="app-desc" style={styles.appDesc}>Quick sums</span>
          </button>
        </div>
      </main>
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
    display: "flex",
    flexDirection: "column"
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

  /* Header */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(28,7,19,0.72)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "16px 32px"
  },
  headerInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#fdf2f7",
    margin: 0
  },
  headerActions: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  headerBtn: {
    padding: "10px 20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,92,138,0.28)",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#f6c9d8",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s"
  },
  gettingStartedBtn: {
    padding: "10px 24px",
    background: "linear-gradient(135deg, #ff7ba3 0%, #e83a73 100%)",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(232,58,115,0.3)"
  },

  /* Main Split Layout */
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "80px",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px 32px",
    zIndex: 1
  },
  left: {
    flex: 1,
    maxWidth: "520px"
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
    fontSize: "54px",
    fontWeight: 600,
    color: "#fdf2f7",
    margin: "0 0 24px 0",
    letterSpacing: "-1.5px",
    lineHeight: "1.08"
  },
  description: {
    fontSize: "16px",
    color: "#d9b3c2",
    lineHeight: "1.8",
    margin: "0 0 36px 0"
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  secondaryBtn: {
    padding: "13px 26px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,92,138,0.28)",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#f6c9d8",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s"
  },

  /* Right Side - App Cards */
  right: {
    flex: 1,
    display: "flex",
    gap: "22px",
    justifyContent: "center",
    maxWidth: "600px"
  },
  appCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,92,138,0.16)",
    borderRadius: "24px",
    padding: "48px 30px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
    textAlign: "center",
    font: "inherit",
    color: "inherit",
    flex: 1,
    maxWidth: "180px"
  },
  appIcon: {
    width: "72px",
    height: "72px",
    borderRadius: "20px",
    background: "rgba(255,92,138,0.10)",
    border: "1px solid rgba(255,92,138,0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ff8fb3"
  },
  appName: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#fdf2f7"
  },
  appDesc: {
    fontSize: "13px",
    color: "#a97b8f"
  }
};

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { font-family: inherit; }
  button:active { transform: scale(0.97); }
  .app-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255,92,138,0.4);
    box-shadow: 0 16px 40px rgba(232,58,115,0.18);
  }
  .header-btn:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,92,138,0.45); }
  .secondary-btn:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,92,138,0.45); }

  /* Mobile: stack the split layout, compact app launcher grid */
  @media (max-width: 800px) {
    .header { padding: 14px 16px !important; }
    .header-inner {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 12px !important;
    }
    .header-actions { gap: 10px !important; }
    .header-btn, .get-started-btn {
      flex: 1 !important;
      padding: 11px 10px !important;
      font-size: 13px !important;
      white-space: nowrap !important;
    }

    .main {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 44px !important;
      padding: 36px 16px 48px !important;
      text-align: center !important;
    }
    .left { max-width: 100% !important; margin: 0 auto !important; }
    .eyebrow { margin-bottom: 14px !important; }
    .title {
      font-size: 36px !important;
      letter-spacing: -0.5px !important;
      margin-bottom: 18px !important;
    }
    .description { font-size: 15px !important; margin-bottom: 28px !important; }
    .button-row { justify-content: center !important; }
    .secondary-btn { padding: 12px 18px !important; font-size: 13px !important; }

    .right {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 10px !important;
      max-width: 100% !important;
    }
    .app-card {
      max-width: none !important;
      padding: 22px 6px !important;
      gap: 10px !important;
      border-radius: 18px !important;
    }
    .app-icon { width: 50px !important; height: 50px !important; border-radius: 14px !important; }
    .app-icon svg { width: 24px; height: 24px; }
    .app-name { font-size: 13px !important; }
    .app-desc { font-size: 10.5px !important; }
  }
`;
