import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = process.env.DB_FILE || join(__dirname, 'data.sqlite');
let db;

export async function initDb() {
  if (db) return db;
  db = await open({ filename: dbFile, driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const { count } = await db.get('SELECT COUNT(*) as count FROM projects');
  if (count === 0) {
    await db.run(
      'INSERT INTO projects (title, description) VALUES (?, ?)',
      'Portfolio Website',
      'A responsive personal showcase built with React and Vite.'
    );
    await db.run(
      'INSERT INTO projects (title, description) VALUES (?, ?)',
      'Booking App',
      'A clean reservation flow with availability selection and status tracking.'
    );
    await db.run(
      'INSERT INTO projects (title, description) VALUES (?, ?)',
      'Dashboard UI',
      'An interactive admin dashboard for managing users, schedules, and metrics.'
    );
  }

  return db;
}

export async function getAllProjects() {
  if (!db) await initDb();
  return db.all('SELECT id, title, description FROM projects ORDER BY id');
}

export async function addMessage(name, email, message) {
  if (!db) await initDb();
  const result = await db.run(
    'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
    name,
    email,
    message
  );
  return { id: result.lastID, name, email, message };
}
