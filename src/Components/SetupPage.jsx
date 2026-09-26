import React, { useState, useEffect } from "react";

export default function SetupPage({ onComplete }) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [customMessage, setCustomMessage] = useState(
    "I am in danger and need help immediately. Please contact me or send emergency services."
  );
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("user_profile");
    if (storedProfile) {
      const p = JSON.parse(storedProfile);
      setFirstName(p.firstName || "");
      setSurname(p.surname || "");
      if (p.customMessage) setCustomMessage(p.customMessage);
    }
    const storedContacts = localStorage.getItem("sa_sos_contacts");
    if (storedContacts) {
      try { setContacts(JSON.parse(storedContacts)); } catch (e) {}
    }
  }, []);

  const handleAddContact = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    setContacts([...contacts, { id: Date.now(), name: newName.trim(), email: newEmail.trim() }]);
    setNewName("");
    setNewEmail("");
  };

  const handleRemoveContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !surname.trim()) return;

    const userData = {
      firstName: firstName.trim(),
      surname: surname.trim(),
      customMessage: customMessage.trim()
    };

    localStorage.setItem("user_profile", JSON.stringify(userData));
    localStorage.setItem("sa_sos_contacts", JSON.stringify(contacts));
    if (onComplete) onComplete();
  };

  return (
    <div style={styles.container}>
      <style>{css}</style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div className="setup-content" style={styles.content}>
        <div style={styles.left}>
          <span style={styles.eyebrow}>One time setup</span>
          <h1 className="setup-title" style={styles.title}>Let's get you set up.</h1>
          <p className="setup-subtitle" style={styles.subtitle}>
            Your name and message go into every alert so your contacts
            instantly know it's you. Add at least one person you trust —
            they're who receives your alerts and your location.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="name-row" style={styles.nameRow}>
            <div style={styles.field}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Hlulani"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Surname</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Baloyi"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Emergency Message</label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Message sent to your emergency contacts"
              style={styles.textarea}
              rows={3}
            />
          </div>

          <div style={styles.contactsBlock}>
            <label style={styles.label}>Emergency Contacts</label>
            <div className="contact-input-row" style={styles.contactInputRow}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                style={{ ...styles.input, flex: 1 }}
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Email address"
                style={{ ...styles.input, flex: 1 }}
              />
              <button type="button" onClick={handleAddContact} style={styles.addBtn}>
                Add
              </button>
            </div>

            {contacts.length === 0 ? (
              <p style={styles.emptyHint}>No contacts yet. Add at least one person you trust.</p>
            ) : (
              <div style={styles.contactsList}>
                {contacts.map((c) => (
                  <div key={c.id} style={styles.contactRow}>
                    <div style={styles.contactInfo}>
                      <div style={styles.contactName}>{c.name}</div>
                      <div style={styles.contactEmail}>{c.email}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveContact(c.id)}
                      style={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" style={styles.submitBtn}>
            Continue
          </button>
        </form>
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
    display: "flex",
    alignItems: "center",
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
    maxWidth: "1000px",
    width: "100%",
    margin: "0 auto",
    padding: "60px 40px",
    display: "grid",
    gridTemplateColumns: "1fr 1.1fr",
    gap: "80px",
    alignItems: "center"
  },
  left: {},
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
    fontSize: "52px",
    fontWeight: 300,
    color: "#fdf2f7",
    margin: "0 0 20px 0",
    letterSpacing: "-1px",
    lineHeight: "1.08"
  },
  subtitle: {
    fontSize: "16px",
    color: "#c99cae",
    lineHeight: "1.8",
    margin: 0
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "26px"
  },
  nameRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#c99cae"
  },
  input: {
    padding: "16px 18px",
    border: "1px solid rgba(255,92,138,0.22)",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    color: "#fdf2f7",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s"
  },
  textarea: {
    padding: "16px 18px",
    border: "1px solid rgba(255,92,138,0.22)",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    color: "#fdf2f7",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: "1.6",
    transition: "border-color 0.2s, background 0.2s"
  },
  contactsBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingTop: "6px",
    borderTop: "1px solid rgba(255,255,255,0.08)"
  },
  contactInputRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  addBtn: {
    padding: "16px 22px",
    background: "rgba(255,92,138,0.16)",
    border: "1px solid rgba(255,92,138,0.4)",
    borderRadius: "12px",
    color: "#ff8fb3",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.2s"
  },
  emptyHint: {
    fontSize: "13px",
    color: "#a97b8f",
    fontStyle: "italic",
    margin: 0
  },
  contactsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  contactRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px"
  },
  contactInfo: {},
  contactName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#fdf2f7"
  },
  contactEmail: {
    fontSize: "13px",
    color: "#c99cae",
    marginTop: "2px"
  },
  removeBtn: {
    padding: "6px 14px",
    background: "transparent",
    border: "1px solid rgba(255,92,138,0.3)",
    borderRadius: "8px",
    color: "#ff8fb3",
    fontSize: "12px",
    cursor: "pointer"
  },
  submitBtn: {
    padding: "18px",
    background: "linear-gradient(135deg, #ff7ba3 0%, #e83a73 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
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
  input::placeholder, textarea::placeholder { color: rgba(217,179,194,0.35); }
  input:focus, textarea:focus {
    border-color: #ff5c8a !important;
    background: rgba(255,255,255,0.08) !important;
  }
  button:active { transform: scale(0.98); }
  button:hover { filter: brightness(1.06); }

  /* Mobile: single column, stacked fields, tighter framing */
  @media (max-width: 820px) {
    .setup-content {
      grid-template-columns: 1fr !important;
      gap: 36px !important;
      padding: 48px 20px !important;
    }
    .setup-title { font-size: 34px !important; letter-spacing: -0.5px !important; }
    .setup-subtitle { font-size: 15px !important; }
    .name-row { grid-template-columns: 1fr !important; }
    .contact-input-row { flex-direction: column !important; align-items: stretch !important; }
  }
`;
