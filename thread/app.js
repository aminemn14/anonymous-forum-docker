const express = require("express");
const axios = require("axios");
const app = express();

const API_URL = process.env.API_URL || "http://api:5100";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    const messages = response.data;
    let html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Forum - Thread</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100 min-h-screen">
        <!-- Barre de navigation -->
        <nav class="bg-white shadow">
          <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="text-2xl font-bold text-indigo-600">
              Mon Forum Anonyme
            </div>
            <div>
              <a href="http://localhost:8080" class="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md text-sm font-medium">Poster un Message</a>
            </div>
          </div>
        </nav>
        <!-- Contenu principal -->
        <div class="container mx-auto p-6">
          <h1 class="text-4xl font-extrabold text-center mb-8">Forum Messages</h1>
          <div class="space-y-4">
    `;
    messages.forEach((message) => {
      let initial = message.pseudonym.charAt(0).toUpperCase();
      html += `
        <div class="flex items-start bg-white p-4 rounded-lg shadow">
          <div class="flex-shrink-0">
            <div class="h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center">
              <span class="text-white font-bold">${initial}</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="font-semibold text-lg">${message.pseudonym}</p>
            <p class="text-gray-700">${message.content}</p>
          </div>
        </div>
      `;
    });
    html += `
          </div>
        </div>
      </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving messages");
  }
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Thread service running on port ${port}`);
});
