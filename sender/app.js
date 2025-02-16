const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

const API_URL = process.env.API_URL || "http://api:5100";

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const html = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Forum - Sender</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen">
      <!-- Barre de navigation -->
      <nav class="bg-white shadow">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <div class="text-2xl font-bold text-indigo-600">
            Mon Forum Anonyme
          </div>
          <div>
            <a href="http://localhost" class="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md text-sm font-medium">Voir le Forum</a>
          </div>
        </div>
      </nav>
      <!-- Contenu principal -->
      <div class="flex items-center justify-center py-12">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-3xl font-bold mb-6 text-center">Poster un Message</h1>
          <form action="/send" method="post" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Pseudonyme</label>
              <input type="text" name="pseudonym" placeholder="Votre pseudonyme" class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="content" rows="4" placeholder="Votre message" class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
            </div>
            <div>
              <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

app.post("/send", async (req, res) => {
  const { pseudonym, content } = req.body;
  if (!pseudonym || !content) {
    return res.status(400).send("Missing pseudonym or content");
  }
  try {
    const response = await axios.post(`${API_URL}/messages`, {
      pseudonym,
      content,
    });
    if (response.status === 201) {
      return res.redirect("/");
    } else {
      return res.status(400).send("Failed to post message");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error posting message");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Sender service running on port ${port}`);
});
