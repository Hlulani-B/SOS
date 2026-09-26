import React, { useState, useEffect } from "react";

/**
 * SideMenu - hamburger at the top-left that slides out a menu panel.
 * The Settings row returns to the home page by clearing the 'view' key
 * and notifying App.jsx via a storage event (no full page reload).
 *
 * theme: "light" for the pale disguise pages (Weather / Style),
 *        "dark" for the Calculator.
 * title:  the disguise app name shown in the panel header.
 */

const THEMES = {
  light: {
    hamBg: "rgba(255,255,255,0.85)",
    hamBorder: "rgba(0,0,0,0.08)",
    hamLine: "#1a1a1a",
    hamShadow: "0 1px 6px rgba(0,0,0,0.10)",
    panelBg: "#ffffff",
    panelBorder: "rgba(0,0,0,0.06)",
    panelShadow: "16px 0 48px rgba(0,0,0,0.16)",
    title: "#1a1a1a",
    close: "#b3b3b3",
    rowHover: "rgba(0,0,0,0.045)",
    rowActive: "rgba(0,0,0,0.08)",
    rowText: "#1a1a1a",
    chevron: "#c9c9c9",
    backdrop: "rgba(24,12,18,0.32)"
  },
  dark: {
    hamBg: "rgba(255,255,255,0.08)",
    hamBorder: "rgba(255,255,255,0.12)",
    hamLine: "#f5f5f7",
    hamShadow: "0 1px 6px rgba(0,0,0,0.35)",
    panelBg: "#1c1c1e",
    panelBorder: "rgba(255,255,255,0.08)",
    panelShadow: "16px 0 48px rgba(0,0,0,0.55)",
    title: "#f5f5f7",
    close: "#6e6e73",
    rowHover: "rgba(255,255,255,0.06)",
    rowActive: "rgba(255,255,255,0.10)",
    rowText: "#f5f5f7",
    chevron: "#48484a",
    backdrop: "rgba(0,0,0,0.5)"
  }
};

const GearIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function SideMenu({ title = "Menu", theme = "light" }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = THEMES[theme] || THEMES.light;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSettings = () => {
    setIsOpen(false);
    localStorage.removeItem("view");
    // Same-tab notification so App.jsx re-reads the view and lands on home
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {/* Hamburger - top left */}
      <button
        className="side-menu-hamburger"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Backdrop */}
      <div
        className={`side-menu-backdrop ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out panel */}
      <aside className={`side-menu-panel ${isOpen ? "open" : ""}`}>
        <header className="side-menu-header">
          <span className="side-menu-title">{title}</span>
          <button
            className="side-menu-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <nav className="side-menu-body" onClick={() => setIsOpen(false)}>
          <button className="side-menu-row" onClick={handleSettings}>
            <span className="side-menu-row-icon"><GearIcon /></span>
            <span className="side-menu-row-label">Settings</span>
            <span className="side-menu-row-chevron"><ChevronIcon /></span>
          </button>
        </nav>
      </aside>

      <style>{`
        .side-menu-hamburger {
          position: fixed;
          top: 14px;
          left: 14px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          background: ${t.hamBg};
          border: 1px solid ${t.hamBorder};
          border-radius: 12px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: ${t.hamShadow};
          transition: transform 0.15s ease;
        }
        .side-menu-hamburger:active { transform: scale(0.92); }
        .hamburger-line {
          display: block;
          width: 18px;
          height: 1.8px;
          background: ${t.hamLine};
          border-radius: 1px;
        }

        .side-menu-backdrop {
          position: fixed;
          inset: 0;
          background: ${t.backdrop};
          opacity: 0;
          pointer-events: none;
          z-index: 1001;
          transition: opacity 0.3s ease;
        }
        .side-menu-backdrop.show {
          opacity: 1;
          pointer-events: auto;
        }

        .side-menu-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 288px;
          height: 100%;
          background: ${t.panelBg};
          border-right: 1px solid ${t.panelBorder};
          box-shadow: ${t.panelShadow};
          z-index: 1002;
          transform: translateX(-105%);
          transition: transform 0.34s cubic-bezier(0.32, 0.72, 0, 1);
          display: flex;
          flex-direction: column;
        }
        .side-menu-panel.open {
          transform: translateX(0);
        }

        .side-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 20px 18px;
        }
        .side-menu-title {
          color: ${t.title};
          font-size: 17px;
          font-weight: 600;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .side-menu-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background: none;
          border: none;
          border-radius: 8px;
          color: ${t.close};
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .side-menu-close:hover {
          color: ${t.title};
          background: ${t.rowHover};
        }

        .side-menu-body {
          padding: 6px 10px;
          flex: 1;
        }

        .side-menu-row {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 12px;
          background: none;
          border: none;
          border-radius: 10px;
          color: ${t.rowText};
          font-size: 15px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .side-menu-row:hover { background: ${t.rowHover}; }
        .side-menu-row:active { background: ${t.rowActive}; }
        .side-menu-row-icon { display: flex; color: ${t.rowText}; opacity: 0.75; }
        .side-menu-row-label { flex: 1; text-align: left; }
        .side-menu-row-chevron { display: flex; color: ${t.chevron}; }
      `}</style>
    </>
  );
}
