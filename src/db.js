import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./emergency_app.db', (err) => {
  if (err) console.error("Database error:", err.message);
});

// Initialize a clean table for the device owner's contacts
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS my_emergency_contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL
    )
  `);
});

/**
 * Returns all emergency contacts for this device.
 */
export function getEmergencyContacts() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT name, phone FROM my_emergency_contacts`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

export default db;