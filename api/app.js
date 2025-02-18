const express = require("express");
const { Pool } = require("pg");
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Création d'un pool de connexions à PostgreSQL
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://forumuser:forumpass@db:5432/forum_db",
});

// Création de la table "messages" si elle n'existe pas déjà
pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    pseudonym VARCHAR(80) NOT NULL,
    content TEXT NOT NULL
  )
`
  )
  .catch((err) => console.error("Error creating table:", err));

// Route pour récupérer tous les messages
app.get("/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route pour ajouter un nouveau message
app.post("/messages", async (req, res) => {
  const { pseudonym, content } = req.body;
  if (!pseudonym || !content) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  try {
    await pool.query(
      "INSERT INTO messages (pseudonym, content) VALUES ($1, $2)",
      [pseudonym, content]
    );
    res.status(201).json({ message: "Message created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
